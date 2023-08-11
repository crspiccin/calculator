import { Router } from "express";
import { User } from "../entity/entities";
import { createInstance } from "../service/UserService";
import InvalidPasswordException from "../exception/InvalidPasswordException";

const HTTP_STATUS_NOT_FOUND = 404;
const HTTP_STATUS_SERVER_ERROR = 500;
const HTTP_STATUS_FORBIDDEN = 403;

const router = Router();
const userService = createInstance();

router.get("/health", async (req, res) => {
	return res.json({
		status: "ok",
	});
});

/**
 * Create a new user - signup
 */
router.post("/signup", async (req, res) => {
	try {
		const user: User = { ...req.body };
		const id = await userService.signup(user);
		return res.json({
			id,
		});
	} catch (err) {
		console.error(err);
		return res.sendStatus(HTTP_STATUS_SERVER_ERROR);
	}
});

router.post("/login", async (req, res) => {
	try {
		const userReq: User = { ...req.body };
		const user: User | null = await userService.login(userReq);
		if (user) {
			return res.json({
				id: user.id,
				email: user.email,
			});
		}
		return res.sendStatus(HTTP_STATUS_NOT_FOUND);
	} catch (err) {
		if (err instanceof InvalidPasswordException) {
			return res.sendStatus(HTTP_STATUS_FORBIDDEN);
		}
		return res.sendStatus(HTTP_STATUS_SERVER_ERROR);
	}
});

export default router;

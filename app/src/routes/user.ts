import { Router } from "express";
import UserRepository from "../db/UserRepository";
import { User } from "../entity/entities";
import bcrypt from "bcrypt";

const SALT_ROUNDS = 8;
const HTTP_STATUS_FORBIDDEN = 403;
const HTTP_STATUS_NOT_FOUND = 404;

const router = Router();
const userRepository = new UserRepository();

router.get("/health", async (req, res) => {
	const result = await userRepository.findAll();
	return res.json({
		status: result ? "ok" : "not_ok",
	});
});

/**
 * Create a new user - signup
 */
router.post("/signup", async (req, res) => {
	const user: User = { ...req.body };
	user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(SALT_ROUNDS));
	const id = await userRepository.create(user);
	return res.json({
		id,
	});
});

router.post("/login", async (req, res) => {
	const userReq: User = { ...req.body };
	const user: User | null = await userRepository.findByEmail(userReq.email);
	if (user) {
		const isValid = bcrypt.compareSync(userReq.password, user.password);
		if (isValid) {
			return res.json({
				id: user.id,
				email: user.email,
			});
		}
		return res.sendStatus(HTTP_STATUS_FORBIDDEN);
	}
	return res.sendStatus(HTTP_STATUS_NOT_FOUND);
});

export default router;

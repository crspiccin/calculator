import "dotenv/config";
import express from "express";
import userRouter from "./routes/user";
import cors from "cors";

const app = express();
const port = process.env.PORT || 3010;

app.use(cors());

app.use(express.json());

app.use("/users", userRouter);

const server = app.listen(port, () => {
	console.info(`Server started at http://localhost:${port}`);
});

process.on("SIGTERM", () => {
	console.info("SIGTERM signal received.");
	console.info("Closing http server.");
	server.close(() => {
		console.info("Http server closed.");
	});
});

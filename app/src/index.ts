import "dotenv/config";
import express from "express";
import userRouter from "./routes/user";
import cors from "cors";

const app = express();
const port = 3010;

const allowList = ["http://localhost:3000"];
const corsOptions = {
	origin: (origin: any, callback: any) => {
		if (allowList.indexOf(origin) !== -1) {
			callback(null, true);
		} else {
			callback(new Error());
		}
	},
};

app.use(cors(corsOptions));

app.use(express.json());

app.use("/users", userRouter);

const server = app.listen(port, () => {
	console.log(`Server started at http://localhost:${port}`);
});

process.on("SIGTERM", () => {
	console.info("SIGTERM signal received.");
	console.log("Closing http server.");
	server.close(() => {
		console.log("Http server closed.");
	});
});

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const user_1 = __importDefault(require("./routes/user"));
const app = (0, express_1.default)();
const port = 3010;
app.use(express_1.default.json());
app.use("/users", user_1.default);
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

"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const UserRepository_1 = __importDefault(require("../db/UserRepository"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const SALT_ROUNDS = 8;
const HTTP_STATUS_FORBIDDEN = 403;
const HTTP_STATUS_NOT_FOUND = 404;
const router = (0, express_1.Router)();
const userRepository = new UserRepository_1.default();
/**
 * Get all users
 */
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield userRepository.findAll();
    return res.json(result);
}));
/**
 * Create a new user - signup
 */
router.post("/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = Object.assign({}, req.body);
    user.password = bcrypt_1.default.hashSync(user.password, bcrypt_1.default.genSaltSync(SALT_ROUNDS));
    const id = yield userRepository.create(user);
    return res.json({
        id,
    });
}));
router.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userReq = Object.assign({}, req.body);
    const user = yield userRepository.findByEmail(userReq.email);
    if (user) {
        const isValid = bcrypt_1.default.compareSync(userReq.password, user.password);
        if (isValid) {
            return res.json({
                id: user.id,
                email: user.email,
            });
        }
        return res.sendStatus(HTTP_STATUS_FORBIDDEN);
    }
    return res.sendStatus(HTTP_STATUS_NOT_FOUND);
}));
exports.default = router;

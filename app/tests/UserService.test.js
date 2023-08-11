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
const UserService_1 = require("../src/service/UserService");
const bcrypt_1 = __importDefault(require("bcrypt"));
it("should return id when valid user is signed up", () => __awaiter(void 0, void 0, void 0, function* () {
    const userRepositoryMock = {
        create: jest.fn().mockResolvedValue("123"),
        findByEmail: jest.fn().mockReturnValue(""),
    };
    const userService = new UserService_1.UserService(userRepositoryMock);
    const user = {
        id: "1",
        email: "test@test.com",
        password: "password",
    };
    const result = yield userService.signup(user);
    expect(result).toBe("123");
}));
it("should return user object when valid user logs in", () => __awaiter(void 0, void 0, void 0, function* () {
    const user = {
        id: "1",
        email: "test@test.com",
        password: "password",
    };
    const userDB = {
        id: "1",
        email: "test@test.com",
        password: bcrypt_1.default.hashSync("password", bcrypt_1.default.genSaltSync(8)),
    };
    const userRepositoryMock = {
        findByEmail: jest.fn().mockResolvedValue(userDB),
        create: jest.fn().mockReturnValue(""),
    };
    const userService = new UserService_1.UserService(userRepositoryMock);
    const result = yield userService.login(user);
    expect(result === null || result === void 0 ? void 0 : result.password).toEqual("");
}));
it("should return null when valid user logs in with invalid password", () => __awaiter(void 0, void 0, void 0, function* () {
    const hashedPassword = bcrypt_1.default.hashSync("password", bcrypt_1.default.genSaltSync(8));
    const user = {
        id: "1",
        email: "test@test.com",
        password: hashedPassword,
    };
    const userRepositoryMock = {
        findByEmail: jest.fn().mockResolvedValue(user),
        create: jest.fn().mockReturnValue(""),
    };
    const userService = new UserService_1.UserService(userRepositoryMock);
    const result = yield userService.login(Object.assign(Object.assign({}, user), { password: "invalid" }));
    expect(result).toBeNull();
}));
it("should return null when invalid user logs in", () => __awaiter(void 0, void 0, void 0, function* () {
    const userRepositoryMock = {
        findByEmail: jest.fn().mockResolvedValue(null),
        create: jest.fn().mockReturnValue(""),
    };
    const userService = new UserService_1.UserService(userRepositoryMock);
    const result = yield userService.login({
        email: "invalid@test.com",
        password: "password",
    });
    expect(result).toBeNull();
}));
it("should throw error when signing up with existing email", () => __awaiter(void 0, void 0, void 0, function* () {
    const userRepositoryMock = {
        create: jest.fn().mockRejectedValue(new Error("Email already exists")),
        findByEmail: jest.fn().mockReturnValue(""),
    };
    const userService = new UserService_1.UserService(userRepositoryMock);
    const user = {
        id: "1",
        email: "test@test.com",
        password: "password",
    };
    yield expect(userService.signup(user)).rejects.toThrow("Email already exists");
}));

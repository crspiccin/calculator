import UserRepositoryInterface from "../src/db/UserRepositoryInterface";
import { User } from "../src/entity/entities";
import { UserService } from "../src/service/UserService";
import bcrypt from "bcrypt";

it("should return id when valid user is signed up", async () => {
	const userRepositoryMock: UserRepositoryInterface = {
		create: jest.fn().mockResolvedValue("123"),
		findByEmail: jest.fn().mockReturnValue(""),
	};
	const userService = new UserService(userRepositoryMock);
	const user = {
		id: "1",
		email: "test@test.com",
		password: "password",
	};
	const result = await userService.signup(user);
	expect(result).toBe("123");
});

it("should return user object when valid user logs in", async () => {
	const user = {
		id: "1",
		email: "test@test.com",
		password: "password",
	};

	const userDB = {
		id: "1",
		email: "test@test.com",
		password: bcrypt.hashSync("password", bcrypt.genSaltSync(8)),
	};
	const userRepositoryMock: UserRepositoryInterface = {
		findByEmail: jest.fn().mockResolvedValue(userDB),
		create: jest.fn().mockReturnValue(""),
	};
	const userService = new UserService(userRepositoryMock);
	const result = await userService.login(user);
	expect(result?.password).toEqual("");
});

it("should return null when valid user logs in with invalid password", async () => {
	const hashedPassword = bcrypt.hashSync("password", bcrypt.genSaltSync(8));
	const user = {
		id: "1",
		email: "test@test.com",
		password: hashedPassword,
	};
	const userRepositoryMock: UserRepositoryInterface = {
		findByEmail: jest.fn().mockResolvedValue(user),
		create: jest.fn().mockReturnValue(""),
	};
	const userService = new UserService(userRepositoryMock);
	const result = await userService.login({ ...user, password: "invalid" });
	expect(result).toBeNull();
});

it("should return null when invalid user logs in", async () => {
	const userRepositoryMock: UserRepositoryInterface = {
		findByEmail: jest.fn().mockResolvedValue(null),
		create: jest.fn().mockReturnValue(""),
	};
	const userService = new UserService(userRepositoryMock);
	const result = await userService.login({
		email: "invalid@test.com",
		password: "password",
	});
	expect(result).toBeNull();
});

it("should throw error when signing up with existing email", async () => {
	const userRepositoryMock: UserRepositoryInterface = {
		create: jest.fn().mockRejectedValue(new Error("Email already exists")),
		findByEmail: jest.fn().mockReturnValue(""),
	};
	const userService = new UserService(userRepositoryMock);
	const user = {
		id: "1",
		email: "test@test.com",
		password: "password",
	};
	await expect(userService.signup(user)).rejects.toThrow("Email already exists");
});

import UserRepository from "../db/UserRepository";
import UserRepositoryInterface from "../db/UserRepositoryInterface";
import { User } from "../entity/entities";
import bcrypt from "bcrypt";

const SALT_ROUNDS = 8;
export class UserService {
	constructor(private userRepository: UserRepositoryInterface) {}
	public async signup(user: User): Promise<string> {
		console.log("creating user", user.email);
		user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(SALT_ROUNDS));
		const id = await this.userRepository.create(user);
		return id;
	}

	public async login(user: User): Promise<User | null> {
		console.log("checking user", user.email);
		const userDB: User | null = await this.userRepository.findByEmail(user.email);
		if (userDB) {
			const isValid = bcrypt.compareSync(user.password, userDB.password);
			if (isValid) {
				userDB.password = "";
				return userDB;
			}
			console.log("password is invalid", user.email);
			return null;
		}
		return null;
	}
}

export function createInstance() {
	const userRepository = new UserRepository();
	return new UserService(userRepository);
}

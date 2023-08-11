import UserRepository from "../db/UserRepository";
import UserRepositoryInterface from "../db/UserRepositoryInterface";
import { User } from "../entity/entities";
import bcrypt from "bcrypt";
import InvalidPasswordException from "../exception/InvalidPasswordException";

const SALT_ROUNDS = 8;
export class UserService {
	constructor(private userRepository: UserRepositoryInterface) {}
	public async signup(user: User): Promise<string> {
		console.log("creating user");
		user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(SALT_ROUNDS));
		const id = await this.userRepository.create(user);
		return id;
	}

	public async login(user: User): Promise<User | null> {
		const userDB: User | null = await this.userRepository.findByEmail(user.email);
		console.log("checking user", user.id);
		if (userDB) {
			const isValid = bcrypt.compareSync(user.password, userDB.password);
			if (isValid) {
				userDB.password = "";
				return userDB;
			}
			throw new InvalidPasswordException(`Invalid Password for user ${userDB.id}`);
		}
		return null;
	}
}

export function createInstance() {
	const userRepository = new UserRepository();
	return new UserService(userRepository);
}

import { User } from "../entity/entities";

export default interface UserRepositoryInterface {
	create(user: User): Promise<string>;
	findByEmail(email: string): Promise<User | null>;
}

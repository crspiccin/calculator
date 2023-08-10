import { User } from "../entity/entities";
import { SQLLiteRepository } from "./SQLiteRepository";

export default class UserRepository extends SQLLiteRepository {
	public async findAll(): Promise<any> {
		return super.all("SELECT * from USER");
	}

	public async create(user: User): Promise<string> {
		const sql = "INSERT INTO USER ( email, password) VALUES (?,?)";
		const id = await super.insert(sql, [user.email, user.password]);
		return id;
	}

	public async findByEmail(email: string): Promise<User | null> {
		const sql = "SELECT * FROM USER WHERE email = ?";
		const result: any = await super.get(sql, [email]);
		if (!result) {
			return null;
		}
		const user: User = {
			id: result.id,
			email: result.email,
			password: result.password,
		};
		return user;
	}
}

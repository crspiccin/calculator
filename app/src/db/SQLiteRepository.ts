import sqlite3 from "sqlite3";
import { open } from "sqlite";
import path from "path";

export class SQLLiteRepository {
	private db: any;
	constructor() {
		(async () => {
			// open the database
			this.db = await open({
				filename: path.join(__dirname, "..", "..", process.env.DB_NAME || "calculator.db"),
				driver: sqlite3.Database,
			});
			this.db.run("PRAGMA foreign_keys = ON;");
		})();
	}

	protected async insert(sql: string, params: any[]): Promise<string> {
		const result = await this.db.run(sql, params);
		return result.lastID;
	}

	protected async run(sql: string, params: any[]): Promise<void> {
		await this.db.run(sql, params);
	}

	protected async query(sql: string, params: any[]): Promise<any[]> {
		return await this.db.all(sql, params);
	}

	protected async get(sql: string, params: any[]): Promise<any> {
		return await this.db.get(sql, params);
	}

	protected async all(sql: string): Promise<any[]> {
		return await this.db.all(sql);
	}

	protected async close(): Promise<void> {
		await this.db.close();
	}
}

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
exports.SQLLiteRepository = void 0;
const sqlite3_1 = __importDefault(require("sqlite3"));
const sqlite_1 = require("sqlite");
const path_1 = __importDefault(require("path"));
class SQLLiteRepository {
    constructor() {
        (() => __awaiter(this, void 0, void 0, function* () {
            // open the database
            this.db = yield (0, sqlite_1.open)({
                filename: path_1.default.join(__dirname, "..", "..", process.env.DB_NAME || ""),
                driver: sqlite3_1.default.Database,
            });
            this.db.run("PRAGMA foreign_keys = ON;");
        }))();
    }
    insert(sql, params) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.db.run(sql, params);
            return result.lastID;
        });
    }
    run(sql, params) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.db.run(sql, params);
        });
    }
    query(sql, params) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.db.all(sql, params);
        });
    }
    get(sql, params) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.db.get(sql, params);
        });
    }
    all(sql) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.db.all(sql);
        });
    }
    close() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.db.close();
        });
    }
}
exports.SQLLiteRepository = SQLLiteRepository;

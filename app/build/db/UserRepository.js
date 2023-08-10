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
Object.defineProperty(exports, "__esModule", { value: true });
const SQLiteRepository_1 = require("./SQLiteRepository");
class UserRepository extends SQLiteRepository_1.SQLLiteRepository {
    findAll() {
        const _super = Object.create(null, {
            all: { get: () => super.all }
        });
        return __awaiter(this, void 0, void 0, function* () {
            return _super.all.call(this, "SELECT * from USER");
        });
    }
    create(user) {
        const _super = Object.create(null, {
            insert: { get: () => super.insert }
        });
        return __awaiter(this, void 0, void 0, function* () {
            const sql = "INSERT INTO USER ( email, password) VALUES (?,?)";
            const id = yield _super.insert.call(this, sql, [user.email, user.password]);
            return id;
        });
    }
    findByEmail(email) {
        const _super = Object.create(null, {
            get: { get: () => super.get }
        });
        return __awaiter(this, void 0, void 0, function* () {
            const sql = "SELECT * FROM USER WHERE email = ?";
            const result = yield _super.get.call(this, sql, [email]);
            if (!result) {
                return null;
            }
            const user = {
                id: result.id,
                email: result.email,
                password: result.password,
            };
            return user;
        });
    }
}
exports.default = UserRepository;

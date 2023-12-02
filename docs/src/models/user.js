"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const token_1 = __importDefault(require("./token"));
const daj_1 = __importDefault(require("./daj"));
//
class User extends daj_1.default {
    constructor(user, password) {
        super();
        this.user = user;
        this.password = password;
        this._token = token_1.default.empty();
    }
    get token() { return this._token; }
    set token(token) { this._token = token; }
}
exports.default = User;

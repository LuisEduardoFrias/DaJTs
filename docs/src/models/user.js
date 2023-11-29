"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const daj_1 = __importDefault(require("./daj"));
//
class User extends daj_1.default {
    constructor(credential) {
        super();
        this.user = credential.user;
        this.password = credential.password;
        this._token = null;
    }
    get token() { return this._token; }
    set token(token) { this._token = token; }
}
exports.default = User;

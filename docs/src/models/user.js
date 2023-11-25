"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dajb_1 = __importDefault(require("./dajb"));
//
class User extends dajb_1.default {
    constructor(credential) {
        super();
        this.user = credential.user;
        this.password = credential.password;
        this.toke = null;
    }
}
exports.default = User;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const guid_typescript_1 = require("guid-typescript");
class Token {
    constructor() {
        this.token = guid_typescript_1.Guid.create().toString();
    }
    static empty() {
        const tokenInstance = new Token();
        tokenInstance.token = null;
        return tokenInstance;
    }
    static toToken(token) {
        const tokenInstance = new Token();
        tokenInstance.token = token;
        return tokenInstance;
    }
}
exports.default = Token;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const guid_typescript_1 = require("guid-typescript");
//
class Token {
    //
    constructor() {
        this.token = guid_typescript_1.Guid.create().toString();
    }
}
exports.default = Token;

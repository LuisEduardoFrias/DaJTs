"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const js_guid_1 = require("js-guid");
//
class Token {
    //
    constructor() {
        this.token = js_guid_1.Guid.newGuid().StringGuid;
    }
}
exports.default = Token;

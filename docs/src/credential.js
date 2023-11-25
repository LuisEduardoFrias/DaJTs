"use strict";
/** @format */
const { Guid } = require("js-guid");
class Token {
    constructor() {
        this.token = Guid.newGuid().StringGuid;
    }
}
module.exports.Credential = Credential;
module.exports.Token = Token;

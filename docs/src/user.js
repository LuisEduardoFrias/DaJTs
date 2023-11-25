"use strict";
const { Credential, Token } = require("./credential");
const dajb = require("./dajb");
//
class User extends dajb {
    constructor(credential) {
        super();
        this.user = credential.user;
        this.password = credential.password;
    }
}
module.exports.User = User;

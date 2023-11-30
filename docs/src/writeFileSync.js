"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const locks_1 = require("./locks");
const config_1 = require("../config");
const errors_1 = require("./errors");
const fs_1 = __importDefault(require("fs"));
//
function writeFileSync(data) {
    try {
        fs_1.default.writeFileSync(config_1.DB_NAME, (0, locks_1.encript)(JSON.stringify(data)));
        return { error: null, data: "Success" };
    }
    catch (err) {
        return { error: errors_1.errors.notDataAccess("writeFileSync", 13), data: null };
    }
}
exports.default = writeFileSync;

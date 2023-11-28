"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const locks_1 = require("./locks");
const createFile_1 = require("./createFile");
const errors_1 = require("./errors");
const fs_1 = __importDefault(require("fs"));
//
function writeFileSync(data) {
    try {
        fs_1.default.writeFileSync(createFile_1.db_name, (0, locks_1.encript)(JSON.stringify(data)));
        return { error: null, data: "Success" };
    }
    catch (err) {
        console.log(err);
        return { error: errors_1.errors.notDataAccess, data: null };
    }
}
exports.default = writeFileSync;

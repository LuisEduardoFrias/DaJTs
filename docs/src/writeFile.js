"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const locks_1 = require("./locks");
const createFile_1 = require("./createFile");
const errors_1 = require("./errors");
const fs_1 = __importDefault(require("fs"));
function writeFile(data, callback) {
    fs_1.default.writeFile(createFile_1.db_name, (0, locks_1.encript)(JSON.stringify(data)), (err) => {
        if (err) {
            console.log(err);
            callback(errors_1.errors.notDataAccess, null);
        }
        else {
            callback(null, "Success");
        }
    });
}
exports.default = writeFile;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const locks_1 = require("./locks");
const config_1 = require("../config");
const errors_1 = require("./errors");
const fs_1 = __importDefault(require("fs"));
function writeFile(data, callback) {
    fs_1.default.writeFile(config_1.DB_NAME, (0, locks_1.encript)(JSON.stringify(data)), (err) => {
        if (err) {
            callback(errors_1.errors.notDataAccess("writeFile", 11), null);
        }
        else {
            callback(null, "Success");
        }
    });
}
exports.default = writeFile;

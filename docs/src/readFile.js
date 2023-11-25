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
function readFile(callback) {
    fs_1.default.readFile(createFile_1.db_name, (err, data) => {
        if (err) {
            console.error(err);
            callback(errors_1.errors.notDataAccess, null);
        }
        else {
            let newObj = {};
            let isError = false;
            try {
                newObj = JSON.parse((0, locks_1.desencript)(data));
            }
            catch (err) {
                isError = true;
                console.error(err);
                callback(errors_1.errors.notData, null);
            }
            if (!isError)
                callback(null, newObj);
        }
    });
}
exports.default = readFile;

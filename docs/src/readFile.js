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
function readFile(callback) {
    fs_1.default.readFile(config_1.DB_NAME, (err, data) => {
        if (err) {
            console.error(err);
            callback(errors_1.errors.notDataAccess("readFile", 12), null);
        }
        else {
            let newObj = {};
            let isError = false;
            try {
                newObj = JSON.parse((0, locks_1.desencript)(data.toString()));
            }
            catch (err) {
                isError = true;
                console.error(err);
                callback(errors_1.errors.notData("readFile", 21), null);
            }
            if (!isError)
                callback(null, newObj);
        }
    });
}
exports.default = readFile;

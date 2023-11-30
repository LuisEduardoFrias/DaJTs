"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createFileSync = exports.createFile = void 0;
const fs_1 = __importDefault(require("fs"));
const errors_1 = require("./errors");
const config_1 = require("../config");
//
// createFile
//
function createFile(callback, daj) {
    if (!fs_1.default.existsSync(config_1.DB_NAME)) {
        fs_1.default.appendFile(config_1.DB_NAME, "", (err) => {
            if (err) {
                callback(errors_1.errors.notDataAccess("createFile", 17), null);
            }
            else {
                console.log(`The data file does create.`);
                callback(null, null);
            }
        });
    }
    else {
        daj.getAll(callback);
    }
}
exports.createFile = createFile;
//
//createFileAsync
//
function createFileSync(daj) {
    if (!fs_1.default.existsSync(config_1.DB_NAME)) {
        try {
            fs_1.default.appendFileSync(config_1.DB_NAME, "");
            console.log(`The data file does create.`);
            return { error: null, data: null };
        }
        catch (err) {
            throw new TypeError(errors_1.errors.notDataAccess("createFileSync", 38));
        }
    }
    else {
        return daj.getAllSync();
    }
}
exports.createFileSync = createFileSync;

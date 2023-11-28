"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createFileSync = exports.createFile = exports.db_name = void 0;
const fs_1 = __importDefault(require("fs"));
const errors_1 = require("./errors");
exports.db_name = "./datafile.daj.db";
//
// createFile
//
function createFile(callback, daj) {
    if (!fs_1.default.existsSync(exports.db_name)) {
        fs_1.default.appendFile(exports.db_name, "", (err) => {
            if (err) {
                console.error(err);
                callback(errors_1.errors.notDataAccess, null);
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
    if (!fs_1.default.existsSync(exports.db_name)) {
        try {
            fs_1.default.appendFileSync(exports.db_name, "");
            console.log(`The data file does create.`);
            return { error: null, data: null };
        }
        catch (err) {
            console.error(err);
            throw new TypeError(errors_1.errors.notDataAccess);
        }
    }
    else {
        return daj.getAllSync();
    }
}
exports.createFileSync = createFileSync;

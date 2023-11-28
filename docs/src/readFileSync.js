"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const locks_1 = require("./locks");
const createFile_1 = require("./createFile");
const errors_1 = require("./errors");
const fs_1 = __importDefault(require("fs"));
function readFileSync() {
    try {
        const data = fs_1.default.readFileSync(createFile_1.db_name);
        try {
            return { error: null, data: JSON.parse((0, locks_1.desencript)(data.toString())) };
        }
        catch (err) {
            console.log(err);
            return { error: errors_1.errors.notData, data: null };
        }
    }
    catch (err) {
        console.log(err);
        return { error: errors_1.errors.notDataAccess, data: null };
    }
}
exports.default = readFileSync;
;

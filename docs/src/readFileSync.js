"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const locks_1 = require("./locks");
const config_1 = require("../config");
const errors_1 = require("./errors");
const fs_1 = __importDefault(require("fs"));
function readFileSync() {
    try {
        const data = fs_1.default.readFileSync(config_1.DB_NAME);
        try {
            return { error: null, data: JSON.parse((0, locks_1.desencript)(data.toString())) };
        }
        catch (err) {
            return { error: errors_1.errors.notData("readFileSync", 14), data: null };
        }
    }
    catch (err) {
        return { error: errors_1.errors.notDataAccess("readFileSync", 18), data: null };
    }
}
exports.default = readFileSync;
;

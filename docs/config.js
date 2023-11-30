"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LOCK = exports.DB_NAME = exports.IS_DEVELOPMENT = void 0;
exports.IS_DEVELOPMENT = true;
exports.DB_NAME = `./datafile.daj.${exports.IS_DEVELOPMENT ? "json" : "db"}`;
exports.LOCK = false;

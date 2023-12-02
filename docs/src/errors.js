"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errors = void 0;
const config_1 = require("../config");
exports.errors = {
    notAdd(file, row) {
        return `DaJ; ${config_1.IS_DEVELOPMENT && `${file}, row?: ${row}`} Error: Data not added`;
    },
    userNotExist(file, row) {
        return `DaJ; ${config_1.IS_DEVELOPMENT && `${file}, row?: ${row}`} Error: User no exist.`;
    },
    notData(file, row) {
        return `DaJ; ${config_1.IS_DEVELOPMENT && `${file}, row?: ${row}`} Error: No data found`;
    },
    keyNotFound(file, row) {
        return `DaJ; ${config_1.IS_DEVELOPMENT && `${file}, row?: ${row}`} Error: 'key' is not found.`;
    },
    notDataAccess(file, row) {
        return `DaJ; ${config_1.IS_DEVELOPMENT && `${file}, row?: ${row}`} Error: No access to data file?.`;
    },
    arrayNot(file, row) {
        return `DaJ; ${config_1.IS_DEVELOPMENT && `${file}, row?: ${row}`} Error: Arrays are not supported in a PUT operation.`;
    },
};

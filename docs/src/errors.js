"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errors = void 0;
var errors;
(function (errors) {
    errors["notAdd"] = "DaJ; Error: Data not added";
    errors["notExits"] = "DaJ; Error: User no exist.";
    errors["notData"] = "DaJ; Error: No data found";
    errors["key"] = "DaJ; Error: A 'key' value is required.";
    errors["notDataAccess"] = "DaJ; Error: No access to data file.";
    errors["arrayNot"] = "DaJ; Error: Arrays are not supported in a PUT operation.";
})(errors || (exports.errors = errors = {}));

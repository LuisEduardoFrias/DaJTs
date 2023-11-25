"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DajB = exports.User = void 0;
const daj_1 = __importDefault(require("./src/models/daj"));
exports.DajB = daj_1.default;
const user_1 = __importDefault(require("./src/models/user"));
exports.User = user_1.default;
const gateway_1 = __importDefault(require("./src/gateway"));
const daj = new gateway_1.default();
exports.default = daj;

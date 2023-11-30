"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Token = exports.User = exports.DajB = void 0;
const daj_1 = __importDefault(require("./src/models/daj"));
exports.DajB = daj_1.default;
const gateway_1 = __importDefault(require("./src/gateway"));
const user_1 = __importDefault(require("./src/models/user"));
exports.User = user_1.default;
const token_1 = __importDefault(require("./src/models/token"));
exports.Token = token_1.default;
const daj = new gateway_1.default();
exports.default = daj;

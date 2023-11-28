/** @format */
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.desencript = exports.encript = void 0;
const crypto_1 = __importDefault(require("crypto"));
const buffer_1 = require("buffer");
const key = "h@u37.jd7J&#8Jsi^##>(+.:#hshqpb";
function code(str) {
    let _str = btoa(str);
    const output = [];
    for (let i = 0; i < _str.length; i++) {
        let bin = _str[i].charCodeAt(0).toString(2);
        output.push(Array(8 - bin.length + 1).join("0") + bin);
    }
    return output.join(" ");
}
function encode(str) {
    let _str = new String(str);
    let binString = "";
    _str
        .split(" ")
        .map((bin) => (binString += String.fromCharCode(parseInt(bin, 2))));
    return atob(binString);
}
function encript(text) {
    const iv = crypto_1.default.randomBytes(16);
    const encription = crypto_1.default.createCipheriv("aes-256-cbc", buffer_1.Buffer.from(key), iv);
    let _encript = encription.update(text);
    _encript = buffer_1.Buffer.concat([_encript, encription.final()]);
    return code(iv.toString("hex") + ":" + _encript.toString("hex"));
}
exports.encript = encript;
function desencript(text) {
    const piece = encode(text).split(":");
    const iv = buffer_1.Buffer.from(piece[0], "hex");
    const cifrado = buffer_1.Buffer.from(piece[1], "hex");
    const encription = crypto_1.default.createDecipheriv("aes-256-cbc", buffer_1.Buffer.from(key), iv);
    let textDencriptor = encription.update(cifrado);
    textDencriptor = buffer_1.Buffer.concat([textDencriptor, encription.final()]);
    return textDencriptor.toString();
}
exports.desencript = desencript;

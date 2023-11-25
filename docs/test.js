"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = __importDefault(require("./index"));
const index_2 = __importDefault(require("./index"));
//
class Persona extends index_1.default {
    constructor(name, age) {
        super();
        this.name = name;
        this.age = age;
    }
}
const Persona1 = new Persona("luis", 28);
const response = index_2.default.postAsync(Persona1);
console.log(JSON.stringify(response));

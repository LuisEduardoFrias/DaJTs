"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = __importStar(require("./index"));
//--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
class Persona extends index_1.DajB {
    constructor(name, age) {
        super();
        this.name = name;
        this.age = age;
    }
}
const person1 = new Persona("luis", 38);
const person2 = new Persona("juan", 28);
const person3 = new Persona("carlos", 18);
const person4 = new Persona("emilio", 8);
const person5 = new Persona("johan", 88);

person5.key = "4bb943c5-0387-1df7-7e72-e4cef5cf1393";

const callback = (error, data) => {
    console.log("callback: " + error);
    console.log("callback: " + JSON.stringify(data,null,2));
};
// index_1.default.post(callback, person4);
// const response = index_1.default.postSync(person5);
//index_1.default.put(callback, person5);
// const response =  index_1.default.postSync(person5);
//index_1.default.delete(callback, person5);
 //const response =  index_1.default.deleteSync(person5);

// index_1.default.getAll(callback);
// const response = index_1.default.getAllSync();
index_1.default.get(callback, person1);
// const response = index_1.default.getSync(person1);
// index_1.default.getByKey(callback, person1, "ffd5029f-ae3a-e006-989f-24e1d760c07a");
// const response = index_1.default.getByKeySync(person1, "a94d85f5-253f-3cdd-d9d6-8f8539e4f0fb");

//config.js console.log(JSON.stringify(response, null,2));
// Register
/*
class Model_User extends User {
 name: string;
 lastName: string;
 age: number;
 credentials: Credentials;
 constructor(name: string, lastName: string, age: number, user:string, password:string) {
  super()
  this.name = name;
  this.lastName = lastName;
  this.age = age;
  this.credentials = { user, password };
 }
}

const teacher: Model_User = new Model_User("Calor","Felipe",32, "Carlos_Felipe", "Carlos.F.3232");

//registrando usuairo
const {error, data} = index_1.default.registerSync(teacher);

if(!error)
  console.log(data) //Success
  

//propceso de logeo
const credentials : Credentials = {
 user:  "Carlos_Felipe",
 password: "Carlos.F.3232"
};

const user_token: Token = index_1.default.loginSync(credentials);

console.log(user_token.token) //7d5a3b9e-572a-4f9b-b3f8-2c8e5d19a6e1
//Los token son GUID (Globally Unique Identifier).

//validando el token
const isLogin: boolean = index_1.default.checkTokenSync(user_token.token);
console.log(isLogin) //true

//deslogeandose
const logout: boolean = index_1.default.logoutAsync(credentials);
console.log(logout) //true

//validando el token
const isLogin: boolean = index_1.default.checkTokenSync(user_token.token);
console.log(isLogin) //false

*/


"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const errors_1 = require("./src/errors");
const index_1 = __importDefault(require("./index"));
//-------------------------------------------------------
//Test get all 
index_1.default.getAll((error, data) => {
    console.log("Test get all not data access: ");
    if (error === errors_1.errors.notDataAccess("readFile", 12) && data === null) {
        console.log(true);
    }
    else
        console.log(false);
});
console.log("------------------------------------------");
const responseGetAllSync = index_1.default.getAllSync();
console.log("Test get all Sync not data access: ");
if (responseGetAllSync.error === errors_1.errors.notDataAccess("readFileSync", 18) && responseGetAllSync.data === null) {
    console.log(true);
}
else
    console.log(false);
console.log("------------------------------------------");
/*

class Persona extends DajB {
 name:string;
 age: number;
 constructor(name: string,age: number) {
  super();
  this.name = name;
  this.age = age;
 }
}

class Auto extends DajB {
 marca:string;
 age: number;
 color: string;
 constructor(marca: string,age: number, color: string) {
  super();
  this.marca = marca;
  this.age = age;
  this.color = color;
 }
}

const profesor = new Persona("Jose",31);
const policia = new Persona("Carlos",28);
const bombero = new Persona("Manuel",23);

const callback =

daj.post(callback, person1);
const response = daj.postSync(person1);

daj.put(callback, person1);
const response = daj.postSync(person1);

daj.delete(callback, person1);
const response = daj.deleteSync(person1);



const response = daj.get(callback);
const response = daj.getSync(person1);
const response = daj.getByKey(callback);
const response = daj.getByKeySync(person1);

console.log(JSON.stringify(response));

// Register

class Model_User extends User {
 name: string;
 lastName: string;
 age: number;
 
 constructor(name: string, lastName: string, age: number, user:string, password:string) {
  const credential: Credentials = { user, password };
  super(user, password)
  
  this.name = name;
  this.lastName = lastName;
  this.age = age;
 }
}

const teacher: Model_User = new Model_User("Luis","Frias",29, "LuisEduardoFrias", "EduarLuis941127");

//registrando usuairo
const {error, data} = daj.registerSync(teacher);

if(!error)
  console.log(data) //Success
  

//propceso de logeo
const credentials : Credentials = {
 user:  "Carlos_Felipe",
 password: "Carlos.F.3232"
};

const user_token: Token = daj.loginSync(credentials);

console.log(user_token.token) //7d5a3b9e-572a-4f9b-b3f8-2c8e5d19a6e1
//Los token son GUID (Globally Unique Identifier).

//validando el token
const newToken = Token.toToken("5a5ee1df-dfe9-a247-4491-fbb64c4da173");

const isLogin: boolean = daj.checkTokenSync(newToken);
console.log(isLogin) //true

//deslogeandose
const logout: boolean = daj.logoutAsync(credentials);
console.log(logout) //true

//validando el token
const _isLogin: boolean = daj.checkTokenSync(Token.toToken(user_token.token as string));
console.log(_isLogin) //false
*/ 

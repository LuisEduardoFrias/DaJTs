import daj, { DajB } from "./index";
//
class Persona extends DajB {
 name:string;
 age: number;
 constructor(name: string,age: number) {
  super();
  this.name = name;
  this.age = age;
 }
}

const Persona1 = new Persona("luis",28);

const response = daj.postSync(Persona1);

console.log(JSON.stringify(response));

/*
import daj, { User, Response, Credentials, Token } from "./index";

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
const isLogin: boolean = daj.checkTokenSync(user_token.token);
console.log(isLogin) //true

//deslogeandose
const logout: boolean = daj.logoutAsync(credentials);
console.log(logout) //true

//validando el token
const isLogin: boolean = daj.checkTokenSync(user_token.token);
console.log(isLogin) //false

*/

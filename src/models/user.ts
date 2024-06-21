//import Credential from './credential.js'
import Token from './token.js'
import DajB from './daj.js'
//
export default class User extends DajB {
  user: string;
  password: string;
  private _token: Token;
  
  constructor(user: string, password: string) {
    super();
    this.user = user;
    this.password = password;
    this._token = Token.empty();
  }
  
  public get token() : Token { return this._token;}
  private set token(token: Token){ this._token = token; }
}
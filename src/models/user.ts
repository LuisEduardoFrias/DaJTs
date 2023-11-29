import Credential from "./credential";
import Token from "./token";
import DajB from "./daj";
//
export default class User extends DajB {
  user: string;
  password: string;
  private _token: Token | null;
  
  constructor(credential: Credential) {
    super();
    this.user = credential.user;
    this.password = credential.password;
    this._token = null;
  }
  
  public get token() : Token | null { return this._token;}
  private set token(token: Token){ this._token = token; }
}
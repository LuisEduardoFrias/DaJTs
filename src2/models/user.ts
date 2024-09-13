//import Credential from './credential.js'
import bcrypt from 'bceypt'
import Token from './token.js'
import DajB from './daj.js'
import readConfigFile from './readConfigFile.js';
import { environment } from './environment.js';
//
export default class User extends DajB {
  userName: string;
  password: string;
  private _token: Token;

  constructor(userName: string, password: string) {
    super();
    this.userName = userName;
    this.hash(password);
    this._token = Token.empty();
  }

  private async hash(password) {
    this.password = await bcrypt.hash(password,
      readConfigFile.ENVIRONMENT == environment.development ?
        parseInt(readConfigFile()?.SALT_ROUNDS_D) :
        readConfigFile.ENVIRONMENT == environment.production ?
          parseInt(readConfigFile()?.SALT_ROUNDS_P) :
          readConfigFile.ENVIRONMENT == environment.test ?
            parseInt(readConfigFile()?.SALT_ROUNDS_T) : 10);
  }
  public get token(): Token { return this._token; }
  private set token(token: Token) { this._token = token; }
}
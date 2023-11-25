import Credential from "./credential";
import Token from "./token";
import DajB from "./dajb";
//
export default class User extends DajB {
  user: string;
  password: string;
  private toke: Token | null;
  
  constructor(credential: Credential) {
    super();
    this.user = credential.user;
    this.password = credential.password;
    this.toke = null;
  }
}
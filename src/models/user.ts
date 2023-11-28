import Credential from "./credential";
import Token from "./token";
import DajB from "./daj";
//
export default class User extends DajB {
  user: string;
  password: string;
  private token: Token | null;
  
  constructor(credential: Credential) {
    super();
    this.user = credential.user;
    this.password = credential.password;
    this.token = null;
  }
}
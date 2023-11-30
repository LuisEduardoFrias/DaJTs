import DajB from "./src/models/daj"; 
import Daj from "./src/gateway"; 
import User from "./src/models/user"; 
import Token from "./src/models/token"; 
import Credentials from "./src/models/credential";
import Response, { Data, Error } from "./src/models/response";
import {Callback} from "./src/models/callback";

const daj = new Daj();
export default daj;
export { DajB, User, Token, Credentials, Response, Callback, Data, Error};
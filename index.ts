import DajB from "./src/models/daj"; 
import User from "./src/models/user"; 
import Credentials from "./src/models/credential";
import Response from "./src/models/response";
import Callback from "./src/models/callback";
import Data from "./src/models/response";
import Error from "./src/models/response";

const daj = new Daj();
export default daj;
export { DajB, User, Credentials, Response, Callback, Data, Error};
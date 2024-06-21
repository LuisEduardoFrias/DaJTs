import DajB from './src/models/daj.js';
import Daj from './src/gateway.js';
import User from './src/models/user.js';
import Token from './src/models/token.js';
import Credentials from './src/models/credential.js';
import Response, { Data, Error } from './src/models/response.js';
import { Callback } from './src/models/callback.js';

const daj = new Daj();
export default daj;
export { DajB, User, Token, Credentials, Response, Callback, Data, Error };

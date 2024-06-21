import { encript } from './locks.js';
import { DB_NAME } from '../config.js';
import { errors } from './errors.js';
import Response from './models/response.js';
import fs from 'fs';
//
export default function writeFileSync(data: object): Response {
  try {
    fs.writeFileSync(DB_NAME, encript(JSON.stringify(data)));
    return { error: null, data: 'Success' };
  } catch (err: any) {
    return { error: errors.notDataAccess('writeFileSync', 13), data: null };
  }
}

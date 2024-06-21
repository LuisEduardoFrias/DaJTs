import { encript } from './locks.js';
import { DB_NAME } from '../config.js';
import { errors } from './errors.js';
import { Callback } from './models/callback.js';
import fs from 'fs';

export default function writeFile(data: object, callback: Callback): void {
  fs.writeFile(DB_NAME, encript(JSON.stringify(data)), (err: any) => {
    if (err) {
      callback(errors.notDataAccess('writeFile', 11), null);
    } else {
      callback(null, 'Success');
    }
  });
}

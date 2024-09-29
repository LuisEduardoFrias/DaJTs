import { encript } from './locks.js';
import readConfigFile from './readConfigFile.js';
import { environment } from './models/environment.js';
import { errors } from './errors.js';
import { Callback } from './models/callback.js';
import fs from 'fs';
//
const datafileName = readConfigFile()?.DB_NAME ?? 'datafile';
const isDebelopment = readConfigFile()?.ENVIRONMENT == environment.development;
const fullDataConfiFile = `./${datafileName}.daj.${isDebelopment ? 'json' : 'db'}`;
//
export default function writeFile(data: object, callback: Callback): void {
  fs.writeFile(fullDataConfiFile, encript(JSON.stringify(data)), (err: any) => {
    if (err) {
      callback(errors.notDataAccess('writeFile', 11), null);
    } else {
      callback(null, 'Success');
    }
  });
}

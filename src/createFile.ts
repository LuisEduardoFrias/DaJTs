'use strict';

import fs from 'fs';
import { errors } from './errors.js';
import { Callback } from './models/callback.js';
import Response from './models/response.js';
import Daj from './gateway.js';
import readConfigFile from './readConfigFile.js';
//
// createFile
//
const datafileName = readConfigFile()?.DB_NAME ?? 'datafile';
const isDebelopment = readConfigFile()?.IS_DEVELOPMENT ?? false;
const fullDataConfiFile = `./${datafileName}.daj.${
  isDebelopment ? 'json' : 'db'
}`;

export function createFile(callback: Callback, daj: Daj): void {
  if (!fs.existsSync(fullDataConfiFile)) {
    fs.appendFile(fullDataConfiFile, '', (err: any) => {
      if (err) {
        callback(errors.notDataAccess('createFile', 17), null);
      } else {
        console.log(`The data file does create.`);
        callback(null, null);
      }
    });
  } else {
    daj.getAll(callback);
  }
}
//
//createFileAsync
//
export function createFileSync(daj: Daj): Response {
  if (!fs.existsSync(fullDataConfiFile)) {
    try {
      fs.appendFileSync(fullDataConfiFile, '');
      console.log(`The data file does create.`);
      return { error: null, data: null };
    } catch (err: any) {
      throw new TypeError(errors.notDataAccess('createFileSync', 38));
    }
  } else {
    return daj.getAllSync();
  }
}

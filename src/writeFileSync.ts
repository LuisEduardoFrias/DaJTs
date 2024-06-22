import { encript } from './locks.js';
import readConfigFile from './readConfigFile.js';
import { errors } from './errors.js';
import Response from './models/response.js';
import fs from 'fs';
//
const datafileName = readConfigFile()?.DB_NAME ?? 'datafile';
const isDebelopment = readConfigFile()?.IS_DEVELOPMENT ?? false;
const fullDataConfiFile = `./${datafileName}.daj.${
  isDebelopment ? 'json' : 'db'
}`;
//
export default function writeFileSync(data: object): Response {
  try {
    fs.writeFileSync(fullDataConfiFile, encript(JSON.stringify(data)));
    return { error: null, data: 'Success' };
  } catch (err: any) {
    return { error: errors.notDataAccess('writeFileSync', 13), data: null };
  }
}

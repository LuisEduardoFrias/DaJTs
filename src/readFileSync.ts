import { /*encript,*/ desencript } from './locks.js';
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
export default function readFileSync(): Response {
  try {
    const data = fs.readFileSync(fullDataConfiFile);
    try {
      return { error: null, data: JSON.parse(desencript(data.toString())) };
    } catch (err: any) {
      return { error: errors.notData('readFileSync', 13), data: null };
    }
  } catch (err: any) {
    return { error: errors.notDataAccess('readFileSync', 18), data: null };
  }
}

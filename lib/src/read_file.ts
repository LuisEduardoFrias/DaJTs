//
import { existsSync, readFileSync } from 'fs';
import decrypt from './decrypt.js';
import {DbType} from './models/db_type.js';
import readConfigFile from './read_config_file.js';
//
export default function readFile(): DbType | null {
  const { DB_FILE_PATH } = readConfigFile();

  if (existsSync(DB_FILE_PATH)) {
    return JSON.parse(
      decrypt(
        readFileSync(DB_FILE_PATH, { encoding: 'utf8' })
      )
    );
  } else {
    return null;
  }
}
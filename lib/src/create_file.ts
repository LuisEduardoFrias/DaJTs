//
import {existsSync, writeFileSync } from 'fs';
import readConfigFile from './read_config_file.js';
//
export default function createFile(): boolean {
  const { DB_FILE_PATH } = readConfigFile();
  //mode: 0o000
  if (existsSync(DB_FILE_PATH)) return true;
  
  writeFileSync(DB_FILE_PATH, '', { mode: 0o600, flag: 'a' });
  return false;
}
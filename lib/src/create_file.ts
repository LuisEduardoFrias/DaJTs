//
import { writeFileSync } from 'fs';
import readConfigFile from './read_config_file.js';
//
export default function createFile(): void {
  const { DB_FILE_PATH } = readConfigFile();
  //mode: 0o000
  writeFileSync(DB_FILE_PATH, '', { mode: 0o600, flag: 'a' });
}
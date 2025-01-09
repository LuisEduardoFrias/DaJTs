//
import { existsSync, openSync, writeSync, fsyncSync, closeSync } from 'fs';
import encrypt from './encrypt.js';
import readConfigFile from './read_config_file.js';
//
export default function overwriteFile(newObject: object): void {
  const { DB_FILE_PATH } = readConfigFile();

  if (existsSync(DB_FILE_PATH)) {
    //mode: 0o000, mode: 0o600

const fd = openSync(DB_FILE_PATH, 'w');

   // writeFileSync(DB_FILE_PATH, encrypt(JSON.stringify(newObject)), { flag: 'w', flush: true });
writeSync(fd, encrypt(JSON.stringify(newObject)));

fsyncSync(fd);
closeSync(fd);

  } else {
    console.log(`The file ${DB_FILE_PATH} no file exists.`);
    throw new Error(`The file ${DB_FILE_PATH} no file exists.`);
  }
}
//
import * as fs from 'fs';
import * as path from 'path';
import encrypt from './encrypt.js';
import readConfigFile from './readConfigFile.js';
import { fileURLToPath } from 'url';
//
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const { FILEPATH } = readConfigFile();

export default function subwriteFile(fileName: string, newObject: object): void {
  const filepath = path.join(FILEPATH ?? __dirname, `${fileName}.wolf.Json`);

  if (fs.existsSync(filepath)) {
    // fs.writeFileSync(filepath, encrypt(JSON.stringify(newObject)), { mode: 0o000 });
    fs.writeFileSync(filepath, encrypt(JSON.stringify(newObject)), { mode: 0o600 });
  } else {
    console.log(`The file ${fileName} no file exists.`);
  }
}
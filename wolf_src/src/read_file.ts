//
import * as fs from 'fs';
import * as path from 'path';
import decrypt from './decrypt.js';
import readConfigFile from './readConfigFile.js';
import { fileURLToPath } from 'url';
//
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const { FILEPATH } = readConfigFile();

export default function readFile(name: string): object | null {
  const filepath = path.join(FILEPATH ?? __dirname, `${name}.wolf.Json`);

  if (fs.existsSync(filepath)) {
    return JSON.parse(
      decrypt(
        fs.readFileSync(filepath, { encoding: 'utf8' })
      )
    );
  } else {
    return null;
  }
}
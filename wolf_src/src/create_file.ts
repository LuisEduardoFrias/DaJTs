//
import * as fs from 'fs';
import * as path from 'path';
import readConfigFile from './readConfigFile.js';
import { fileURLToPath } from 'url';

const { FILEPATH } = readConfigFile()
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default function createFile(fileName: string): void {
  const filepath = path.join(FILEPATH ?? __dirname, `${fileName}.wolf.Json`);
  // fs.writeFileSync(filepath, '', { mode: 0o000 });
  fs.writeFileSync(filepath, '', { mode: 0o600 });
}
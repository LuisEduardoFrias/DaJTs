import fs from 'fs';
import { Config } from './models/config.js';
//
const filePath = 'dajconfig.json';

export default function readConfigFile(): Config | null {
  try {
    if (!fs.existsSync(filePath)) return null;
    return JSON.parse(fs.readFileSync(filePath, 'utf8')) as Config;
  } catch (error) {
    console.error('Error to read config file.', error);
    return null;
  }
}

//import { readFile } from 'fs/promises';
import { existsSync, readFileSync } from 'fs';
import { dirname, join, resolve } from 'path';
import { randomBytes } from 'crypto';
import { fileURLToPath } from 'url';

import { environment } from './models/environment.js';
import { Config, ConfigFull } from './models/config.js';
//

const fileConfingPath = 'wolfconfig.json';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default function readConfigFile(): ConfigFull {

  const conf: ConfigFull = {
    ENVIRONMENT: environment.development,
    SALT_ROUNDS_D: 123,
    SALT_ROUNDS_P: 1234,
    SALT_ROUNDS_T: 123456,
    DB_FILE_PATH: `${join(__dirname, 'dbt.json')}`,
    ALGORITHM: 'aes-256-cbc',
    SECRETKEY: randomBytes(32),
    IV: IVGenerator.getInstance(16).getIV(),
  };

  try {
    if (!existsSync(fileConfingPath)) return conf;

    const filePath = resolve(fileConfingPath);
    const value = JSON.parse(readFileSync(filePath, { encoding: 'utf8' })) as Config;

    Reflect.set(value, 'IV', randomBytes(16));

    const DB_FILE_PATH = `${join(value.FILEPATH ?? __dirname, `${value.DB_NAME}.${value.ENVIRONMENT === environment.production ? 'db' : 'json'}`)}`;

    if (value.DB_NAME) {
      delete value.DB_NAME;
    }

    if (value.FILEPATH) {
      delete value.FILEPATH;
    }

    const newValue = { ...value } as ConfigFull;
    newValue.DB_FILE_PATH = DB_FILE_PATH;

    return newValue;
  } catch (error) {
    console.error('Error to read config file.', error);
    return conf;
  }
}

class IVGenerator {
  static instance: IVGenerator;
  iv: Buffer;

  constructor(byte: number) {
    this.iv = randomBytes(byte);
  }

  static getInstance(byte: number) {
    if (!IVGenerator.instance) {
      IVGenerator.instance = new IVGenerator(byte);
    }
    return IVGenerator.instance;
  }

  getIV() {
    return this.iv;
  }
}
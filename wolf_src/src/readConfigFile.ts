import fs from 'fs';
import crypto from 'crypto';
import { environment } from './models/environment.js';
import { Config } from './models/config.js';
//
const filePath = 'wolfconfig.json';

export default function readConfigFile(): Config {

  const conf = {
    ENVIRONMENT: environment.production,
    SALT_ROUNDS_D: 123,
    SALT_ROUNDS_P: 208645,
    SALT_ROUNDS_T: 346347900863,
    DB_NAME: "dbt",
    ALGORITHM: 'aes-256-cbc',
    SECRETKEY: crypto.randomBytes(32),
    IV: IVGenerator.getInstance(16).getIV(),
    FILEPATH: null,
  };

  try {
    if (!fs.existsSync(filePath)) return conf;

    const value = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    Reflect.set(value, 'IV', crypto.randomBytes(16));
    return value as Config;
  } catch (error) {
    console.error('Error to read config file.', error);
    return conf;
  }
}

class IVGenerator {
  static instance: IVGenerator;
  iv: Buffer;

  constructor(byte: number) {
    this.iv = crypto.randomBytes(byte);
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
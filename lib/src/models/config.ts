//
import { environment } from './environment.js';

export type Config = {
  ENVIRONMENT: environment;
  SALT_ROUNDS_D: number;
  SALT_ROUNDS_P: number;
  SALT_ROUNDS_T: number;
  DB_NAME?: string,
  FILEPATH?: string | null
  ALGORITHM: string,
  SECRETKEY: Buffer,
  IV: Buffer,
};

export type ConfigFull = {
  ENVIRONMENT: environment;
  SALT_ROUNDS_D: number;
  SALT_ROUNDS_P: number;
  SALT_ROUNDS_T: number;
  DB_FILE_PATH: string,
  ALGORITHM: string,
  SECRETKEY: Buffer,
  IV: Buffer
};

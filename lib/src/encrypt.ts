//
import * as crypto from 'crypto';
import { environment } from './models/environment.js';
import readConfigFile from './read_config_file.js';
//
const { ENVIRONMENT, ALGORITHM, SECRETKEY, IV } = readConfigFile();

export default function encrypt(text: string): string {
  if (ENVIRONMENT !== environment.production) return text;

  const cipher = crypto.createCipheriv(ALGORITHM, SECRETKEY, IV);
  let encryptedData = cipher.update(text, 'utf8', 'hex');
  encryptedData += cipher.final('hex');
  return IV.toString('hex') + ':' + encryptedData;
}
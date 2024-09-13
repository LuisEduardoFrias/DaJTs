//
import * as crypto from 'crypto';
import readConfigFile from './readConfigFile.js';
//
const { ALGORITHM, SECRETKEY, IV } = readConfigFile();

export default function encrypt(text: string): string {
  const cipher = crypto.createCipheriv(ALGORITHM, Buffer.from(SECRETKEY), IV);
  let encrypted = cipher.update(text);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return IV.toString('hex') + ':' + encrypted.toString('hex');
}
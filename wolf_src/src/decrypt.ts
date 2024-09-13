//
import * as crypto from 'crypto';
import readConfigFile from './readConfigFile.js';

//
const { ALGORITHM, SECRETKEY } = readConfigFile();

export default function decrypt(text: string): string {
  const textParts = text.split(':');
  const IV = Buffer.from(textParts.shift()!, 'hex');
  const encryptedText = Buffer.from(textParts.join(':'), 'hex');
  const decipher = crypto.createDecipheriv(ALGORITHM, Buffer.from(SECRETKEY), IV);
  let decrypted = decipher.update(encryptedText);
  decrypted = Buffer.concat([decrypted, decipher.final()]);
  return decrypted.toString();
}
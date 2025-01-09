import { createDecipheriv } from 'crypto';
import { environment } from './models/environment.js';
import readConfigFile from './read_config_file.js';

const { ENVIRONMENT, ALGORITHM, SECRETKEY } = readConfigFile();

export default function decrypt(text: string): string {
  if (ENVIRONMENT !== environment.production) return text;

  const textParts = text.split(':');
  const iv = textParts.shift()?.toString() 
      ? Buffer.from(textParts.shift()?.toString() ?? '', 'hex') 
      : undefined; 
      
  if (!iv) { 
      // Handle the case where iv is undefined 
      // For example, throw an error or return an empty string
      throw new Error("Invalid input format: Missing IV"); 
  }
  const encryptedText = Buffer.from(textParts.join(':'), 'hex');
  const decipher = createDecipheriv(ALGORITHM, SECRETKEY, iv);
  let decryptedData = ''; 
  decryptedData += decipher.update(encryptedText.toString('hex'), 'hex', 'utf8');
  decryptedData += decipher.final('utf8').toString();

  return decryptedData;
}

import * as crypto from 'crypto';
//
export function passwdEncript(password: string, key: string): string {
  const cipher = crypto.createCipher('aes-256-cbc', key);
  let encryptedPassword = cipher.update(password, 'utf8', 'hex');
  encryptedPassword += cipher.final('hex');
  return encryptedPassword;
}

export function passwdDesencript(encryptedPassword: string, key: string): string {
  const decipher = crypto.createDecipher('aes-256-cbc', key);
  let decryptedPassword = decipher.update(encryptedPassword, 'hex', 'utf8');
  decryptedPassword += decipher.final('utf8');
  return decryptedPassword;
}
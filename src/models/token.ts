//import { Guid } from 'guid-typescript'
import crypto from 'crypto';

export default class Token {
  token: string | null;

  constructor() {
    this.token = crypto.randomUUID(); //Guid.create().toString();
  }

  static empty() {
    const tokenInstance = new Token();
    tokenInstance.token = null;
    return tokenInstance;
  }

  static toToken(token: string) {
    const tokenInstance = new Token();
    tokenInstance.token = token;
    return tokenInstance;
  }
}
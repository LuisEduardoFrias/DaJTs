//import { Guid } from 'guid-typescript'
import crypto from 'crypto';

//TODO : MEJORAS
export default class Token {
  //token debe ser un tupla de string
  token: string | null;

  constructor() {
    this.token = crypto.randomUUID(); //Guid.create().toString();
  }

  static empty() {
    const tokenInstance = new Token();
    tokenInstance.token = null;
    return tokenInstance;
  }

//debe convertirba upla de string
  static toToken(token: string) {
    const tokenInstance = new Token();
    tokenInstance.token = token;
    return tokenInstance;
  }
}
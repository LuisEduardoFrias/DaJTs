import { Guid } from "guid-typescript";

export default class Token {
  token: string | null;

  constructor() {
    this.token = Guid.create().toString();
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
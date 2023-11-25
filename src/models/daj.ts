"use strict";
 
import { Guid } from "js-guid";

//Data Archive Json
export default abstract class DajB {
  key: string;

  constructor(identity: boolean = true) {
    if (identity) this.key = Guid.newGuid().StringGuid;
  }

  public json() {
    Reflect.set(this, "constructor", {
      name: this.constructor.name,
    });
    
    const _json: string = JSON.stringify(this);
    
    delete this.constructor;
    
    return _json;
  }

  public parse(json: string) {
    this.mapper(JSON.parse(json));
  }

  // Todo validar las propiedades
  public mapper(obj: object) {
    const keys = Reflect.ownKeys(obj);
    keys.forEach(key => {
      Reflect.set(this, key, obj[key]);
    });
  }

  static getInstance<T extends dajb>(
    this: new (...args: any[]) => T,
    ...args: any[]
  ): T {
    if (args.length === 0) {
      return new this();
    } else {
      return new this(...args);
    }
  }
}
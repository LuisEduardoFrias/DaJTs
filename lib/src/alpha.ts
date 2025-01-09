import crypto from 'crypto'
import { Id } from './models/identity.js'

export default class Alpha extends Object {
  public id: Id;
  private _reference: Alpha[];
  private _referred: Alpha;

  constructor(id?: Id) {
    super();

    if (!id) {
      this.id = crypto.randomUUID();
    }
    else {
      this.id = id;
    }
  }

  set reference(value: Alpha[]) {
    this._reference = value.map((item: Alpha) =>  item.name);
  }

  set referred(value: Alpha) {
    this._referred = value.name;
  }
}


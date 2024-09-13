//
'use strict';
import crypto from 'crypto'
import createFile from './create_file.js'
import subwriteFile from './subwrite_file.js'
import { environment } from './models/environment.js'
import readConfigFile from './readConfigFile.js';
//
const { ENVIRONMENT, DB_NAME } = readConfigFile();

const isDebelopment: boolean = (ENVIRONMENT === environment.production);
const fullDataConfiFile = `./${DB_NAME}.${isDebelopment ? 'db' : 'json'}`;

function wolfPackCreate(pack: object[], update: boolean = false) {
  return WolfPack.getInstance(pack, update);
}

class WolfPack {
  private static instance: WolfPack;

  private constructor() { }

  public static getInstance(wolves: any[], update: boolean): WolfPack {

    function initialice() {
      WolfPack.instance = new WolfPack();

      createFile(fullDataConfiFile);

      const files: object[] = [];

      wolves.forEach((item: any) => {
        const db = new Db<typeof item>();

        const uid = (crypto.randomUUID()).replace("-", "");

        Reflect.set(WolfPack.instance, uid, db);

        createFile(uid);

        files.push({ key: uid, value: `${item}` })
      })

      subwriteFile(fullDataConfiFile, files);
    }

    if (!WolfPack.instance) {
      initialice();
    }

    if (update) {
      initialice();
    }

    console.log(`Db created.`);
    return WolfPack.instance;
  }
}

class Db<T> {
  constructor() {

  }
  //
  getSync() {

  }
  getBySync(obj: T) {
    console.log(obj);
  }
  getByIdSync(id: string) {
    console.log(id);
  }
  postSync(obj: T) {
    console.log(obj);
  }
  putSync(obj: T) {
    console.log(obj);
  }
  removeSync(id: string | object) {
    console.log(id);
  }
  //
  async getAsync() {

  }
  async getByAsync(obj: T) {
    console.log(obj);
  }
  async getByIdAsync(id: string) {
    console.log(id);
  }
  async postAsync(obj: T) {
    console.log(obj);
  }
  async putAsync(obj: T) {
    console.log(obj);
  }
  async removeAsync(id: string | object) {
    console.log(id);
  }
}

type uid = `${string}-${string}-${string}-${string}-${string}`;
type Id = string | number | uid;

class alpha {
  id: Id;
  constructor(id?: Id) {
    if (!id)
      this.id = crypto.randomUUID();
    else
      this.id = id;
  }
}

export { alpha };
export default wolfPackCreate;

// userModel.get();
// userModel.getBy({ name: "deivi" })
// userModel.getByKey("gju-ey7iu-frt6h-grtj7")
// userModel.post({});
// userModel.put({});
// userModel.remove({});
// userModel.remove("gju-ey7iu-frt6h-grtj7")
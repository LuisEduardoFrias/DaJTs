//
'use strict';
import createFile from './create_file.js'
import overwriteFile from './overwrite_file.js'
import readConfigFile from './read_config_file.js';
import { environment } from './models/environment.js';
import { dbMode } from './models/db_mode.js';
import Db from './db.js';
import Alpha from './alpha.js';
//

export default function wolfPackCreate(pack: Alpha[], update: boolean = false, dbmode: dbMode = dbMode.dbr) {
  pack.forEach((classDefinition: Alpha) => {
    if (typeof classDefinition !== 'function') {
      throw new Error(`'${classDefinition}' isn't a class constructor.`);
    }
  })

  return WolfPack.getInstance(pack, update, dbmode);
}

class WolfPack {
  private static instance: WolfPack;
  [key: string]: any;

  private constructor() { }

  public static getInstance(wolves: Alpha[], update: boolean, dbmode: dbMode): WolfPack {

    function initialice() {
      WolfPack.instance = new WolfPack();

      const isCreate = createFile();

      const files: object = {};

      wolves.forEach((item: Alpha) => {
        const instance = new item();
        const className = instance.constructor.name;

        const db = new Db<typeof item>(className, dbmode);
        Reflect.set(WolfPack.instance, className, db);

        if (!isCreate || update) {
          const properties = [];

          for (const prop in instance) {
            if (prop === '_reference' || prop === '_referred') {
              properties.push({ prop, value: instance[prop] })
            } else {
              properties.push({ prop })
            }
          }

          Reflect.set(files, className, properties);
        }
      })

      if (!isCreate || update) {
        overwriteFile({ objectStructure: files, data: {} });

        console.log(`Db created.`);
      }
    }

    if (!WolfPack.instance) {
      initialice();
    }

    if (update && readConfigFile.ENVIRONMENT === environment.development) {
      initialice();
    }

    return WolfPack.instance;
  }
}
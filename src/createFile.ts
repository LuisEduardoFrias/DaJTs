"use strict";

import fs from "fs";
import Response from "./models/response";
import { errors } from "./errors";
import Callback from "./models/callback";
import Daj from "./gateway";

export const db_name: string = "./datafile.daj.db";
//
// createFile
//
export function createFile(callback: Callback, daj: Daj) : void {
  if (!fs.existsSync(db_name)) {
    fs.appendFile(db_name, "", (err:null) => {
      if (err) {
        console.error(err);
        callback(Errors.notDataAccess, null);
      } else {
        console.log(`The data file does create.`);
        callback(null, null);
      }
    });
  } else {
    daj.getAll(callback);
  }
}
//
//createFileAsync
//
export function createFileAsync(daj: Daj): Response {
  if (!fs.existsSync(db_name)) {
    try {
      fs.appendFileSync(db_name, "");
      console.log(`The data file does create.`);
      return { error: null, data: null };
    } catch (err:null) {
      console.error(err);
      throw new TypeError(errors.notDataAccess);
    }
  } else {
    return daj.getAllAsync();
  }
}

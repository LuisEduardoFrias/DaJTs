"use strict";

import fs from "fs";
import { errors } from "./errors";
import {Callback} from "./models/callback";
import Response from "./models/response";
import Daj from "./gateway";
import { DB_NAME, IS_DEVELOPMENT } from '../config';
//
// createFile
//
export function createFile(callback: Callback, daj: Daj) : void {
  if (!fs.existsSync(DB_NAME)) {
    fs.appendFile(DB_NAME, "", (err:any) => {
      if (err) {
        callback(errors.notDataAccess("createFile",17), null);
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
export function createFileSync(daj: Daj): Response {
  if (!fs.existsSync(DB_NAME)) {
    try {
      fs.appendFileSync(DB_NAME, "");
      console.log(`The data file does create.`);
      return { error: null, data: null };
    } catch (err:any) {
      throw new TypeError(errors.notDataAccess("createFileSync", 38));
    }
  } else {
    return daj.getAllSync();
  }
}

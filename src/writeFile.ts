import { encript } from "./locks";
import { DB_NAME } from '../config';
import { errors } from "./errors";
import fs from "fs";
import {Callback} from "./models/callback";

export default function writeFile(data: object, callback: Callback): void {
  fs.writeFile(DB_NAME, encript(JSON.stringify(data)), (err: any) => {
    if (err) {
      callback(errors.notDataAccess("writeFile", 11), null);
    } else {
      callback(null, "Success");
    }
  });
}
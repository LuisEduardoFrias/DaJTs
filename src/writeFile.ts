import { encript } from "./locks";
import { db_name } from "./createFile";
import { errors } from "./errors";
import fs from "fs";
import {Callback} from "./models/callback";

export default function writeFile(data: object, callback: Callback): void {
  fs.writeFile(db_name, encript(JSON.stringify(data)), (err: any) => {
    if (err) {
      console.log(err);
      callback(errors.notDataAccess, null);
    } else {
      callback(null, "Success");
    }
  });
}
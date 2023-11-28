import { encript, desencript } from "./locks";
import { db_name } from "./createFile";
import { errors } from "./errors";
import fs from "fs";
import {Callback} from "./models/callback";
//
export default function readFile (callback: Callback) : void
{
 fs.readFile(db_name, (err: any, data: any) => {
			if (err) {
				console.error(err);
				callback(errors.notDataAccess, null);
			} else {
				let newObj: object = {};
				let isError: boolean = false;
				try {
					newObj = JSON.parse(desencript(data.toString()));
				} catch (err) {
					isError = true;
					console.error(err);
					callback(errors.notData, null);
				}
				if (!isError) callback(null, newObj);
			}
		});
}
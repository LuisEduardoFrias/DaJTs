import { encript, desencript } from "./locks";
import { DB_NAME } from '../config';
import { errors } from "./errors";
import fs from "fs";
import {Callback} from "./models/callback";
//
export default function readFile (callback: Callback) : void
{
 fs.readFile(DB_NAME, (err: any, data: any) => {
			if (err) {
				callback(errors.notDataAccess("readFile", 12), null);
			} else {
				let newObj: object = {};
				let isError: boolean = false;
				try {
					newObj = JSON.parse(desencript(data.toString()));
				} catch (err) {
					isError = true;
					callback(errors.notData("readFile", 21), null);
				}
				if (!isError) callback(null, newObj);
			}
		});
}
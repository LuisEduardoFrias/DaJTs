import { encript } from "./locks";
import { DB_NAME } from '../config';
import { errors } from "./errors";
import fs from "fs";
import Response from "./models/response";
//
export default function writeFileSync(data:object): Response {
 try {
		fs.writeFileSync(DB_NAME, encript(JSON.stringify(data)));
		return { error:null, data: "Success" };
	} catch (err:any) {
		return { error: errors.notDataAccess("writeFileSync", 13), data: null };
	}
}
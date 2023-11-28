import { encript } from "./locks";
import { db_name } from "./createFile";
import { errors } from "./errors";
import fs from "fs";
import Response from "./models/response";
//
export default function writeFileSync(data:object): Response {
 try {
		fs.writeFileSync(db_name, encript(JSON.stringify(data)));
		return { error:null, data: "Success" };
	} catch (err:any) {
		console.log(err);
		return { error: errors.notDataAccess, data: null };
	}
}
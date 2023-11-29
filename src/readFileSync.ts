import { encript, desencript } from "./locks"; 
import { DB_NAME } from '../config';
import { errors } from "./errors"; 
import Response from "./models/response"; 
import fs from "fs";

export default function readFileSync(): Response { 
 try { 
  const data = fs.readFileSync(DB_NAME);
  try {
     return { error: null, data: JSON.parse(desencript(data.toString())) };
  } catch (err:any) {
   return { error: errors.notData("readFileSync", 14), data: null };
  }
 } catch (err:any) {
  return { error: errors.notDataAccess("readFileSync",18), data: null }; 
 } 
};
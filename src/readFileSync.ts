import { encript, desencript } from "./locks"; 
import { db_name } from "./createFile"; 
import { errors } from "./errors"; 
import Response from "./models/response"; 
import fs from "fs";

export default function readFileSync(): Response { 
 try { 
  const data = fs.readFileSync(db_name);
  try {
     return { error: null, data: JSON.parse(desencript(data.toString())) };
  } catch (err:any) {
   console.log(err);
   return { error: errors.notData, data: null };
  }
 } catch (err:any) {
  console.log(err); 
  return { error: errors.notDataAccess, data: null }; 
 } 
};
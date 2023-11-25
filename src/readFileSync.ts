import { encript, desencript } from "./locks"; 
import { db_name } from "./createFile"; 
import { errors } from "./errors"; 
import Response from "./models/response"; 
import fs from "fs";

export default function readFileAsync(): Response { 
 try { 
  const data = fs.readFileSync(db_name);
  try {
   return { response: null, data: JSON.parse(desencript(data)) };
  } catch (err:any) {
   console.log(err);
   return { response: errors.notData, data: null };
  }
 } catch (err:any) {
  console.log(err); 
  return { response: errors.notDataAccess, data: null }; 
 } 
};
import { /*encript,*/ desencript } from './locks.js'; 
import { DB_NAME } from '../config.js';
import { errors } from './errors.js'; 
import Response from './models/response.js'; 
import fs from "fs";

export default function readFileSync(): Response { 
 try { 
  const data = fs.readFileSync(DB_NAME);
  try {
     return { error: null, data: JSON.parse(desencript(data.toString())) };
  } catch (err:any) {
   return { error: errors.notData("readFileSync", 13), data: null };
  }
 } catch (err:any) {
  return { error: errors.notDataAccess("readFileSync",18), data: null }; 
 } 
};
'use strict';
import readConfigFile from './readConfigFile.js';
import { environment } from './models/environment.js';

class Errors extends Error {
  name:string;
  constructor(name: string){
    super();
    this.name = name;
  }
} 
 
export const errors = {
  notAdd(file?: string, row?: number) {
    return `DaJ; ${(readConfigFile()?.ENVIRONMENT == environment.development) && `${file}, row?: ${row}`
      } Error: Data not added`;
  },
  userExist(file?: string, row?: number) {
    return `DaJ; ${(readConfigFile()?.ENVIRONMENT == environment.development) && `${file}, row?: ${row}`
      } Error: User exist.`;
  },
  userNotExist(file?: string, row?: number) {
    return `DaJ; ${(readConfigFile()?.ENVIRONMENT == environment.development) && `${file}, row?: ${row}`
      } Error: User no exist.`;
  },
  notData(file?: string, row?: number) {
    return `DaJ; ${(readConfigFile()?.ENVIRONMENT == environment.development) && `${file}, row?: ${row}`
      } Error: No data found`;
  },
  keyNotFound(file?: string, row?: number) {
    return `DaJ; ${(readConfigFile()?.ENVIRONMENT == environment.development) && `${file}, row?: ${row}`
      } Error: 'key' is not found.`;
  },
  notDataAccess(file?: string, row?: number) {
    return `DaJ; ${(readConfigFile()?.ENVIRONMENT == environment.development) && `${file}, row?: ${row}`
      } Error: No access to data file.`;
  },
  arrayNot(file?: string, row?: number) {
    return `DaJ; ${(readConfigFile()?.ENVIRONMENT == environment.development) && `${file}, row?: ${row}`
      } Error: Arrays are not supported in a PUT operation.`;
  },
};

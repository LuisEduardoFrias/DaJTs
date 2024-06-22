'use strict';
import readConfigFile from './readConfigFile.js';

export const errors = {
  notAdd(file?: string, row?: number) {
    return `DaJ; ${
      (readConfigFile()?.IS_DEVELOPMENT ?? false) && `${file}, row?: ${row}`
    } Error: Data not added`;
  },
  userNotExist(file?: string, row?: number) {
    return `DaJ; ${
      (readConfigFile()?.IS_DEVELOPMENT ?? false) && `${file}, row?: ${row}`
    } Error: User no exist.`;
  },
  notData(file?: string, row?: number) {
    return `DaJ; ${
      (readConfigFile()?.IS_DEVELOPMENT ?? false) && `${file}, row?: ${row}`
    } Error: No data found`;
  },
  keyNotFound(file?: string, row?: number) {
    return `DaJ; ${
      (readConfigFile()?.IS_DEVELOPMENT ?? false) && `${file}, row?: ${row}`
    } Error: 'key' is not found.`;
  },
  notDataAccess(file?: string, row?: number) {
    return `DaJ; ${
      (readConfigFile()?.IS_DEVELOPMENT ?? false) && `${file}, row?: ${row}`
    } Error: No access to data file.`;
  },
  arrayNot(file?: string, row?: number) {
    return `DaJ; ${
      (readConfigFile()?.IS_DEVELOPMENT ?? false) && `${file}, row?: ${row}`
    } Error: Arrays are not supported in a PUT operation.`;
  },
};

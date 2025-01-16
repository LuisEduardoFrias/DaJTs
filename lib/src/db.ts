//
import readFile from './read_file.js'
import overwriteFile from './overwrite_file.js'
import { dbMode } from './models/db_mode.js';
import { DbType } from './models/db_type.js';
import { Indexar } from './models/indexar.js';
import { Where } from './models/where.js';
import Alpha from './alpha.js';

type props = { prop: string, value?: string[] };

export default class Db<T extends Alpha> {
  className: string;
  dbmode: dbMode;
  where: Array<{ [key: string | number | symbol]: any }>

  constructor(className: string, dbmode: dbMode) {
    this.className = className;
    this.dbmode = dbmode;
  }

  private _Indexar(objs: T[], index?: Indexar): T[] {
    if (!index) return objs;

    const [first, operator, second] = index.split(' ');
    const num1 = operator ? Math.abs(Number(first)) : Number(first);
    const num2 = Math.abs(Number(second));

    switch (operator) {
      case '+': {
        const newObjs = objs.reverse().toSpliced(num2);
        return objs.toSpliced(num1).concat(newObjs) as T[];
      }
      case '-': {
        const newObjs = objs.toSpliced(-(num2));
        return newObjs.toSpliced(0, num1) as T[];
      }
      default: {
        return num1 > 0 ? objs.toSpliced(num1) : objs.toSpliced(0, objs.length - num1) as T[];
      }
    }
  }

  private _Where(objs: T[], where: T): T[] {
    return objs.filter((obj: T) => {
      let isValid = true;
      for (const value in Object.entries(where)) {
        isValid = obj[value[0] as keyof T] === value[1];
      }

      return isValid;
    }) as T[];
  }

  private getData(): DbType {
    const dataFile = readFile();

    if (!dataFile) throw new Error('Cannot read to data.');

    return dataFile;
  }

  private validateAndClean(requiredProps, obj): { [key: string]: object } {
    const cleanObj = {};
    const allObj = {};

    requiredProps.forEach(prop => {
      if (prop.prop === '_reference' && prop?.value) {
        prop?.value.forEach((key: string) => {

          if (!Reflect.ownKeys(obj).includes(firstLowerCase(key))) {
            const error = new Error(`The '${firstLowerCase(key)}' reference not exists in the object type ${this.className}.`);
            throw error;
          } else {
            if (obj[firstLowerCase(key)] === null || obj[firstLowerCase(key)] === undefined) {
              const error = new Error(`The '${firstLowerCase(key)}' prop is required in the type '${obj.constructor.name}'.`);
              throw error;
            } else {
              const ref = obj[firstLowerCase(key)];
              const referred = {};
              Reflect.set(referred, ref._referred, [obj.id]);
              Reflect.set(ref, "_referred", referred);
              Reflect.set(allObj, key.toString(), obj[firstLowerCase(key)]);
              obj[firstLowerCase(key)] = obj[firstLowerCase(key)].id;
            }
          }
        })
      }

      if (!obj.hasOwnProperty(prop.prop)) {
        const error = new Error(`Missing required property: ${prop.prop}`);
        throw error;
      }

      cleanObj[prop.prop] = obj[prop.prop];

    });

    if (cleanObj?._reference) {
      delete cleanObj._reference
    }

    if (cleanObj?._referred) {
      delete cleanObj._referred
    }

    Reflect.set(allObj, this.className, cleanObj);

    return allObj;
  }

  //////////////////////////////
  public Where(where: T & Where) {
    this.where.push(where);
    return this;
  }

  public getSync(where?: T & Where): T[] {
    const specificObj = this.getData().data[this.className];

    if (!where) return specificObj as T[];

    if (where?.index && where.indexFirst) {
      return this._Where(this._Indexar(specificObj as T[], where?.index), where);
    }

    return this._Indexar(this._Where(specificObj as T[], where), where?.index);
  }

  public getByIdSync(id: string) {
    return (this.getData().data[this.className] as T[])
      .find((obj: T) => obj.id === id)
  }

  //TODO evaliar error
  private ggg(dataFile, allObj) {
    for (const className in allObj) {
      if (dataFile.data[className]) {

        if (this.className !== className) {

          const index = dataFile.data[className]
            .findIndex((obj: Alpha) => obj.id === allObj[className].id);

          if (index >= 0) {
            const referred = dataFile.data[className][index]._referred;
            console.log('----------: \n', className);
            console.log('----------: \n', JSON.stringify(allObj), '\n----------:\n');
            console.log('----------: \n',allObj[className]._referred[this.className], '\n----------:\n');
            referred[this.className].push(allObj[className]._referred[this.className].first());
            dataFile.data[className][index]._referred = referred;
            Reflect.deleteProperty(allObj, className);
          }
        }

        if (allObj[className]) {
          dataFile.data[className].push(allObj[className]);
        }
      } else {
        Reflect.set(dataFile.data, className, [allObj[className]])
      }
    }
  }

  public postSync(obj: T) {
    const dataFile = this.getData();

    if (this.className !== obj.constructor.name) {
      const error = new Error(`The '${obj.constructor.name}' type isn't missing following to '${this.className}' type.`);
      throw error;
    }

    const props = dataFile.objectStructure[this.className];

    if (!props) {
      const error = new Error(`The type '${this.className}' don't exists.`);
      throw error;
    }

    const allObj = this.validateAndClean(props, obj);

    this.ggg(dataFile, allObj);

    overwriteFile(dataFile)
  }

  public putSync(obj: T) {
    const dataFile = this.getData();

    if (!dataFile.data[this.className]) {
      Reflect.set(dataFile.data, this.className, [obj])
    } else {
      const index = (dataFile.data[this.className] as T[]).findIndex((ob: T) => ob.id === obj.id);

      dataFile.data[this.className][index] = obj;
    }

    overwriteFile(dataFile)
  }

  public removeSync(id: string | object) {
    const dataFile = this.getData();

    if (dataFile.data[this.className]) {

      const index = (dataFile.data[this.className] as T[]).findIndex((ob: T) => ob.id === id);

      dataFile.data[this.className].splice(index);

      overwriteFile(dataFile)
    }
  }

  //
  public async getAsync() {

  }

  public async getByAsync(obj: T) {
    console.log(obj);
  }

  public async getByIdAsync(id: string) {
    console.log(id);
  }

  public async postAsync(obj: T) {
    console.log(obj);
  }

  public async putAsync(obj: T) {
    console.log(obj);
  }

  public async removeAsync(id: string | object) {
    console.log(id);
  }
}

export function firstLowerCase(value: string): string {
  const first = value.substring(0, 1);
  return first.toLowerCase() + value.substring(1);
}
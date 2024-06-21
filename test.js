import daj, { DajB } from './dist/index.js';

class Persona extends DajB {
  constructor(name, age) {
    super();
    this.name = name;
    this.age = age;
  }
}

const profesor = new Persona('Jose', 31);
console.log('hshs');

daj.verify();
/*
const response1 = daj.postSync(profesor);
console.log('post sync:', JSON.stringify(response1));

const response2 = daj.getSync(profesor);
console.log('get sync:', JSON.stringify(response2));
*/

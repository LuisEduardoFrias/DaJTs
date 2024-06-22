import daj, { DajB } from './dist/index.js';

const log = (text, value) =>
  text
    ? console.log(text, JSON.stringify(value, null, 2))
    : console.log(JSON.stringify(value, null, 2));

class Persona extends DajB {
  constructor(name, age) {
    super();
    this.name = name;
    this.age = age;
  }
}

const profesor = new Persona('jose', 24);

log('post: ', daj.postSync(profesor));

log('get: ', daj.getSync(Persona.getInstance()));
//log('get: ', daj.getByKeySync(Persona.getInstance(), 'jdjdhdh'));

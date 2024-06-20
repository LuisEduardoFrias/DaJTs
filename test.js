const daj = require("./dist/index.js");
const { DajB } = require("./dist/index.js");

class Persona extends DajB {
    constructor(name, age) {
        super();
        this.name = name;
        this.age = age;
    }
}

const profesor = new Persona("Jose", 31);

const d = new daj();

const response1 = d.postSync(profesor);
console.log("post sync:", JSON.stringify(response1));

const response2 = d.getSync(profesor);
console.log("get sync:", JSON.stringify(response2));

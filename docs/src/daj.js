"use strict";
const { Guid } = require("js-guid");
//Data Archive Json
class dajb {
    constructor(identity = true) {
        if (identity)
            this.key = Guid.newGuid().StringGuid;
    }
    json() {
        Reflect.set(this, "constructor", {
            name: this.constructor.name,
        });
        return JSON.stringify(this);
    }
    parse(json) {
        const obj = JSON.parse(json);
        this.mapper(obj);
    }
    // Todo validar las propiedades
    mapper(obj) {
        const keys = Reflect.ownKeys(obj);
        keys.forEach(key => {
            Reflect.set(this, key, obj[key]);
        });
    }
    static getInstance(...args) {
        if (args.length === 0) {
            return new this();
        }
        else {
            return new this(...args);
        }
    }
}
module.exports = dajb;

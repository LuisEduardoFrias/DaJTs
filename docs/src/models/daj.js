"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const guid_typescript_1 = require("guid-typescript");
//Data Archive Json
class DajB {
    constructor(identity = true) {
        if (identity)
            this.key = guid_typescript_1.Guid.create().toString();
        else
            this.key = "";
    }
    json() {
        Reflect.set(this, "constructor", {
            name: this.constructor.name,
        });
        const _json = JSON.stringify(this);
        // delete this.constructor;
        return _json;
    }
    parse(json) {
        this.mapper(JSON.parse(json));
    }
    // Todo validar las propiedades
    mapper(obj) {
        const keys = Reflect.ownKeys(obj);
        keys.forEach(key => {
            Reflect.set(this, key, Reflect.get(obj, key));
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
exports.default = DajB;

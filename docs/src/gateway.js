/** @format */
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//
const user_1 = __importDefault(require("./model/user"));
const token_1 = __importDefault(require("./model/token"));
//
const errors_1 = __importDefault(require("./errors"));
const readFile_1 = __importDefault(require("./readFile"));
const readFileAsync_1 = __importDefault(require("./readFileAsync"));
const writeFile_1 = __importDefault(require("./writeFile"));
const writeFileAsync_1 = __importDefault(require("./writeFileAsync"));
const locks_1 = require("./locks");
const createFile_1 = require("./createFile");
//
class Daj {
    //
    //method getAll
    //
    getAll(callback) {
        (0, readFile_1.default)(callback);
    }
    //
    //method getall async
    //
    getAllAsync() {
        return (0, readFileAsync_1.default)();
    }
    //
    //method checkIsArray
    //
    checkIsArray(obj) {
        let constructor_name = obj.constructor.name;
        let objIsArray = false;
        Reflect.deleteProperty(obj, "constructor");
        if (constructor_name === "Array") {
            for (const key in obj) {
                if (Reflect.ownKeys(obj[key])[0] === "constructor") {
                    constructor_name = obj[key]["constructor"].name;
                    obj.pop(key);
                    objIsArray = true;
                    break;
                }
            }
        }
        return [objIsArray, constructor_name];
    }
    //
    //method register
    //
    registerAsync(obj) {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield get(user_1.default.getInstance());
            const exist = users.filter((u) => u.user === obj.user);
            if (exist.length === 1)
                return -1;
            const resp = this.postAsync(obj);
            return 1;
        });
    }
    //
    //method login
    //
    loginAsync(credential) {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield this.getAsync(user_1.default.getInstance());
            const exist = users.filter((u) => u.user === credential.user);
            if (exist.length >= 1) {
                const user = user_1.default.getInstance();
                exist[0].token = new token_1.default();
                user.mapper(exist[0]);
                const response = yield putAsync(user);
                return user.token;
            }
        });
    }
    //
    //method checkToken
    //
    checkTokenAsync(token) {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield this.getAsync(user_1.default.getInstance());
            const exist = users.filter((u) => { var _a; return ((_a = u === null || u === void 0 ? void 0 : u.token) === null || _a === void 0 ? void 0 : _a.token) === token.token; });
            if (exist.length > 0)
                return true;
        });
    }
    //
    //method logout
    //
    logoutAsync() {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield this.getAsync(user_1.default.getInstance());
            const exist = users.filter((u) => u.user === credential.user);
            if (exist.length >= 1) {
                const user = user_1.default.getInstance();
                exist[0].token = null;
                user.mapper(exist[0]);
                const response = yield putAsync(user);
                return user.token;
            }
        });
    }
    //
    //method get
    //
    get(callback, obj) {
        (0, readFile_1.default)((err, data) => {
            if (err) {
                callback(null, Reflect.get(data, obj.constructor.name));
            }
            else {
                callback(err, null);
            }
        });
    }
    //
    //method get async
    //
    getAsync(obj) {
        const { err, data } = (0, readFileAsync_1.default)();
        if (!err)
            return { error: null, data: Reflect.get(data, obj.constructor.name) };
    }
    //
    //method getKey
    //
    getKey(callback, obj, key) {
        (0, readFile_1.default)((err, data) => {
            if (!err) {
                const value = Reflect.get(data, obj.constructor.name);
                for (var arr in value) {
                    if (value[arr].key === key) {
                        callback(null, value[arr]);
                    }
                }
            }
            else {
                console.error(errors_1.default.notdata);
                callback(errors_1.default.notdata, null);
            }
        });
    }
    //
    //method getkey async
    //
    getKeyAsync(obj, key) {
        const { err, data } = (0, readFileAsync_1.default)();
        if (!err) {
            const value = Reflect.get(data, obj.constructor.name);
            for (var arr in value) {
                if (value[arr].key === key) {
                    return { error: null, data: value[arr] };
                }
            }
            return { error: errors_1.default.notData, data: null };
        }
        else {
            return { error: errors_1.default.notData, data: null };
        }
    }
    //
    //method post
    //
    post(callback, obj) {
        const [objIsArray, constructor_name] = this.checkIsArray(obj);
        (0, createFile_1.createFile)((err, allData) => {
            function setAllData(objData, isNewProtype) {
                if (isNewProtype) {
                    allData = {};
                }
                if (!Reflect.set(allData, constructor_name, objData)) {
                    callback(errors_1.default.notAdd, null);
                    return true;
                }
            }
            let isError = false;
            if (allData !== null) {
                let specificObj = Reflect.get(allData, constructor_name);
                if (specificObj !== undefined) {
                    if (Array.isArray(specificObj)) {
                        if (objIsArray) {
                            specificObj = [...specificObj, ...obj];
                        }
                        else {
                            specificObj.push(obj);
                        }
                    }
                    else {
                        const aux = specificObj;
                        specificObj = [];
                        specificObj.push(aux);
                        if (objIsArray) {
                            specificObj = [...specificObj, ...obj];
                        }
                        else {
                            specificObj.push(obj);
                        }
                    }
                    isError = setAllData(specificObj);
                }
                else {
                    isError = setAllData(obj);
                }
            }
            else {
                isError = setAllData(obj, true);
            }
            if (!isError) {
                if (allData === undefined) {
                    callback(errors_1.default.notData, null);
                    const isArray = true;
                }
                if (!isError) {
                    (0, writeFile_1.default)((0, locks_1.encript)(JSON.stringify(allData)), (err, data) => {
                        if (err) {
                            console.log(err);
                            callback(errors_1.default.notDataAccess, null);
                            isError = true;
                        }
                        if (!isError)
                            callback(null, data);
                    });
                }
            }
        }, this);
    }
    //
    //method post async
    //
    postAsync(obj) {
        const [objIsArray, constructor_name] = this.checkIsArray(obj);
        let objIsArray = checkResp.objIsArray;
        let constructor_name = checkResp.constructor_name;
        //
        const { error: _error, data: _data } = createFileDbAsync(this);
        if (_error !== null)
            return { error: _error, data: null };
        let allData = _data;
        function setAllData(objData, newProtype) {
            if (newProtype) {
                allData = {};
            }
            if (!Reflect.set(allData, constructor_name, objData)) {
                error(errors_1.default.notAdd);
                //Todo este valor de retorno, se esta tomado en cuenta
                return { error: errors_1.default.notAdd, data: null };
            }
        }
        if (allData !== null) {
            let specificObj = Reflect.get(allData, constructor_name);
            if (specificObj !== undefined) {
                if (Array.isArray(specificObj)) {
                    if (objIsArray) {
                        specificObj = [...specificObj, ...obj];
                    }
                    else {
                        specificObj.push(obj);
                    }
                }
                else {
                    const aux = specificObj;
                    specificObj = [];
                    specificObj.push(aux);
                    if (objIsArray) {
                        //Todo Aqui remplasa un valor si es igual a otro. posible arreglo
                        //specificObj = [...specificObj, ...obj];
                        specificObj.push(...obj);
                    }
                    else {
                        specificObj.push(obj);
                    }
                }
                setAllData(specificObj);
            }
            else {
                setAllData(obj);
            }
        }
        else {
            setAllData(obj, true);
        }
        //Todo muy poco probable que sede esta condicion
        if (allData === undefined) {
            return { error: errors_1.default.notData, data: null };
        }
        return ({ err, data } = writeFileSync((0, locks_1.encript)(JSON.stringify(allData))));
        if (!err)
            return {
                error: null,
                data
            };
        else {
            error(err);
            return { error: errors_1.default.notData, data: null };
        }
    }
    //
    //method put
    //
    put(callback, obj) {
        let constructor_name = obj.constructor.name;
        if (constructor_name === "Array") {
            callback(errors_1.default.arrayNot);
        }
        else {
            Reflect.deleteProperty(obj, "constructor");
            const replaceEleOfArray = (objToReplace) => {
                for (const e in objToReplace) {
                    if (objToReplace[e].key == obj.key) {
                        objToReplace[e] = obj;
                        break;
                    }
                }
            };
            this.getAll((e, allData) => {
                function setAllData(objData) {
                    if (!Reflect.set(allData, constructor_name, objData)) {
                        callback(errors_1.default.notAdd);
                        return true;
                    }
                }
                let isError = false;
                if (allData !== null && allData !== errors_1.default.notData) {
                    let specificObj = Reflect.get(allData, constructor_name);
                    if (specificObj !== undefined) {
                        if (Array.isArray(specificObj)) {
                            replaceEleOfArray(specificObj);
                        }
                        else {
                            const aux = specificObj;
                            specificObj = [];
                            specificObj.push(aux);
                            replaceEleOfArray(specificObj);
                        }
                        isError = setAllData(specificObj);
                    }
                    else {
                        callback(errors_1.default.notData);
                    }
                }
                else {
                    callback(errors_1.default.notData);
                }
                if (!isError) {
                    if (allData === undefined) {
                        callback(errors_1.default.notData);
                        isError = true;
                    }
                    if (!isError) {
                        fs.writeFile(db_name, (0, locks_1.encript)(JSON.stringify(allData)), (err) => {
                            if (err) {
                                error(err);
                                isError = true;
                                callback(errors_1.default.notDataAccess);
                            }
                            if (!isError)
                                callback("Success");
                        });
                    }
                }
            });
        }
    }
    //
    //method put async
    //
    putAsync(obj) {
        let constructor_name = obj.constructor.name;
        if (constructor_name === "Array") {
            return { error: errors_1.default.arrayNot, data: null };
        }
        delete obj.constructor;
        function replaceEleOfArray(objToReplace) {
            for (const key in objToReplace) {
                if (objToReplace[key].key == obj.key) {
                    objToReplace[key] = obj;
                    break;
                }
            }
        }
        const { error, data: allData } = this.getAllAsync();
        if (error !== null)
            return { error, data: null };
        function setAllData(objData) {
            if (!Reflect.set(allData, constructor_name, objData)) {
                return { error: errors_1.default.notAdd, data: null };
            }
        }
        if (allData !== null) {
            let specificObj = Reflect.get(allData, constructor_name);
            if (specificObj !== undefined) {
                if (Array.isArray(specificObj)) {
                    replaceEleOfArray(specificObj);
                }
                else {
                    const aux = specificObj;
                    specificObj = [];
                    specificObj.push(aux);
                    replaceEleOfArray(specificObj);
                }
                setAllData(specificObj);
            }
            else {
                return { error: errors_1.default.notData, data: null };
            }
        }
        else {
            return { error: errors_1.default.notData, data: null };
        }
        if (allData === undefined) {
            return { error: errors_1.default.notData, data: null };
        }
        const { error, data } = (0, writeFileAsync_1.default)((0, locks_1.encript)(JSON.stringify(allData)));
        if (!error)
            return { error: null, data: "Success" };
        return { error: errors_1.default.notDataAccess, data: null };
    }
    //
    //method delete
    //
    delete(callback, obj) {
        let constructor_name = obj.constructor.name;
        Reflect.deleteProperty(obj, "constructor");
        this.getAll((err, allData) => {
            function setAllData(objData) {
                if (!Reflect.set(allData, constructor_name, objData)) {
                    callback(errors_1.default.notAdd);
                    return true;
                }
            }
            let isError = false;
            if (allData !== null) {
                let specificObj = Reflect.get(allData, constructor_name);
                if (specificObj !== undefined) {
                    if (Array.isArray(specificObj)) {
                        const index = specificObj.findIndex((e) => e.key === obj.key);
                        if (index > -1) {
                            specificObj.splice(index, 1);
                        }
                        isError = setAllData(specificObj);
                    }
                    else {
                        Reflect.deleteProperty(allData, constructor_name);
                    }
                }
                else {
                    callback(errors_1.default.notData, null);
                    isError = true;
                }
                if (!isError) {
                    (0, writeFile_1.default)((0, locks_1.encript)(JSON.stringify(allData)), (err) => {
                        if (err) {
                            console.log(err);
                            callback(errors_1.default.notDataAccess, null);
                            isError = true;
                        }
                        if (!isError)
                            callback(null, "Success");
                    });
                }
            }
            else {
                callback(errors_1.default.notData, null);
            }
        });
    }
    //
    //method  delete async
    //
    deleteAsync(obj) {
        let constructor_name = obj.constructor.name;
        Reflect.deleteProperty(obj, "constructor");
        const { error, data: allData } = this.getAllAsync();
        if (error !== null)
            return { error, data: null };
        function setAllData(objData) {
            if (!Reflect.set(allData, constructor_name, objData)) {
                return { error: errors_1.default.notAdd, data: null };
            }
        }
        if (allData !== null) {
            let specificObj = Reflect.get(allData, constructor_name);
            if (specificObj !== undefined) {
                if (Array.isArray(specificObj)) {
                    const index = specificObj.findIndex((e) => e.key === obj.key);
                    if (index > -1) {
                        specificObj.splice(index, 1);
                    }
                    setAllData(specificObj);
                }
                else {
                    Reflect.deleteProperty(allData, constructor_name);
                }
            }
            else {
                return { error: errors_1.default.notData, data: null };
            }
            const { error, data } = (0, writeFileAsync_1.default)((0, locks_1.encript)(JSON.stringify(allData)));
            if (error)
                return { error, data: null };
            return { error, data: "Success" };
        }
    }
}
exports.default = Daj;

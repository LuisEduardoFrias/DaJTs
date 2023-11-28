/** @format */
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//
const user_1 = __importDefault(require("./models/user"));
const token_1 = __importDefault(require("./models/token"));
//
const errors_1 = __importDefault(require("./errors"));
const readFile_1 = __importDefault(require("./readFile"));
const readFileSync_1 = __importDefault(require("./readFileSync"));
const writeFile_1 = __importDefault(require("./writeFile"));
const writeFileAsync_1 = __importDefault(require("./writeFileAsync"));
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
    getAllSync() {
        return (0, readFileSync_1.default)();
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
                    objIsArray = true;
                    break;
                }
            }
        }
        return { objIsArray, constructor_name };
    }
    //
    //method register
    //
    registerSync(obj) {
        const { error, data: users } = this.getSync(user_1.default.getInstance());
        if (error)
            return { error, data: null };
        const usersExist = users.filter((u) => u.user === obj.user);
        if (usersExist.length === 1)
            return { error: error.userExist, data: false };
        return this.postSync(obj);
    }
    //
    //method login
    //
    loginSync(credential) {
        const user = user_1.default.getInstance();
        const { error, data: users } = this.getSync(user);
        const userExist = users.filter((u) => u.user === credential.user && u.passwd === credential.passwd);
        if (userExist.length === 1) {
            userExist[0].token = new token_1.default();
            user.mapper(userExist[0]);
            const { error, data } = putSync(user);
            if (error)
                return null;
            return user.token;
        }
        return null;
    }
    //
    //method checkToken
    //
    checkTokenSync(token) {
        const { error, data: users } = this.getSync(user_1.default.getInstance());
        if (error)
            return false;
        const useExist = users.filter((u) => { var _a; return ((_a = u.token) === null || _a === void 0 ? void 0 : _a.token) === token.token; });
        if (useExist.length === 1)
            return true;
        return false;
    }
    //
    //method logout
    //
    logoutAsync(credential) {
        const user = user_1.default.getInstance();
        const { error, data: users } = this.getSync(user);
        const useExist = users.filter((u) => u.user === credential.user);
        if (useExist.length === 1) {
            useExist[0].token = null;
            user.mapper(useExist[0]);
            const { error, data } = this.putSync(user);
            if (error)
                return false;
            return true;
        }
        return false;
    }
    //
    //method get
    //
    get(callback, obj) {
        (0, readFile_1.default)((error, data) => {
            if (!error) {
                callback(null, Reflect.get(data, obj.constructor.name));
            }
            else {
                callback(error, null);
            }
        });
    }
    //
    //method get async
    //
    getSync(obj) {
        const { error, data } = (0, readFileSync_1.default)();
        if (!error)
            return {
                error: null,
                data: Reflect.get(data, obj.constructor.name)
            };
        return { error, data: null };
    }
    //
    //method get by key
    //
    getByKey(callback, obj, key) {
        (0, readFile_1.default)((error, data) => {
            if (!error) {
                const objects = Reflect.get(data, obj.constructor.name);
                for (let props in objects) {
                    if (objects[props].key === key) {
                        callback(null, objects[props]);
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
    getByKeySync(obj, key) {
        const { error, data } = (0, readFileSync_1.default)();
        if (!error) {
            const value = Reflect.get(data, obj.constructor.name);
            for (var arr in value) {
                if (value[arr].key === key) {
                    return { error: null, data: value[arr] };
                }
            }
            return { error: errors_1.default.notData, data: null };
        }
        else {
            return { error, data: null };
        }
    }
    //
    //method post
    //
    post(callback, obj) {
        const { objIsArray, constructor_name } = this.checkIsArray(obj);
        (0, createFile_1.createFile)((error, data) => {
            const allData = data;
            function setAllData(objData, isNewProtype = false) {
                if (isNewProtype) {
                    objData = [objData];
                }
                if (!Reflect.set(isNewProtype ? {} : allData, constructor_name, objData)) {
                    callback(errors_1.default.notAdd, null);
                    return false;
                }
                return true;
            }
            let isError = false;
            if (error !== null) {
                if (allData !== null) {
                    const specificObj = Reflect.get(allData, constructor_name);
                    if (specificObj !== undefined) {
                        if (objIsArray && Array.isArray(obj)) {
                            specificObj.push(...obj);
                        }
                        else {
                            specificObj.push(obj);
                        }
                        isError = !setAllData(specificObj);
                    }
                    else {
                        isError = !setAllData(obj);
                    }
                }
                else {
                    isError = !setAllData(obj, true);
                }
            }
            else {
                callback(error, null);
                isError = true;
            }
            if (!isError) {
                if (allData === undefined) {
                    callback(errors_1.default.notData, null);
                    isError = true;
                }
                if (!isError) {
                    (0, writeFile_1.default)(allData, (error, data) => {
                        if (error) {
                            console.log(error);
                            callback(errors_1.default.notDataAccess, null);
                            isError = true;
                        }
                        if (!isError)
                            callback(null, "Success");
                    });
                }
            }
        }, this);
    }
    //
    //method post async
    //
    postSync(obj) {
        const { objIsArray, constructor_name } = this.checkIsArray(obj);
        const { error, data: allData } = (0, createFile_1.createFileSync)(this);
        if (error !== null)
            return { error: error, data: null };
        function setAllData(objData, isNewProtype = false) {
            if (isNewProtype) {
                objData = [objData];
            }
            if (!Reflect.set(isNewProtype ? {} : allData, constructor_name, objData)) {
                console.log(errors_1.default.notAdd);
                //Todo este valor de retorno, se esta tomado en cuenta
                return { error: errors_1.default.notAdd, data: null };
            }
            return { error: null, data: null };
        }
        if (allData !== null) {
            let specificObj = Reflect.get(allData, constructor_name);
            if (specificObj !== undefined) {
                if (objIsArray && Array.isArray(obj)) {
                    specificObj.push(...obj);
                }
                else {
                    specificObj.push(obj);
                }
                const { error } = setAllData(specificObj);
                if (error)
                    return { error, data: null };
            }
            else {
                const { error } = setAllData(obj);
                if (error)
                    return { error, data: null };
            }
        }
        else {
            const { error } = setAllData(obj, true);
            if (error)
                return { error, data: null };
        }
        //Todo muy poco probable que sedé esta condición
        if (allData === null) {
            return { error: errors_1.default.notData, data: null };
        }
        const { error: wfsError, data: wfsData } = (0, writeFileAsync_1.default)(allData);
        if (!wfsError) {
            return {
                error: null,
                data: wfsData
            };
        }
        else {
            console.log(error);
            return { error: errors_1.default.notData, data: null };
        }
    }
    //
    //method put
    //
    put(callback, obj) {
        const { objIsArray, constructor_name } = this.checkIsArray(obj);
        if (objIsArray) {
            callback(errors_1.default.arrayNot);
        }
        else {
            Reflect.deleteProperty(obj, "constructor");
            const replaceEleOfArray = (objToReplace) => {
                for (const e in objToReplace) {
                    if (Reflect.get(objToReplace, e).key == Reflect.get(obj, "key")) {
                        Reflect.set(objToReplace, e, obj);
                        break;
                    }
                }
            };
            this.getAll((e, allData) => {
                function setAllData(objData) {
                    if (!Reflect.set(allData, constructor_name, objData)) {
                        callback(errors_1.default.notAdd, null);
                        return true;
                    }
                    return false;
                }
                let isError = false;
                if (allData !== null) {
                    let specificObj = Reflect.get(allData, constructor_name);
                    if (specificObj !== undefined) {
                        replaceEleOfArray(specificObj);
                        isError = setAllData(specificObj);
                    }
                    else {
                        callback(errors_1.default.notData, null);
                        isError = true;
                    }
                }
                else {
                    callback(errors_1.default.notData, null);
                    isError = true;
                }
                if (!isError) {
                    if (allData === undefined) {
                        callback(errors_1.default.notData, null);
                        isError = true;
                    }
                    if (!isError) {
                        (0, writeFile_1.default)(allData, callback);
                    }
                }
            });
        }
    }
    //
    //method put async
    //
    putSync(obj) {
        const { objIsArray, constructor_name } = this.checkIsArray(obj);
        if (objIsArray) {
            return { error: errors_1.default.arrayNot, data: null };
        }
        Reflect.deleteProperty(obj, "constructor");
        function replaceEleOfArray(objToReplace) {
            for (const key in objToReplace) {
                if (Reflect.get(objToReplace, key).key == Reflect.get(obj, "key")) {
                    Reflect.set(objToReplace, key, obj);
                    break;
                }
            }
        }
        const { error, data: allData } = this.getAllSync();
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
                replaceEleOfArray(specificObj);
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
        const { error: _error, data } = writeFileAsync(allData);
        if (!_error)
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
                    callback(errors_1.default.notAdd, null);
                    return true;
                }
                return false;
            }
            let isError = false;
            if (allData !== null) {
                let specificObj = Reflect.get(allData, constructor_name);
                if (specificObj !== undefined) {
                    const index = specificObj.findIndex((e) => Reflect.get(e, "key") === Reflect.get(obj, "key"));
                    if (index > -1) {
                        specificObj.splice(index, 1);
                    }
                    isError = setAllData(specificObj);
                }
                else {
                    callback(errors_1.default.notData, null);
                    isError = true;
                }
                if (!isError) {
                    (0, writeFile_1.default)(allData, (error, _) => {
                        if (error) {
                            console.log(error);
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
        const { error, data: allData } = this.getAllSync();
        if (error !== null)
            return { error, data: null };
        function setAllData(objData) {
            if (!Reflect.set(allData, constructor_name, objData)) {
                return { error: errors_1.default.notAdd, data: null };
            }
            return { error: null, data: null };
        }
        if (allData !== null) {
            let specificObj = Reflect.get(allData, constructor_name);
            if (specificObj !== undefined) {
                const index = specificObj.findIndex((e) => Reflect.get(e, "key") === Reflect.get(obj, "key"));
                if (index > -1) {
                    specificObj.splice(index, 1);
                }
                setAllData(specificObj);
            }
            else {
                return { error: errors_1.default.notData, data: null };
            }
            const { error } = writeFileAsync(allData);
            if (error)
                return { error, data: null };
            return { error, data: "Success" };
        }
        else {
            return { error: errors_1.default.notData, data: null };
        }
    }
}
exports.default = Daj;

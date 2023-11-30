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
const errors_1 = require("./errors");
const readFile_1 = __importDefault(require("./readFile"));
const readFileSync_1 = __importDefault(require("./readFileSync"));
const writeFile_1 = __importDefault(require("./writeFile"));
const writeFileSync_1 = __importDefault(require("./writeFileSync"));
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
        let constructor_name = Reflect.get(obj, "constructor").name;
        let objIsArray = false;
        Reflect.deleteProperty(obj, "constructor");
        if (constructor_name === "Array") {
            for (const key in obj) {
                if (Reflect.ownKeys(Reflect.get(obj, key))[0] === "constructor") {
                    constructor_name =
                        Reflect.get(Reflect.get(Reflect.get(obj, key), "constructor"), "name");
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
        if (!error && users) {
            const usersExist = users.filter((u) => u.user === obj.user);
            if (usersExist.length === 1)
                return { error: errors_1.errors.userNotExist("gateway", 77), data: null };
            return this.postSync(obj);
        }
        return { error, data: null };
    }
    //
    //method login
    //
    loginSync(credential) {
        const user = user_1.default.getInstance();
        const { error, data: users } = this.getSync(user);
        if (!error && users) {
            const userExist = users.filter((u) => u.user === credential.user && u.password === credential.password);
            if (userExist.length === 1) {
                Reflect.set(userExist[0], "token", new token_1.default());
                user.mapper(userExist[0]);
                const { error, data } = this.putSync(user);
                if (error)
                    return null;
                return user.token;
            }
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
        if (!error && users) {
            const useExist = users.filter((u) => u.user === credential.user);
            if (useExist.length === 1) {
                Reflect.set(useExist[0], "token", null);
                user.mapper(useExist[0]);
                const { error, data } = this.putSync(user);
                if (error)
                    return false;
                return true;
            }
        }
        return false;
    }
    //
    //method get
    //
    get(callback, obj) {
        (0, readFile_1.default)((error, data) => {
            if (!error) {
                callback(null, Reflect.get(data, Reflect.get(obj, "constructor").name));
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
                data: Reflect.get(data, Reflect.get(obj, "constructor").name)
            };
        return { error, data: null };
    }
    //
    //method get by key
    //
    getByKey(callback, obj, key) {
        (0, readFile_1.default)((error, data) => {
            if (!error) {
                const objects = Reflect.get(data, Reflect.get(obj, "constructor").name);
                let isnotfound = true;
                for (let props in objects) {
                    const _obj_ = Reflect.get(objects, props);
                    if (Reflect.get(_obj_, "key") === key) {
                        callback(null, Reflect.get(objects, props));
                        isnotfound = false;
                        break;
                    }
                }
                if (isnotfound)
                    callback(errors_1.errors.keyNotFound("gateway", 196), null);
            }
            else {
                //console.error(errors.notData("gateway",197));
                callback(errors_1.errors.notData("gateway", 199), null);
            }
        });
    }
    //
    //method getkey async
    //
    getByKeySync(obj, key) {
        const { error, data } = (0, readFileSync_1.default)();
        if (!error) {
            const value = Reflect.get(data, Reflect.get(obj, "constructor").name);
            for (let props in value) {
                const _obj_ = Reflect.get(value, props);
                if (Reflect.get(_obj_, "key") === key) {
                    return { error: null, data: _obj_ };
                    break;
                }
            }
            return { error: errors_1.errors.notData("gateway", 219), data: null };
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
            let allData = data === null || typeof data === "object" ? data : {};
            function setAllData(objData, isNewProtype = false) {
                const aux = [];
                const auxAllData = {};
                if (isNewProtype)
                    aux.push(objData);
                try {
                    !Reflect.set(isNewProtype ? auxAllData : allData, constructor_name, isNewProtype ? aux : objData);
                    if (isNewProtype)
                        allData = auxAllData;
                }
                catch (err) {
                    callback(errors_1.errors.notAdd("gateway", 244), null);
                    return false;
                }
                return true;
            }
            let isError = false;
            if (error === null) {
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
                    callback(errors_1.errors.notData("gateway", 279), null);
                    isError = true;
                }
                if (!isError) {
                    (0, writeFile_1.default)(allData, (error, _) => {
                        if (error) {
                            //console.log(error);
                            callback(errors_1.errors.notDataAccess("gateway", 287), null);
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
        const { error, data } = (0, createFile_1.createFileSync)(this);
        let allData = data === null || typeof data === "object" ? data : {};
        if (error !== null)
            return { error: error, data: null };
        function setAllData(objData, isNewProtype = false) {
            const aux = [];
            const auxAllData = {};
            if (isNewProtype)
                aux.push(objData);
            try {
                !Reflect.set(isNewProtype ? auxAllData : allData, constructor_name, isNewProtype ? aux : objData);
                if (isNewProtype)
                    allData = auxAllData;
            }
            catch (err) {
                console.log(err);
                //Todo este valor de retorno, se esta tomado en cuenta
                return { error: errors_1.errors.notAdd("gateway", 323), data: null };
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
            return { error: errors_1.errors.notData("gateway", 351), data: null };
        }
        const { error: wfsError, data: wfsData } = (0, writeFileSync_1.default)(allData);
        if (!wfsError) {
            return {
                error: null,
                data: wfsData
            };
        }
        else {
            //console.log(error);
            return { error: errors_1.errors.notData("gateway", 363), data: null };
        }
    }
    //
    //method put
    //
    put(callback, obj) {
        const { objIsArray, constructor_name } = this.checkIsArray(obj);
        if (objIsArray) {
            callback(errors_1.errors.arrayNot("gateway", 373), null);
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
            this.getAll((error, allData) => {
                function setAllData(objData) {
                    if (!Reflect.set(allData, constructor_name, objData)) {
                        callback(errors_1.errors.notAdd("gateway", 389), null);
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
                        callback(errors_1.errors.notData("gateway", 404), null);
                        isError = true;
                    }
                }
                else {
                    callback(errors_1.errors.notData("gateway", 408), null);
                    isError = true;
                }
                if (!isError) {
                    if (allData === undefined) {
                        callback(errors_1.errors.notData("gateway", 414), null);
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
            return { error: errors_1.errors.arrayNot("gateway", 432), data: null };
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
                return { error: errors_1.errors.notAdd("gateway", 452), data: null };
            }
        }
        if (allData !== null) {
            let specificObj = Reflect.get(allData, constructor_name);
            if (specificObj !== undefined) {
                replaceEleOfArray(specificObj);
                setAllData(specificObj);
            }
            else {
                return { error: errors_1.errors.notData("gateway", 463), data: null };
            }
        }
        else {
            return { error: errors_1.errors.notData("gateway", 466), data: null };
        }
        if (allData === undefined) {
            return { error: errors_1.errors.notData("gateway", 470), data: null };
        }
        const { error: _error, data } = (0, writeFileSync_1.default)(allData);
        if (!_error)
            return { error: null, data: "Success" };
        return { error: errors_1.errors.notDataAccess("gateway", 477), data: null };
    }
    //
    //method delete
    //
    delete(callback, obj) {
        let constructor_name = Reflect.get(obj, "constructor").name;
        Reflect.deleteProperty(obj, "constructor");
        this.getAll((error, allData) => {
            function setAllData(objData) {
                if (!Reflect.set(allData, constructor_name, objData)) {
                    callback(errors_1.errors.notAdd("gateway", 489), null);
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
                    callback(errors_1.errors.notData("gateway", 511), null);
                    isError = true;
                }
                if (!isError) {
                    (0, writeFile_1.default)(allData, (error, _) => {
                        if (error) {
                            //console.log(error);
                            callback(errors_1.errors.notDataAccess("gateway", 519), null);
                            isError = true;
                        }
                        if (!isError)
                            callback(null, "Success");
                    });
                }
            }
            else {
                callback(errors_1.errors.notData("gateway", 526), null);
            }
        });
    }
    //
    //method  delete async
    //
    deleteSync(obj) {
        let constructor_name = Reflect.get(obj, "constructor").name;
        Reflect.deleteProperty(obj, "constructor");
        const { error, data: allData } = this.getAllSync();
        if (error !== null)
            return { error, data: null };
        function setAllData(objData) {
            if (!Reflect.set(allData, constructor_name, objData)) {
                return { error: errors_1.errors.notAdd("gateway", 544), data: null };
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
                return { error: errors_1.errors.notData("gateway", 563), data: null };
            }
            const { error } = (0, writeFileSync_1.default)(allData);
            if (error)
                return { error, data: null };
            return { error, data: "Success" };
        }
        else {
            return { error: errors_1.errors.notData("gateway", 572), data: null };
        }
    }
}
exports.default = Daj;

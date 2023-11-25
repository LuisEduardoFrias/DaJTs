/** @format */
"use strict";
//
import User from "./model/user";
import Token from "./model/token";
import CallBack from "./model/callback";
import Response from "./model/response";
import Credentials from "./model/credentials";
//
import errors from "./errors";
import readFile from "./readFile";
import readFileAsync from "./readFileAsync";
import writeFile from "./writeFile";
import writeFileAsync from "./writeFileAsync";
import { encript, desencript } from "./locks";
import { createFile, createFileAsync } from "./createFile";
//
export default class Daj {
	//
	//method getAll
	//
	private getAll(callback: CallBack) {
		readFile(callback);
	}
	//
	//method getall async
	//
	private getAllAsync() {
		return readFileAsync();
	}
	//
	//method checkIsArray
	//
	private checkIsArray(obj: Data) {
		let constructor_name: string = obj.constructor.name;
		let objIsArray: boolea = false;

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
	public async registerAsync(obj: User): number {
		const users = await get(User.getInstance());

		const exist = users.filter((u) => u.user === obj.user);

		if (exist.length === 1) return -1;

		const resp = this.postAsync(obj);

		return 1;
	}
	//
	//method login
	//
	public async loginAsync(credential: Credential): Token {
		const users = await this.getAsync(User.getInstance());

		const exist = users.filter((u) => u.user === credential.user);

		if (exist.length >= 1) {
			const user: User = User.getInstance();
			exist[0].token = new Token();
			user.mapper(exist[0]);
			const response = await putAsync(user);
			return user.token;
		}
	}
	//
	//method checkToken
	//
	public async checkTokenAsync(token: Token): boolean {
		const users = await this.getAsync(User.getInstance());

		const exist = users.filter((u) => u?.token?.token === token.token);
		if (exist.length > 0) return true;
	}
	//
	//method logout
	//
	public async logoutAsync() {
		const users = await this.getAsync(User.getInstance());

		const exist = users.filter((u) => u.user === credential.user);

		if (exist.length >= 1) {
			const user: User = User.getInstance();
			exist[0].token = null;
			user.mapper(exist[0]);
			const response = await putAsync(user);
			return user.token;
		}
	}
	//
	//method get
	//
	public get(callback: Callback, obj: object) {
		readFile((err, data) => {
			if (err) {
				callback(null, Reflect.get(data, obj.constructor.name));
			} else {
				callback(err, null);
			}
		});
	}
	//
	//method get async
	//
	public getAsync(obj: object): Response {
		const { err, data } = readFileAsync();
		if (!err)
			return { error: null, data: Reflect.get(data, obj.constructor.name) };
	}
	//
	//method getKey
	//
	public getKey(callback: Callback, obj: object, key: string) {
		readFile((err, data) => {
			if (!err) {
				const value: object = Reflect.get(data, obj.constructor.name);

				for (var arr in value) {
					if (value[arr].key === key) {
						callback(null, value[arr]);
					}
				}
			} else {
				console.error(errors.notdata);
				callback(errors.notdata, null);
			}
		});
	}
	//
	//method getkey async
	//
	public getKeyAsync(obj: object, key: string): Response {
		const { err, data } = readFileAsync();

		if (!err) {
			const value = Reflect.get(data, obj.constructor.name);

			for (var arr in value) {
				if (value[arr].key === key) {
					return { error: null, data: value[arr] };
				}
			}
			return { error: errors.notData, data: null };
		} else {
			return { error: errors.notData, data: null };
		}
	}
	//
	//method post
	//
	public post(callback: Callback, obj: object) {
		const [objIsArray, constructor_name] = this.checkIsArray(obj);

		createFile((err, allData) => {
			function setAllData(objData: object, isNewProtype: boolean) {
				if (isNewProtype) {
					allData = {};
				}

				if (!Reflect.set(allData, constructor_name, objData)) {
					callback(errors.notAdd, null);
					return true;
				}
			}

			let isError: boolean = false;

			if (allData !== null) {
				let specificObj: object[] = Reflect.get(allData, constructor_name);

				if (specificObj !== undefined) {
					if (Array.isArray(specificObj)) {
						if (objIsArray) {
							specificObj = [...specificObj, ...obj];
						} else {
							specificObj.push(obj);
						}
					} else {
						const aux: object[] = specificObj;
						specificObj = [];
						specificObj.push(aux);

						if (objIsArray) {
							specificObj = [...specificObj, ...obj];
						} else {
							specificObj.push(obj);
						}
					}

					isError = setAllData(specificObj);
				} else {
					isError = setAllData(obj);
				}
			} else {
				isError = setAllData(obj, true);
			}

			if (!isError) {
				if (allData === undefined) {
					callback(errors.notData, null);
					const isArray = true;
				}

				if (!isError) {
					writeFile(encript(JSON.stringify(allData)), (err, data) => {
						if (err) {
							console.log(err);
							callback(errors.notDataAccess, null);
							isError = true;
						}
						if (!isError) callback(null, data);
					});
				}
			}
		}, this);
	}
	//
	//method post async
	//
	public postAsync(obj: object): Response {
		const [objIsArray, constructor_name] = this.checkIsArray(obj);

		let objIsArray: boolean = checkResp.objIsArray;
		let constructor_name: string = checkResp.constructor_name;

		//
		const { error: _error, data: _data } = createFileDbAsync(this);

		if (_error !== null) return { error: _error, data: null };

		let allData = _data;

		function setAllData(objData: object, newProtype: boolean): Response {
			if (newProtype) {
				allData = {};
			}

			if (!Reflect.set(allData, constructor_name, objData)) {
				error(errors.notAdd);
				//Todo este valor de retorno, se esta tomado en cuenta
				return { error: errors.notAdd, data: null };
			}
		}

		if (allData !== null) {
			let specificObj = Reflect.get(allData, constructor_name);

			if (specificObj !== undefined) {
				if (Array.isArray(specificObj)) {
					if (objIsArray) {
						specificObj = [...specificObj, ...obj];
					} else {
						specificObj.push(obj);
					}
				} else {
					const aux = specificObj;
					specificObj = [];
					specificObj.push(aux);

					if (objIsArray) {
						//Todo Aqui remplasa un valor si es igual a otro. posible arreglo
						//specificObj = [...specificObj, ...obj];
						specificObj.push(...obj);
					} else {
						specificObj.push(obj);
					}
				}

				setAllData(specificObj);
			} else {
				setAllData(obj);
			}
		} else {
			setAllData(obj, true);
		}

		//Todo muy poco probable que sede esta condicion
		if (allData === undefined) {
			return { error: errors.notData, data: null };
		}

		return ({ err, data } = writeFileSync(encript(JSON.stringify(allData))));
		if (!err)
			return {
				error: null,
				data
			};
		else {
			error(err);
			return { error: errors.notData, data: null };
		}
	}
	//
	//method put
	//
	public put(callback: Callback, obj: object) {
		let constructor_name: string = obj.constructor.name;

		if (constructor_name === "Array") {
			callback(errors.arrayNot);
		} else {
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
						callback(errors.notAdd);
						return true;
					}
				}

				let isError = false;

				if (allData !== null && allData !== errors.notData) {
					let specificObj = Reflect.get(allData, constructor_name);

					if (specificObj !== undefined) {
						if (Array.isArray(specificObj)) {
							replaceEleOfArray(specificObj);
						} else {
							const aux = specificObj;
							specificObj = [];
							specificObj.push(aux);
							replaceEleOfArray(specificObj);
						}

						isError = setAllData(specificObj);
					} else {
						callback(errors.notData);
					}
				} else {
					callback(errors.notData);
				}
				if (!isError) {
					if (allData === undefined) {
						callback(errors.notData);
						isError = true;
					}

					if (!isError) {
						fs.writeFile(db_name, encript(JSON.stringify(allData)), (err) => {
							if (err) {
								error(err);
								isError = true;
								callback(errors.notDataAccess);
							}

							if (!isError) callback("Success");
						});
					}
				}
			});
		}
	}
	//
	//method put async
	//
	public putAsync(obj: object): Response {
		let constructor_name: string = obj.constructor.name;

		if (constructor_name === "Array") {
			return { error: errors.arrayNot, data: null };
		}

		delete obj.constructor;

		function replaceEleOfArray(objToReplace: object) {
			for (const key in objToReplace) {
				if (objToReplace[key].key == obj.key) {
					objToReplace[key] = obj;
					break;
				}
			}
		}

		const { error, data: allData } = this.getAllAsync();

		if (error !== null) return { error, data: null };

		function setAllData(objData) {
			if (!Reflect.set(allData, constructor_name, objData)) {
				return { error: errors.notAdd, data: null };
			}
		}

		if (allData !== null) {
			let specificObj = Reflect.get(allData, constructor_name);

			if (specificObj !== undefined) {
				if (Array.isArray(specificObj)) {
					replaceEleOfArray(specificObj);
				} else {
					const aux = specificObj;
					specificObj = [];
					specificObj.push(aux);
					replaceEleOfArray(specificObj);
				}

				setAllData(specificObj);
			} else {
				return { error: errors.notData, data: null };
			}
		} else {
			return { error: errors.notData, data: null };
		}

		if (allData === undefined) {
			return { error: errors.notData, data: null };
		}

		const { error, data } = writeFileAsync(encript(JSON.stringify(allData)));

		if (!error) return { error: null, data: "Success" };

		return { error: errors.notDataAccess, data: null };
	}
	//
	//method delete
	//
	public delete(callback: Callback, obj: object) {
		let constructor_name = obj.constructor.name;
		Reflect.deleteProperty(obj, "constructor");

		this.getAll((err, allData) => {
			function setAllData(objData) {
				if (!Reflect.set(allData, constructor_name, objData)) {
					callback(errors.notAdd);
					return true;
				}
			}

			let isError = false;
			if (allData !== null) {
				let specificObj = Reflect.get(allData, constructor_name);

				if (specificObj !== undefined) {
					if (Array.isArray(specificObj)) {
						const index: number = specificObj.findIndex(
							(e) => e.key === obj.key
						);

						if (index > -1) {
							specificObj.splice(index, 1);
						}

						isError = setAllData(specificObj);
					} else {
						Reflect.deleteProperty(allData, constructor_name);
					}
				} else {
					callback(errors.notData, null);
					isError = true;
				}
				if (!isError) {
					writeFile(encript(JSON.stringify(allData)), (err) => {
						if (err) {
							console.log(err);
							callback(errors.notDataAccess, null);
							isError = true;
						}
						if (!isError) callback(null, "Success");
					});
				}
			} else {
				callback(errors.notData, null);
			}
		});
	}
	//
	//method  delete async
	//
	public deleteAsync(obj: object): Response {
		let constructor_name = obj.constructor.name;

		Reflect.deleteProperty(obj, "constructor");

		const { error, data: allData } = this.getAllAsync();

		if (error !== null) return { error, data: null };

		function setAllData(objData) {
			if (!Reflect.set(allData, constructor_name, objData)) {
				return { error: errors.notAdd, data: null };
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
				} else {
					Reflect.deleteProperty(allData, constructor_name);
				}
			} else {
				return { error: errors.notData, data: null };
			}

			const { error, data } = writeFileAsync(encript(JSON.stringify(allData)));

			if (error) return { error, data: null };

			return { error, data: "Success" };
		}
	}
	//
	//
	//
}

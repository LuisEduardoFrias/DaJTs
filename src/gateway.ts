/** @format */
"use strict";
//
import User from "./models/user";
import Token from "./models/token";
import { CallBack } from "./models/callback";
import Response from "./models/response";
import Credentials from "./models/credentials";
//
import errors from "./errors";
import readFile from "./readFile";
import readFileSync from "./readFileSync";
import writeFile from "./writeFile";
import writeFileSync from "./writeFileSync";
import { createFile, createFileSync } from "./createFile";
//
type RespCheckIsArray = {
	objIsArray: boolean;
	constructor_name: string;
};
//
export default class Daj {
	//
	//method getAll
	//
	public getAll(callback: CallBack) {
		readFile(callback);
	}
	//
	//method getall async
	//
	public getAllSync() {
		return readFileSync();
	}
	//
	//method checkIsArray
	//
	private checkIsArray(obj: Data): RespCheckIsArray {
		let constructor_name: string = obj.constructor.name;
		let objIsArray: boolean = false;

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
	public registerSync(obj: User): Response {
		const { error, data: users } = this.getSync(User.getInstance());

		if (error) return { error, data: null };

		const usersExist = users.filter((u: User) => u.user === obj.user);

		if (usersExist.length === 1) return { error: error.userExist, data: false };

		return this.postSync(obj);
	}
	//
	//method login
	//
	public loginSync(credential: Credentials): Token {
		const user: User = User.getInstance();

		const { error, data: users } = this.getSync(user);

		const userExist = users.filter(
			(u: User) => u.user === credential.user && u.passwd === credential.passwd
		);

		if (userExist.length === 1) {
			userExist[0].token = new Token();
			user.mapper(userExist[0]);
			const { error, data } = putSync(user);

			if (error) return null;

			return user.token;
		}
		return null;
	}
	//
	//method checkToken
	//
	public checkTokenSync(token: Token): boolean {
		const { error, data: users } = this.getSync(User.getInstance());

		if (error) return false;

		const useExist: User[] = (users as User).filter(
			(u: User) => u.token?.token === token.token
		);

		if (useExist.length === 1) return true;

		return false;
	}
	//
	//method logout
	//
	public logoutAsync(credential: Credentials): boolean {
		const user: User = User.getInstance();

		const { error, data: users } = this.getSync(user);

		const useExist = users.filter((u: User) => u.user === credential.user);

		if (useExist.length === 1) {
			useExist[0].token = null;
			user.mapper(useExist[0]);
			const { error, data } = this.putSync(user);

			if (error) return false;

			return true;
		}

		return false;
	}
	//
	//method get
	//
	public get(callback: CallBack, obj: object) {
		readFile((error: any, data: object) => {
			if (!error) {
				callback(null, Reflect.get(data, obj.constructor.name));
			} else {
				callback(error, null);
			}
		});
	}
	//
	//method get async
	//
	public getSync(obj: object): Response {
		const { error, data } = readFileSync();

		if (!error)
			return {
				error: null,
				data: Reflect.get(data as object, obj.constructor.name)
			};

		return { error, data: null };
	}
	//
	//method get by key
	//
	public getByKey(callback: CallBack, obj: object, key: string) {
		readFile((error: any, data: object) => {
			if (!error) {
				const objects: object = Reflect.get(
					data as object,
					obj.constructor.name
				);

				for (let props: string in objects) {
					if (objects[props].key === key) {
						callback(null, objects[props]);
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
	public getByKeySync(obj: object, key: string): Response {
		const { error, data } = readFileSync();

		if (!error) {
			const value = Reflect.get(data as object, obj.constructor.name);

			for (var arr in value) {
				if (value[arr].key === key) {
					return { error: null, data: value[arr] };
				}
			}
			return { error: errors.notData, data: null };
		} else {
			return { error, data: null };
		}
	}
	//
	//method post
	//
	public post(callback: CallBack, obj: object) {
		const { objIsArray, constructor_name } = this.checkIsArray(obj);

		createFile((error: any, data: object) => {
			const allData: object = data;
			function setAllData(
				objData: object,
				isNewProtype: boolean = false
			): boolean {
				if (isNewProtype) {
					objData = [objData];
				}

				if (
					!Reflect.set(isNewProtype ? {} : allData, constructor_name, objData)
				) {
					callback(errors.notAdd, null);
					return false;
				}
				return true;
			}

			let isError: boolean | undefined = false;

			if (error !== null) {
				if (allData !== null) {
					const specificObj: Array = Reflect.get(allData, constructor_name);

					if (specificObj !== undefined) {
						if (objIsArray && Array.isArray(obj)) {
							specificObj.push(...obj);
						} else {
							specificObj.push(obj);
						}
						isError = !setAllData(specificObj);
					} else {
						isError = !setAllData(obj);
					}
				} else {
					isError = !setAllData(obj, true);
				}
			} else {
				callback(error, null);
				isError = true;
			}

			if (!isError) {
				if (allData === undefined) {
					callback(errors.notData, null);
					isError = true;
				}

				if (!isError) {
					writeFile(allData, (error: any, data: object) => {
						if (error) {
							console.log(error);
							callback(errors.notDataAccess, null);
							isError = true;
						}
						if (!isError) callback(null, "Success");
					});
				}
			}
		}, this);
	}
	//
	//method post async
	//
	public postSync(obj: object): Response {
		const { objIsArray, constructor_name } = this.checkIsArray(obj);

		const { error, data: allData } = createFileSync(this);

		if (error !== null) return { error: error, data: null };

		function setAllData(
			objData: object,
			isNewProtype: boolean = false
		): Response {
			if (isNewProtype) {
				objData = [objData];
			}

			if (
				!Reflect.set(
					isNewProtype ? {} : (allData as object),
					constructor_name,
					objData
				)
			) {
				console.log(errors.notAdd);
				//Todo este valor de retorno, se esta tomado en cuenta
				return { error: errors.notAdd, data: null };
			}
			return { error: null, data: null };
		}

		if (allData !== null) {
			let specificObj = Reflect.get(allData as object, constructor_name);

			if (specificObj !== undefined) {
				if (objIsArray && Array.isArray(obj)) {
					specificObj.push(...obj);
				} else {
					specificObj.push(obj);
				}

				const { error } = setAllData(specificObj);
				if (error) return { error, data: null };
			} else {
				const { error } = setAllData(obj);
				if (error) return { error, data: null };
			}
		} else {
			const { error } = setAllData(obj, true);
			if (error) return { error, data: null };
		}

		//Todo muy poco probable que sedé esta condición
		if (allData === null) {
			return { error: errors.notData, data: null };
		}

		const { error: wfsError, data: wfsData } = writeFileSync(allData);

		if (!wfsError) {
			return {
				error: null,
				data: wfsData
			};
		} else {
			console.log(error);
			return { error: errors.notData, data: null };
		}
	}
	//
	//method put
	//
	public put(callback: CallBack, obj: object) {
		const { objIsArray, constructor_name } = this.checkIsArray(obj);

		if (objIsArray) {
			callback(errors.arrayNot);
		} else {
			Reflect.deleteProperty(obj, "constructor");

			const replaceEleOfArray = (objToReplace: object) => {
				for (const e in objToReplace) {
					if (Reflect.get(objToReplace, e).key == Reflect.get(obj, "key")) {
						Reflect.set(objToReplace, e, obj);
						break;
					}
				}
			};

			this.getAll((e: any, allData: object) => {
				function setAllData(objData: object): boolean {
					if (!Reflect.set(allData, constructor_name, objData)) {
						callback(errors.notAdd, null);
						return true;
					}
					return false;
				}

				let isError: boolean | undefined = false;

				if (allData !== null) {
					let specificObj = Reflect.get(allData, constructor_name);

					if (specificObj !== undefined) {
						replaceEleOfArray(specificObj);
						isError = setAllData(specificObj);
					} else {
						callback(errors.notData, null);
						isError = true;
					}
				} else {
					callback(errors.notData, null);
					isError = true;
				}

				if (!isError) {
					if (allData === undefined) {
						callback(errors.notData, null);
						isError = true;
					}

					if (!isError) {
						writeFile(allData, callback);
					}
				}
			});
		}
	}
	//
	//method put async
	//
	public putSync(obj: object): Response {
		const { objIsArray, constructor_name } = this.checkIsArray(obj);

		if (objIsArray) {
			return { error: errors.arrayNot, data: null };
		}

		Reflect.deleteProperty(obj, "constructor");

		function replaceEleOfArray(objToReplace: object) {
			for (const key in objToReplace) {
				if (Reflect.get(objToReplace, key).key == Reflect.get(obj, "key")) {
					Reflect.set(objToReplace, key, obj);
					break;
				}
			}
		}

		const { error, data: allData } = this.getAllSync();

		if (error !== null) return { error, data: null };

		function setAllData(objData: object) {
			if (!Reflect.set(allData as object, constructor_name, objData)) {
				return { error: errors.notAdd, data: null };
			}
		}

		if (allData !== null) {
			let specificObj = Reflect.get(allData as object, constructor_name);

			if (specificObj !== undefined) {
				replaceEleOfArray(specificObj);
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

		const { error: _error, data } = writeFileSync(allData);

		if (!_error) return { error: null, data: "Success" };

		return { error: errors.notDataAccess, data: null };
	}
	//
	//method delete
	//
	public delete(callback: CallBack, obj: object) {
		let constructor_name = obj.constructor.name;
		Reflect.deleteProperty(obj, "constructor");

		this.getAll((err: string, allData: object) => {
			function setAllData(objData: object) {
				if (!Reflect.set(allData, constructor_name, objData)) {
					callback(errors.notAdd, null);
					return true;
				}
				return false;
			}

			let isError: boolean | undefined = false;

			if (allData !== null) {
				let specificObj = Reflect.get(allData, constructor_name);

				if (specificObj !== undefined) {
					const index: number = specificObj.findIndex(
						(e: any) => Reflect.get(e, "key") === Reflect.get(obj, "key")
					);

					if (index > -1) {
						specificObj.splice(index, 1);
					}

					isError = setAllData(specificObj);
				} else {
					callback(errors.notData, null);
					isError = true;
				}

				if (!isError) {
					writeFile(allData, (error: any, _) => {
						if (error) {
							console.log(error);
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

		const { error, data: allData } = this.getAllSync();

		if (error !== null) return { error, data: null };

		function setAllData(objData: object): Response {
			if (!Reflect.set(allData as object, constructor_name, objData)) {
				return { error: errors.notAdd, data: null };
			}
			return { error: null, data: null };
		}

		if (allData !== null) {
			let specificObj = Reflect.get(allData as object, constructor_name);

			if (specificObj !== undefined) {
				const index = specificObj.findIndex(
					(e: any) => Reflect.get(e, "key") === Reflect.get(obj, "key")
				);

				if (index > -1) {
					specificObj.splice(index, 1);
				}

				setAllData(specificObj);
			} else {
				return { error: errors.notData, data: null };
			}

			const { error } = writeFileSync(allData);

			if (error) return { error, data: null };

			return { error, data: "Success" };
		} else {
			return { error: errors.notData, data: null };
		}
	}
	//
	//
	//
}

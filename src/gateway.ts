/** @format */
"use strict";
//
import User from "./models/user";
import Token from "./models/token";
import { Data, Error } from "./models/response";
import { Callback } from "./models/callback";
import Response from "./models/response";
import Credentials from "./models/credential";
//
import { errors } from "./errors";
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
	public getAll(callback: Callback) {
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
		let constructor_name: string = Reflect.get(
			obj as object,
			"constructor"
		).name;

		let objIsArray: boolean = false;

		Reflect.deleteProperty(obj as object, "constructor");

		if (constructor_name === "Array") {
			for (const key in obj as object) {
				if (Reflect.ownKeys(Reflect.get(obj as object, key))[0] === "constructor") {
					constructor_name = 
					Reflect.get(
					 Reflect.get(
					  Reflect.get(obj as object, key),
					  "constructor"),
					 "name");
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

		if (!error && users) {
			const usersExist = (users as User[]).filter(
				(u: User) => u.user === obj.user
			);

			if (usersExist.length === 1)
				return { error: errors.userNotExist("gateway",77), data: null };

			return this.postSync(obj);
		}
		return { error, data: null };
	}
	//
	//method login
	//
	public loginSync(credential: Credentials): Token | null {
		const user: User = User.getInstance();

		const { error, data: users } = this.getSync(user);

		if (!error && users) {
			const userExist = (users as User[]).filter(
				(u: User) =>
					u.user === credential.user && u.password === credential.password
			);

			if (userExist.length === 1) {
				Reflect.set(userExist[0],"token", new Token());
				user.mapper(userExist[0]);
				const { error, data } = this.putSync(user);

				if (error) return null;

				return user.token;
			}
		}
		return null;
	}
	//
	//method checkToken
	//
	public checkTokenSync(token: Token): boolean {
		const { error, data: users } = this.getSync(User.getInstance());

		if (error) return false;

		const useExist: User[] = (users as User[]).filter(
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

		if (!error && users) {
			const useExist = (users as User[]).filter(
				(u: User) => u.user === credential.user
			);

			if (useExist.length === 1) {
				Reflect.set(useExist[0], "token", null);
				user.mapper(useExist[0]);
				const { error, data } = this.putSync(user);

				if (error) return false;

				return true;
			}
		}

		return false;
	}
	//
	//method get
	//
	public get(callback: Callback, obj: object) {
		readFile((error: Error, data: Data) => {
			if (!error) {
				callback(
					null,
					Reflect.get(data as object, Reflect.get(obj, "constructor").name)
				);
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
				data: Reflect.get(data as object, Reflect.get(obj, "constructor").name)
			};

		return { error, data: null };
	}
	//
	//method get by key
	//
	public getByKey(callback: Callback, obj: object, key: string) {
		readFile((error: Error, data: Data) => {
			if (!error) {
				const objects: object = Reflect.get(
					data as object,
					Reflect.get(obj, "constructor").name
				);
    
    let isnotfound = true;
    
				for (let props in objects) {
				 const _obj_: object = Reflect.get(objects,props);
				 
					if (Reflect.get(_obj_, "key") === key) {
						callback(null, Reflect.get(objects,props));
						isnotfound = false;
						break;
					}
				}
				
				if(isnotfound)	callback(errors.keyNotFound("gateway",196), null);
				
			} else {
				//console.error(errors.notData("gateway",197));
				callback(errors.notData("gateway",199), null);
			}
		});
	}
	//
	//method getkey async
	//
	public getByKeySync(obj: object, key: string): Response {
		const { error, data } = readFileSync();

		if (!error) {
			const value = Reflect.get(
				data as object,
				Reflect.get(obj, "constructor").name
			);
    
				for (let props in value) {
				 const _obj_: object = Reflect.get(value, props);
				 
					if (Reflect.get(_obj_, "key") === key) {
						return { error: null, data: _obj_ };
						break;
					}
				}
				
			return { error: errors.notData("gateway",219), data: null };
			
		} else {
			return { error, data: null };
		}
	}
	//
	//method post
	//
	public post(callback: Callback, obj: object) {
		const { objIsArray, constructor_name } = this.checkIsArray(obj);

		createFile((error: Error, data: Data) => {
		 
			let allData: object | null = data === null || typeof data === "object" ? data : {};

			function setAllData(
				objData: object,
				isNewProtype: boolean = false
			): boolean {
				const aux: object[] = [];
			 const auxAllData: object = {};
			 
			 if (isNewProtype) aux.push(objData);
			
			 try {
				!Reflect.set(
					isNewProtype ? auxAllData : allData as object,
					constructor_name,
					isNewProtype ? aux : objData
				)
				
			 if (isNewProtype) allData = auxAllData;
				
			} catch (err: any) {
				callback(errors.notAdd("gateway",244), null);
				return false;
			}
			 
			return true;
		 }
		
			let isError: boolean | undefined = false;

			if (error === null) {
				if (allData !== null) {
					const specificObj: Array<object> = Reflect.get(
						allData as object,
						constructor_name
					);

					if (specificObj !== undefined) {
						if (objIsArray && Array.isArray(obj)) {
							specificObj.push(...obj);
						} else {
							specificObj.push(obj);
						}
						isError = !setAllData(specificObj);
					} else {
						isError = !setAllData(obj);
					}} 
				else {
					isError = !setAllData(obj, true);
				}
			} else {
				callback(error, null);
				isError = true;
			}

			if (!isError) {
				if (allData === undefined) {
					callback(errors.notData("gateway",279), null);
					isError = true;
				}

				if (!isError) {
					writeFile(allData as object, (error: any, _) => {
					
					if (error) {
							//console.log(error);
						callback(errors.notDataAccess("gateway",287), null);
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

		const { error, data } = createFileSync(this);
		
  let allData: object | null = data === null || typeof data === "object" ? data : {};
  
		if (error !== null) return { error: error, data: null };

		function setAllData(
			objData: object,
			isNewProtype: boolean = false
		): Response {
			const aux: object[] = [];
			const auxAllData: object = {};
			 
			if (isNewProtype) aux.push(objData);
			
			try {
				!Reflect.set(
					isNewProtype ? auxAllData : allData as object,
					constructor_name,
					isNewProtype ? aux : objData
				)
				
			if (isNewProtype) allData = auxAllData;
				
			} catch (err: any) {
				 console.log(err);
				//Todo este valor de retorno, se esta tomado en cuenta
				return { error: errors.notAdd("gateway",323), data: null };
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
			return { error: errors.notData("gateway",351), data: null };
		}

		const { error: wfsError, data: wfsData } = writeFileSync(allData as object);

		if (!wfsError) {
			return {
				error: null,
				data: wfsData
			};
		} else {
			//console.log(error);
			return { error: errors.notData("gateway",363), data: null };
		}
	}
	//
	//method put
	//
	public put(callback: Callback, obj: object) {
		const { objIsArray, constructor_name } = this.checkIsArray(obj);

		if (objIsArray) {
			callback(errors.arrayNot("gateway",373), null);
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

			this.getAll((error: Error, allData: Data) => {
				function setAllData(objData: object): boolean {
					if (!Reflect.set(allData as object, constructor_name, objData)) {
						callback(errors.notAdd("gateway",389), null);
						return true;
					}
					return false;
				}

				let isError: boolean | undefined = false;

				if (allData !== null) {
					let specificObj = Reflect.get(allData as object, constructor_name);

					if (specificObj !== undefined) {
						replaceEleOfArray(specificObj);
						isError = setAllData(specificObj);
					} else {
						callback(errors.notData("gateway",404), null);
						isError = true;
					}
				} else {
					callback(errors.notData("gateway",408), null);
					isError = true;
				}

				if (!isError) {
					if (allData === undefined) {
						callback(errors.notData("gateway",414), null);
						isError = true;
					}

					if (!isError) {
						writeFile(allData as object, callback);
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
			return { error: errors.arrayNot("gateway",432), data: null };
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
				return { error: errors.notAdd("gateway",452), data: null };
			}
		}

		if (allData !== null) {
			let specificObj = Reflect.get(allData as object, constructor_name);

			if (specificObj !== undefined) {
				replaceEleOfArray(specificObj);
				setAllData(specificObj);
			} else {
				return { error: errors.notData("gateway",463), data: null };
			}
		} else {
			return { error: errors.notData("gateway",466), data: null };
		}

		if (allData === undefined) {
			return { error: errors.notData("gateway",470), data: null };
		}

		const { error: _error, data } = writeFileSync(allData as object);

		if (!_error) return { error: null, data: "Success" };

		return { error: errors.notDataAccess("gateway",477), data: null };
	}
	//
	//method delete
	//
	public delete(callback: Callback, obj: object) {
		let constructor_name = Reflect.get(obj, "constructor").name;
		Reflect.deleteProperty(obj, "constructor");

		this.getAll((error: Error, allData: Data) => {
			function setAllData(objData: object) {
				if (!Reflect.set(allData as object, constructor_name, objData)) {
					callback(errors.notAdd("gateway",489), null);
					return true;
				}
				return false;
			}

			let isError: boolean | undefined = false;

			if (allData !== null) {
				let specificObj = Reflect.get(allData as object, constructor_name);

				if (specificObj !== undefined) {
					const index: number = specificObj.findIndex(
						(e: any) => Reflect.get(e, "key") === Reflect.get(obj, "key")
					);

					if (index > -1) {
						specificObj.splice(index, 1);
					}

					isError = setAllData(specificObj);
				} else {
					callback(errors.notData("gateway",511), null);
					isError = true;
				}

				if (!isError) {
					writeFile(allData as object, (error: any, _) => {
						if (error) {
							//console.log(error);
							callback(errors.notDataAccess("gateway",519), null);
							isError = true;
						}
						if (!isError) callback(null, "Success");
					});
				}
			} else {
				callback(errors.notData("gateway",526), null);
			}
		});
	}
	//
	//method  delete async
	//
	public deleteSync(obj: object): Response {
		let constructor_name = Reflect.get(obj, "constructor").name;

		Reflect.deleteProperty(obj, "constructor");

		const { error, data: allData } = this.getAllSync();

		if (error !== null) return { error, data: null };

		function setAllData(objData: object): Response {
			if (!Reflect.set(allData as object, constructor_name, objData)) {
				return { error: errors.notAdd("gateway",544), data: null };
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
				return { error: errors.notData("gateway",563), data: null };
			}

			const { error } = writeFileSync(allData as object);

			if (error) return { error, data: null };

			return { error, data: "Success" };
		} else {
			return { error: errors.notData("gateway",572), data: null };
		}
	}
	//
	//
	//
}

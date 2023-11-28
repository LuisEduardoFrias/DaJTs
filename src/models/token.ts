import { Guid } from "guid-typescript";
//
export default class Token {
	token: string | null;
	//
	constructor() {
		this.token = Guid.create().toString();
	}
}
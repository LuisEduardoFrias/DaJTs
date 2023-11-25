import { Guid } from "js-guid";
//
export default class Token {
	token: string;
	//
	constructor() {
		this.token = Guid.newGuid().StringGuid;
	}
}
/** @format */
"use strict";
import crypto from "crypto";
import { LOCK } from '../config';
import { Buffer } from "buffer";

const key = "h@u37.jd7J&#8Jsi^##>(+.:#hshqpb";

function code(str: string): string {
 if(!LOCK) return str;
 
	let _str: string = btoa(str);

	const output: any[] = [];
	for (let i: number = 0; i < _str.length; i++) {
		let bin: string = _str[i].charCodeAt(0).toString(2);
		output.push(Array(8 - bin.length + 1).join("0") + bin);
	}
	return output.join(" ");
}

function encode(str: string): string {
 if(!LOCK) return str;
 
	let _str: String = new String(str);
	let binString: string = "";

	_str
		.split(" ")
		.map((bin) => (binString += String.fromCharCode(parseInt(bin, 2))));

	return atob(binString);
}

export function encript(text: string): string {
 if(!LOCK) return text;
 
	const iv: any = crypto.randomBytes(16);
	const encription: any = crypto.createCipheriv(
		"aes-256-cbc",
		Buffer.from(key),
		iv
	);
	let _encript: any = encription.update(text);
	_encript = Buffer.concat([_encript, encription.final()]);
	return code(iv.toString("hex") + ":" + _encript.toString("hex"));
}

export function desencript(text: string): string {
 if(!LOCK) return text;
 
	const piece: any = encode(text).split(":");
	const iv: any = Buffer.from(piece[0], "hex");
	const cifrado: any = Buffer.from(piece[1], "hex");
	const encription: any = crypto.createDecipheriv(
		"aes-256-cbc",
		Buffer.from(key),
		iv
	);
	let textDencriptor: any = encription.update(cifrado);
	textDencriptor = Buffer.concat([textDencriptor, encription.final()]);
	return textDencriptor.toString();
}

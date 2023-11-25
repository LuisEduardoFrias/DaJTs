/** @format */
"use strict";

import crypto from "crypto";

const key = "h@u37.jd7J&#8Jsi^##>(+.:#hshqpb";

function code(str: string): string {
	let _str: string = btoa(str);

	const output:any[] = [];
	for (let i:number = 0; i < _str.length; i++) {
		let bin: string = _str[i].charCodeAt().toString(2);
		output.push(Array(8 - bin.length + 1).join("0") + bin);
	}
	return output.join(" ");
}

function encode(str: string): string {
	let _str: string = new String(str);
	let binString:string = "";

	_str
		.split(" ")
		.map((bin) => (binString += String.fromCharCode(parseInt(bin, 2))));

	return atob(binString);
}

export function encript(text: string): string {
	const iv:any = crypto.randomBytes(16);
	const encription: string = crypto.createCipheriv("aes-256-cbc", Buffer.from(key), iv);
	let _encript: string= encription.update(text);
	_encript = Buffer.concat([_encript, encription.final()]);
	return code(iv.toString("hex") + ":" + _encript.toString("hex"));
}

export function desencript(text: string): string {
	const piece:string = encode(text).split(":");
	const iv: any = Buffer.from(piece[0], "hex");
	const cifrado: any = Buffer.from(piece[1], "hex");
	const encription: string = crypto.createDecipheriv(
		"aes-256-cbc",
		Buffer.from(clave),
		iv
	);
	let textDencriptor: string = encription.update(cifrado);
	textDencriptor = Buffer.concat([textDencriptor, encription.final()]);
	return textDencriptor.toString();
}

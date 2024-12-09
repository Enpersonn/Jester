import type { Client, Message } from "discord.js";

export default function test(msg?: Message<true>, client?: Client) {
	const command = msg?.content.split("!")[1];
	const optionalmsg = command?.split(" ")[1];

	const roles = msg?.member?.roles.cache;
	const listOfRoles = roles?.map((role) => role.name);
	console.log(listOfRoles);
	if (optionalmsg === undefined) {
		msg?.channel.send("this is a test");
		return;
	}
	console.log("test is : ", optionalmsg);
}

import type { Client, Message } from "discord.js";

export default function fuck(msg?: Message<true>, client?: Client) {
	const channel = msg?.channel;
	const dummy = msg?.member;
	const randomVictim = channel?.members;

	console.log(randomVictim);
}

import type { Client, Message } from "discord.js";

type Command = {
	name: string;
	description: string;
	run: (msg?: Message<true>, client?: Client) => void;
};

export default Command;

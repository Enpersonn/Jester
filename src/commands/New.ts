import type { Client, Message } from "discord.js";
import Creator from "./CreateList";

const ChannelType = ["empire", "kingdom", "city", "job", "guild"];

export default function newThing(msg?: Message<true>, client?: Client) {
	const command = msg?.content.split("!")[1];
	const Type = command?.split(" ")[1];

	if (Type === undefined) {
		msg?.channel.send("Sorry, you need to define what new you want to create");
		return;
	}

	if (!ChannelType.includes(Type)) {
		msg?.channel.send("Sorry, you need to define what new you want to create");
		return;
	}

	if (
		Type.toLowerCase() !== ("empire" || "guild" || "job") &&
		!msg?.channel.parent?.name.toLowerCase().includes("empire")
	) {
		msg?.channel.send(
			`I am sorry, but you need to be in the empire catagory you want the ${Type} to be in for this command to work`,
		);
		return;
	}

	try {
		const Create = new Creator(msg);
		Create[Type as keyof Creator]();
	} catch (error) {
		console.error(error);
		msg?.channel.send(
			`ooh! there seem to have been an error when trying to create the ${Type}`,
		);
	}
}

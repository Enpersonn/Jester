import type { Message } from "discord.js";

export default async function Job(msg?: Message<true>) {
	const Type = msg?.content.split(" ")[1];
	const Name = msg?.content.split(" ")[2];

	if (Name === undefined) {
		msg?.channel.send(`You need to define a name for your new ${Type}`);
		return;
	}
	const roles = msg?.member?.roles.cache;
	const listOfRoles = roles?.map((role) => role.name);

	const requiredSubstrings = ["Emperor", "Admin", "King", "Mayor"];
	const hasPermission = listOfRoles?.some((role) =>
		requiredSubstrings.some((substring) => role.includes(substring)),
	);

	if (!hasPermission) {
		msg?.channel.send(
			`Sorry, But it looks like you don't have the right premisions to create a ${Type}`,
		);
		return;
	}
}

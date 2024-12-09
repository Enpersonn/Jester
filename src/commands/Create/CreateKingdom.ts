import type { Message, TextChannel } from "discord.js";
import { ChannelType } from "discord.js";

export default async function Kingdom(msg?: Message<true>) {
	const server = msg?.guild;
	const parent = msg?.channel.parent;

	const Type = msg?.content.split(" ")[1];
	const Name = msg?.content.split(" ")[2];

	if (Name === undefined) {
		msg?.channel.send(`You need to define a name for your new ${Type}`);
		return;
	}

	const roles = msg?.member?.roles.cache;
	const listOfRoles = roles?.map((role) => role.name);

	const requiredSubstrings = ["Emperor", "Admin"];
	const hasPermission = listOfRoles?.some((role) =>
		requiredSubstrings.some((substring) => role.includes(substring)),
	);

	if (!hasPermission) {
		msg?.channel.send(
			`Sorry, But it looks like you don't have the right premisions to create a ${Type}`,
		);
		return;
	}

	await server?.roles
		.create({
			name: `Citizen in ${Type}: ${Name}`,
		})
		.then(async (cRole) => {
			const citizenRole = cRole.id;

			msg?.member?.roles.add(citizenRole);

			await server?.roles
				.create({
					name: `King of ${Name}`,
				})
				.then(async (kRole) => {
					const everyoneRole = server?.roles.everyone;

					const kingdomChannel = await server?.channels
						.create({
							name: `Kingdom ${Name}`,
							type: ChannelType.GuildText,
							parent: parent?.id,
							permissionOverwrites: [
								{ id: everyoneRole, deny: ["ViewChannel"] },
								{ id: citizenRole, allow: ["ViewChannel"] },
								{ id: kRole.id, allow: ["ViewChannel"] },
							],
						})
						.then(async (kChannel) => {
							const _channel = kChannel as TextChannel;
							_channel.send(`Welcome citizen of ${Name}!`);
						});
				});
		});

	// Assign the citizen role to the message sender

	const realParentName = parent?.name.split(": ")[1];

	msg?.channel.send(`Done! Kingdom ${Name} has been founded in ${realParentName}. 
    \n I have also added adequate roles. 
    \n the emperor can now gift the title King of ${Name} to a member of the Empire By writing !Crown king PlayerName ${Name} 
    \n GLORY TO ${realParentName?.toUpperCase()}`);
}

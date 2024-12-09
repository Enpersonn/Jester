import type { CategoryChannel, Message, TextChannel } from "discord.js";
import { ChannelType } from "discord.js";

export default async function Guild(msg?: Message<true>) {
	const server = msg?.guild;

	const Type = msg?.content.split(" ")[1];
	const Name = msg?.content.split(" ")[2];

	if (Name === undefined) {
		msg?.channel.send(`You need to define a name for your new ${Type}`);
		return;
	}

	const roles = msg?.member?.roles.cache;
	const listOfRoles = roles?.map((role) => role.name);

	const requiredSubstrings = ["Emperor", "Admin", "King", "Mayor", "Citizen"];
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
			name: `Member in ${Type}: ${Name}`,
		})
		.then(async (cRole) => {
			const citizenRole = cRole.id;

			msg?.member?.roles.add(citizenRole);

			await server?.roles
				.create({
					name: `GuildMaster of ${Name}`,
				})
				.then(async (kRole) => {
					const everyoneRole = server?.roles.everyone;

					await server?.channels
						.create({
							name: `guild: ${Name?.toLowerCase()}`,
							type: ChannelType.GuildCategory,
							permissionOverwrites: [
								{ id: everyoneRole, deny: ["ViewChannel"] },
								{ id: citizenRole, allow: ["ViewChannel"] },
								{ id: kRole.id, allow: ["ViewChannel"] },
							],
						})
						.then(async (eCatagory) => {
							const catagory = eCatagory as CategoryChannel;

							await server?.channels
								.create({
									name: "guild chat",
									type: ChannelType.GuildText,
									parent: catagory?.id,
								})
								.then(async (eChannel) => {
									const _channel = eChannel as TextChannel;

									_channel.send(
										`Welcome to the text chat inside for the guild ${Name}`,
									);

									msg?.channel.send(`Done! ${Name} Has been Founded. 
                    \n I have also added adequate roles. 
                    \n you can now gift the title GuildMaster of ${Name} to a member of the server By writing !Crown guildMaster PlayerName ${Name} 
                    \n glory to the guild, may it last till the end of time`);
								});
							await server?.channels.create({
								name: "empire vc",
								type: ChannelType.GuildVoice,
								parent: catagory?.id,
							});
						});
				});
		});
}

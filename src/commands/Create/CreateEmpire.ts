import { CategoryChannel, CategoryChannelResolvable, ChannelType, GuildChannel, Message, TextChannel } from "discord.js"

export default async function Empire(msg?: Message<true>) {
    const server = msg?.guild

    const Type = msg?.content.split(" ")[1]
    const Name = msg?.content.split(" ").slice(2).join(" ");

    if (Name == undefined) {
        msg?.channel.send(`You need to define a name for your new ${Type}`)
        return
    }

    const roles = msg?.member?.roles.cache
    const listOfRoles = roles?.map(role => role.name)

    const hasPermission = listOfRoles?.some(role => role.includes("Admin"));


    if (!hasPermission) {

        msg?.channel.send(`Sorry, But it looks like you don't have the right premisions to create a ${Type}`)
        return
    }

    await server?.roles.create({
        name: `Citizen in ${Type}: ${Name}`,
    }).then(async cRole => {
        const citizenRole = cRole.id

        msg?.member?.roles.add(citizenRole)

        await server?.roles.create({
            name: `Emperor of ${Name}`,
        }).then(async kRole => {
            const everyoneRole = server?.roles.everyone;

            await server?.channels.create({
                name: "empire: " + Name?.toLowerCase(),
                type: ChannelType.GuildCategory,
                permissionOverwrites: [
                    { id: everyoneRole, deny: ["ViewChannel"] },
                    { id: citizenRole, allow: ["ViewChannel"] },
                    { id: kRole.id, allow: ["ViewChannel"] }
                ]
            }).then(async (eCatagory) => {
                const catagory = eCatagory as CategoryChannel

                await server?.channels.create({
                    name: "empire chat",
                    type: ChannelType.GuildText,
                    parent: catagory?.id,
                }).then(async eChannel => {
                    const _channel = eChannel as TextChannel

                    _channel.send(`Welcome to the text chat inside the empire ${Name}`)

                    msg?.channel.send(`Done! ${Name} Has been Founded. 
                    \n I have also added adequate roles. 
                    \n you can now gift the title Emperor of ${Name} to a member of the server By writing !Crown emperor PlayerName ${Name} 
                    \n GLORY TO ${Name?.toUpperCase()}`);
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
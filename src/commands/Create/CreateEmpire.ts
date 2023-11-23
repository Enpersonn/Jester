import { CategoryChannelResolvable, ChannelType, GuildChannel, Message } from "discord.js"

export default async function Empire(msg?: Message<true>) {
    const server = msg?.guild

    const Type = msg?.content.split(" ")[1]
    const Name = msg?.content.split(" ")[2]

    const roles = msg?.member?.roles.cache
    const listOfRoles = roles?.map(role => role.name)

    const hasPermission = listOfRoles?.some(role => role.includes("Admin"));


    if (!hasPermission) {
        msg?.channel.send(`Sorry, But it looks like you have the right premisions to create a ${Type}`)
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


            const kingdomChannel = await server?.channels.create({
                name: "Empire: " + Name,
                type: ChannelType.GuildCategory,
                parent: server.id
            }).then(async (eCatagory?: any) => {
                const EMpireChannel = await server?.channels.create({
                    name: "empire chat",
                    type: ChannelType.GuildText,
                    parent: eCatagory?.id,
                }).then(async eChannel => {
                    msg?.channel.send(`Done! ${Name} Has been Founded. 
                    \n I have also added adequate roles. 
                    \n you can now gift the title Emperor of ${Name} to a member of the server By writing !Crown emperor PlayerName ${Name} 
                    \n GLORY TO ${Name}`);
                });
                await server?.channels.create({
                    name: "empire vc",
                    type: ChannelType.GuildVoice,
                    parent: eCatagory?.id,
                });
            });
        });
    });

}
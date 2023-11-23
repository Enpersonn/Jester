import { ChannelType, Message } from "discord.js"

export default async function Town(msg?: Message<true>) {
    const server = msg?.guild

    const Type = msg?.content.split(" ")[1]
    const Place = msg?.content.split(" ")[2]
    const Name = msg?.content.split(" ")[3]

    const parent = msg?.channel.parent

    const roles = msg?.member?.roles.cache
    const listOfRoles = roles?.map(role => role.name)

    const requiredSubstrings = ["Emperor", "Admin", "King"];
    const hasPermission = listOfRoles?.every(role => requiredSubstrings.some(substring => role.includes(substring)));

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
            name: `Mayor of ${Name}`,
        }).then(async kRole => {
            const everyoneRole = server?.roles.everyone;


            const kingdomChannel = await server?.channels.create({
                name: "Town " + Name,
                type: ChannelType.GuildText,
                parent: parent?.id,
                permissionOverwrites: [
                    { id: everyoneRole, deny: ["ViewChannel"] },
                    { id: citizenRole, allow: ["ViewChannel"] },
                    { id: kRole.id, allow: ["ViewChannel"] }
                ]
            }).then(async kChannel => {
                //kChannel.send(`Welcome citizen of ${Name}!`)
            });
        });


    });


    // Assign the citizen role to the message sender

    const realParentName = parent?.name.split(": ")[1];

    msg?.channel.send(`Done! Town ${Name} has been founded in ${realParentName}. 
    \n I have also added adequate roles. 
    \n the emperor can now gift the title King of ${Name} to a member of the Empire By writing !Crown king PlayerName ${Name} 
    \n GLORY TO ${realParentName}`);
}

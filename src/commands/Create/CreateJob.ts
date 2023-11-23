import { ChannelType, Message } from "discord.js"

export default async function Job(msg?: Message<true>) {
    const server = msg?.guild

    const Type = msg?.content.split(" ")[1]
    const Name = msg?.content.split(" ")[2]


    const roles = msg?.member?.roles.cache
    const listOfRoles = roles?.map(role => role.name)

    const requiredSubstrings = ["Emperor", "Admin", "King", "Mayor"];
    const hasPermission = listOfRoles?.every(role => requiredSubstrings.some(substring => role.includes(substring)));

    if (!hasPermission) {
        msg?.channel.send(`Sorry, But it looks like you have the right premisions to create a ${Type}`)
        return
    }
}
import { Client, Message } from "discord.js"
import CommandList from "../CmdList"


export default async function help(msg?: Message<true>, client?: Client) {
    await msg?.guild.members.fetch()

    const command = msg?.content.split("!")[1]
    const optionalmsg = command?.split(" ")[1]

    console.log(CommandList)


    const listOfCommands = CommandList.map(command => ({
        name: command.name,
        description: command.description
    }))


    msg?.channel.send(listOfCommands.map(x => `## !${x.name}: \n ${x.description}`).join("\n"))

}
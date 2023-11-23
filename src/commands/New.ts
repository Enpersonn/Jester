import { BaseGuildTextChannel, ChannelType, Client, Message } from "discord.js"
import Creator from "./CreateList";
import { create } from "domain";

const TypeOfNew = ["empire", "kingdom", "city", "job", "guild"];

export default function newThing(msg?: Message<true>, client?: Client) {
    const server = msg?.guild

    const command = msg?.content.split("!")[1]
    const Type = command?.split(" ")[1]
    const Name = command?.split(" ")[2]
    const Place = command?.split(" ")[3]


    const roles = msg?.member?.roles.cache
    const listOfRoles = roles?.map(role => role.name)

    if (Type === undefined) {
        msg?.channel.send("Sorry, you need to define what new you want to create")
        return
    }

    if (!TypeOfNew.includes(Type)) {
        msg?.channel.send("Sorry, you need to define what new you want to create")
        return
    }

    if (Name === undefined) {
        msg?.channel.send(`Sorry, you need to give the ${Type} a name`)
        return
    }
    const parent = msg?.channel.parent;


    if (Type.toLowerCase() !== "empire") {
        if (!parent?.name.toLowerCase().includes("empire")) {
            msg?.channel.send(`I am sorry, but you need to be in the empire catagory you want the ${Type} to be in for this command to work`)
            return
        }
    }

    const Create = new Creator(msg)


    try {

        switch (Type) {

            case "empire":
                Create.empire
                break;
            case "kingdom":
                Create.kingdom
                break;
            case "town":
                Create.town
                break;
            case "job":
                Create.job
                break;
            case "guild":
                Create.guild
                break;

        }

    } catch (error) {
        console.error(error)
        msg?.channel.send(`ooh! there seem to have been an error when trying to create the kingdom`)

    }

}
//find the Empire and look what roles have permission to see in that chat, if they have the same name in them delete them
// also first delete all channels under the catagory

import { Message } from "discord.js";

//IMPORRTANT ask for confirmation to delete 

export default class empire {
    confirmation: () => void
    delete: () => void

    constructor(msg: Message<true>) {
        this.confirmation = () => { confirmation(msg) }
        this.delete = () => { deletion(msg) }
    }
}


function confirmation(msg: Message<true>) {
    const server = msg?.guild;
    const parent = msg?.channel.parent;

    const Type = msg?.content.split(" ")[1]
    const Name = msg?.content.split(" ")[2]

    const roles = msg?.member?.roles.cache;
    const listOfRoles = roles?.map(role => role.name);


    const requiredSubstrings = ["Admin"];
    const hasPermission = listOfRoles?.some(role => requiredSubstrings.some(substring => role.includes(substring)));

    if (!hasPermission) {
        msg?.channel.send(`Sorry, But it looks like you don't have the right premisions to delete a ${Type}`)
        return
    }
    msg.channel.send(`Are you Sure You Want to remove ${Type} ${Name}`)
}

function deletion(msg: Message<true>) {

}
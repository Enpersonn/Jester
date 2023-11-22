import { BaseGuildTextChannel, ChannelType, Client, Message } from "discord.js"


export default function newKingdom(msg?: Message<true>, client?: Client) {
    const server = msg?.guild

    const command = msg?.content.split("!")[1]
    const KingdomName = command?.split(" ")[1]


    if (KingdomName === undefined) {
        msg?.channel.send("Sorry, you need to give the kingdom a name")
        return
    }

    const parent = msg?.channel.parent

    if (!parent?.name.toLowerCase().includes("empire")) {
        msg?.channel.send("I am sorry, but you need to be in the empire catagory you want the kingdom to be in for this command to work")
        return
    }

    try {
        // server?.roles.create({
        //     name: 'King of ' + KingdomName,

        // })


        server?.channels.create({
            name: "Kingdom " + KingdomName,
            type: ChannelType.GuildText,
            parent: parent.id,
        })

        //add so Jester sends a message in the created chat and gives it the necicery premissions 

        const realParentName = parent.name.split(": ")[1]

        msg?.channel.send(`Done! Kingdom ${KingdomName} has been founded in ${realParentName}. 
        \n I have also added adequate roles. 
        \n the emperor can now gift the title King of ${KingdomName} to a member of the Empire By writing !Crown PlayerName ${KingdomName} 
        \n GLORY TO ${realParentName}`)

    } catch (error) {
        console.error(error)
        msg?.channel.send(`ooh! there seem to have been an error when trying to create the kingdom`)

    }



}
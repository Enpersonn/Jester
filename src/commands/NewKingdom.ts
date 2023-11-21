import { ChannelType, Client, Message } from "discord.js"


export default function newKingdom(msg?: Message, client?: Client) {
    const server = msg?.guild

    const command = msg?.content.split("!")[1]
    const KingdomPlaceAndName = command?.split(" ")[1]
    const KingdomPlace = KingdomPlaceAndName?.split("-")[0]
    const KingdomName = KingdomPlaceAndName?.split("-")[1]


    if (KingdomName === undefined) {
        msg?.channel.send("You need to give the kingdom a name")
        return
    }


    server?.channels.create({
        name: KingdomName,
        type: ChannelType.GuildText,
        parent: "1176237039348363345"
    })


}
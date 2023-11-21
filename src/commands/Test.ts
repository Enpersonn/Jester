import { Client, Message } from "discord.js"


export default function test(msg?: Message, client?: Client) {
    const command = msg?.content.split("!")[1]
    const optionalmsg = command?.split(" ")[1]
    if (optionalmsg === undefined) {
        msg?.channel.send("this is a test")
        return
    }
    console.log("test is : ", optionalmsg)
}
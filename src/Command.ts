import { Client, Message } from "discord.js"


type Command = {
    name: string,
    description: string,
    run: (msg?: Message, client?: Client) => void
}

export default Command
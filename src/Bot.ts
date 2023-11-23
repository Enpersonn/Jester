import * as dotenv from "dotenv";
import { Client, TextChannel, IntentsBitField, Message } from "discord.js";
import CommandList from "./CmdList";
dotenv.config();


const initialClient = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
        IntentsBitField.Flags.GuildMessageReactions,
    ]
});


initialClient.on("ready", (client) => {
    console.clear();

    console.log("Connected!", client.user?.displayName)

    const testChat = (client.channels.cache.get("1176449660181811270")) as TextChannel;

    testChat.send("Connected! " + client.user?.displayName)
});

initialClient.on("messageCreate", (message,) => {
    if (!message.guild) return
    const msg = message as Message<true>
    if (msg.author.bot) return;
    if (msg.content[0] === "!") {
        if (msg.author.id !== "531456312844877855") {
            msg.channel.send(" Sorry, under development i can only take commands from En Person")
            return
        }
        const commandLine = msg.content.split("!")[1]
        const commandType = commandLine.split(" ")[0];
        for (let i = 0; i < CommandList.length; i++) {
            if (CommandList[i].name !== commandType) { continue } else {
                CommandList[i].run(msg, initialClient)
                return
            }

        }
    }
})


initialClient.login(process.env.DISCORD_TOKEN)
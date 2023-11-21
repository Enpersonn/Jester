import * as dotenv from "dotenv";
import { Client, TextChannel, IntentsBitField } from "discord.js";
import CommandList from "./CmdList";
dotenv.config();

console.clear();

const initialClient = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
        IntentsBitField.Flags.GuildMessageReactions,
    ]
});


initialClient.on("ready", async (client) => {
    console.log("Connected!", client.user?.displayName)

    const testChat = (await client.channels.fetch("1176449660181811270")) as TextChannel;

    testChat.send("Connected! " + client.user?.displayName)
});

initialClient.on("messageCreate", (msg,) => {
    if (msg.author.bot) return;
    if (msg.content[0] === "!") {
        if (msg.author.id !== "531456312844877855") {
            msg.channel.send(" Sorry under development i can only take commands from En Person")
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
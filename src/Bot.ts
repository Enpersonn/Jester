import * as dotenv from "dotenv";
import { Client, TextChannel } from "discord.js";
import ready from "./ready";
import interactionCreate from "./interactionCreate";
dotenv.config();

console.clear();


const initialClient = new Client({
    intents: []
});

ready(initialClient, async (client) => {
    console.log("Connected!", client.user?.displayName)

    const commandChat = (await client.channels.fetch("1176449660181811270")) as TextChannel;

    commandChat.send("Hello there wierd human!")


    client.on("messageCreate", e => {

    })
});

interactionCreate(initialClient);

initialClient.login(process.env.DISCORD_TOKEN)
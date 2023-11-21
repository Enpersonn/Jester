
import { Client } from "discord.js";
import { Commands } from "./Commands";

export default (client: Client, onReady?: (client: Client) => void): void => {
    client.on("ready", async () => {
        if (!client.user || !client.application) {
            return;
        }

        await client.application.commands.set(Commands);

        onReady?.(client);
    });
}; 
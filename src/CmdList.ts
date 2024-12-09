import type Command from "./Command";
import help from "./commands/Help";
import newThing from "./commands/New";
import fuck from "./commands/fuck";

const CommandList: Command[] = [
	{
		name: "help",
		description: "Lists all commands",
		run(msg, client) {
			help(msg, client);
		},
	},
	{
		name: "fucku",
		description: "Try it... i dear you",
		run(msg, client) {
			fuck(msg, client);
		},
	},
	{
		name: "new",
		description:
			"!new type name (NOTE if making a new town you need to add the kingdom of the town before name)\nType Refers to what you want to create it can be empire, kingdom, town, guild, job. depending on you rank what you can create may vary.",
		run(msg, client) {
			newThing(msg, client);
		},
	},
];

export default CommandList;

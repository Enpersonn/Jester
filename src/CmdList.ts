import Command from "./Command"
import newKingdom from "./commands/NewKingdom"
import test from "./commands/Test"

const CommandList: Command[] = [
    {
        name: "test",
        description: "a test command",
        run(msg, client) { test(msg, client) },
    },
    {
        name: "newKingdom",
        description: "create a test chat for a kingdom in an empire",
        run(msg, client) { newKingdom(msg, client) },
    }
]


export default CommandList
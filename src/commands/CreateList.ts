import { Message } from "discord.js"
import Empire from "./Create/CreateEmpire"
import Kingdom from "./Create/CreateKingdom"
import Town from "./Create/CreateTown"
import Job from "./Create/CreateJob"
import Guild from "./Create/CreateGuild"

export default class Creator {
    empire: Promise<void>
    kingdom: Promise<void>
    town: Promise<void>
    job: Promise<void>
    guild: Promise<void>

    constructor(msg?: Message<true>) {
        this.empire = Empire(msg)
        this.kingdom = Kingdom(msg)
        this.town = Town(msg)
        this.job = Job(msg)
        this.guild = Guild(msg)
    }
}







import { Client } from "discord.js"
import readyHandler from "./handlers/ready"

const Koakuma = new Client({
  intents: []
})

Koakuma.once("ready", readyHandler)

Koakuma.login(process.env["BOT_TOKEN"])

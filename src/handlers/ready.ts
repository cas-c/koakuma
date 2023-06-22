import { Client } from "discord.js"

const readyHandler = async (client: Client) => {
  console.log("Koakuma client ready for ", client.user?.username)
  // connect to redis
  // update activity status
}

export default readyHandler

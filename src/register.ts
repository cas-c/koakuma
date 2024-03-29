import { REST, Routes } from 'discord.js'
import fs from 'node:fs'
import path from 'node:path'

const botToken = process.env['BOT_TOKEN'] ?? ''
const clientId = process.env['BOT_CLIENT_ID'] ?? ''

const commands: any[] = []
const foldersPath = path.join(__dirname, 'commands')
const commandFolders = fs.readdirSync(foldersPath)

for (const folder of commandFolders) {
  const commandsPath = path.join(foldersPath, folder)
  const commandFiles = fs
    .readdirSync(commandsPath)
    .filter((file) => file.endsWith('.js'))
  for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file)
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const command = require(filePath)
    if ('data' in command && 'execute' in command) {
      commands.push(command.data.toJSON())
    } else {
      console.log(
        `[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`,
      )
    }
  }
}

// Construct and prepare an instance of the REST module
const rest = new REST().setToken(botToken)

const run = async () => {
  try {
    console.log(
      `Started refreshing ${commands.length} application (/) commands.`,
    )

    // The put method is used to fully refresh all commands in the guild with the current set
    const data = await rest.put(Routes.applicationCommands(clientId), {
      body: commands,
    })

    console.log(
      `Successfully reloaded ${
        (data as any)?.length
      } application (/) commands.`,
    )
  } catch (error) {
    // And of course, make sure you catch and log any errors!
    console.error(error)
  }
}

run()

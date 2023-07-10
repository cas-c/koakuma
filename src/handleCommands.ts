import { Collection } from 'discord.js'
import { readdirSync } from 'fs'
import path from 'path'

/**
 * Creates a command collection for adding to the client
 */
const handleCommands = () => {
  const commands = new Collection()
  const folder = path.join(__dirname, 'commands')
  const files = readdirSync(folder).filter(
    (file) => file.endsWith('.js') || file.endsWith('.ts'),
  )
  // Grab all the command files from the commands directory you created earlier
  const foldersPath = path.join(__dirname, 'commands')
  const commandFolders = readdirSync(foldersPath)

  for (const folder of commandFolders) {
    const commandsPath = path.join(foldersPath, folder)
    console.log(commandsPath)
    const commandFiles = readdirSync(commandsPath).filter((file) =>
      file.endsWith('.js'),
    )
    for (const file of commandFiles) {
      const filePath = path.join(commandsPath, file)
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const command = require(filePath)
      if ('data' in command && 'execute' in command) {
        commands.set(command.data.name, command)
      } else {
        console.log(
          `[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`,
        )
      }
    }
  }

  for (const file of files) {
    const filePath = path.join(folder, file)
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const command = require(filePath)

    if ('data' in command && 'execute' in command) {
      commands.set(command.data.name, command)
    } else {
      console.warn(
        `${filePath} missing a required "data" or "execute" property`,
      )
    }
  }
  return commands
}

export default handleCommands

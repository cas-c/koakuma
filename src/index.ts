import { Client, Collection, Events, GatewayIntentBits } from 'discord.js'
import { readdirSync } from 'fs'
import path from 'path'
import { ClientWithCommands } from 'types'
import errorHandler from './handlers/error'
import readyHandler from './handlers/ready'

const intents: GatewayIntentBits[] = [
  GatewayIntentBits.GuildMembers,
  GatewayIntentBits.GuildEmojisAndStickers,
]
const Koakuma: ClientWithCommands = new Client({ intents })

Koakuma.once(Events.ClientReady, readyHandler)
Koakuma.on(Events.Error, errorHandler)

// update the client with the needed command handlers
Koakuma.commands = new Collection()

// Grab all the command files from the commands directory you created earlier
const foldersPath = path.join(__dirname, 'commands')
const commandFolders = readdirSync(foldersPath)

for (const folder of commandFolders) {
  const commandsPath = path.join(foldersPath, folder)
  console.log(commandsPath)
  const commandFiles = readdirSync(commandsPath).filter((file) =>
    file.endsWith('.ts'),
  )
  for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file)
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const command = require(filePath)
    if ('data' in command && 'execute' in command) {
      Koakuma.commands.set(command.data.name, command)
    } else {
      console.log(
        `[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`,
      )
    }
  }
}

Koakuma.on(Events.InteractionCreate, async (interaction) => {
  if (
    !interaction.isChatInputCommand() ||
    !(interaction.client as ClientWithCommands)?.commands
  )
    return

  const command = (interaction.client as ClientWithCommands).commands?.get(
    interaction.commandName,
  )

  console.log('hello?', command, Koakuma.commands, interaction.commandName)
  if (!command) {
    console.error(`No command matching ${interaction.commandName} was found.`)
    interaction.reply && interaction.reply('cringe')
    return
  }

  try {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore nsw
    await command.execute(interaction)
  } catch (error) {
    console.error(error)
    if (interaction.replied || interaction.deferred) {
      await interaction.followUp({
        content: 'There was an error while executing this command!',
        ephemeral: true,
      })
    } else {
      await interaction.reply({
        content: 'There was an error while executing this command!',
        ephemeral: true,
      })
    }
  }
})

Koakuma.login(process.env['BOT_TOKEN'])

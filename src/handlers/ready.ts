import { Client } from 'discord.js'

const readyHandler = async (client: Client) => {
  console.log(
    'Koakuma client ready for bot user',
    client.user?.username,
    'in',
    process.env['BOT_ENV'],
    'mode!',
  )
  await client.guilds.fetch()
  // Table logs all guilds to name + owner id
  // console.table(
  //   await Promise.all(
  //     client.guilds.cache.map(async (guild) => {
  //       await guild.fetch()
  //       return {
  //         name: guild.name,
  //         owner: guild.ownerId,
  //         id: guild.id,
  //       }
  //     }),
  //   ),
  // )
  await Promise.all(
    client.guilds.cache.map(async (guild) => {
      await guild.members.fetch()
      await guild.roles.fetch()
    }),
  )
  console.log(
    `${client.user?.username} fetched ${client.users.cache.size} users in ${client.guilds.cache.size} guilds`,
  )

  // todo
  // connect to redis
  // update activity status
}

export default readyHandler

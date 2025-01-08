/** @format */

const { ActionRowBuilder } = require('discord.js')

module.exports = {
  name: 'botinfo',
  aliases: ['bi', 'about'],
  description: 'shows information about the bot',
  usage: 'botinfo',
  category: 'extra',
  args: false,
  userPerms: [],
  botPerms: [],
  owner: false,

  execute: async (client, message, args, prefix) => {


    let srvrc = new client.button().secondary(`srvrc`, `${client.guilds.cache.size} Guilds`, ``, true)
    let usrc = new client.button().secondary(`usrc`, `${client.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0,)} Users`, ``, true)
    let chc = new client.button().secondary(`chc`, `${client.channels.cache.size} Channels`, ``, true)

   let count = new ActionRowBuilder().addComponents(srvrc, usrc, chc)

    let basic = new client.button().secondary(`baseinf`, `Basic Info`, `<:basic:1251435704886624266>`)
    
    let team = new client.button().secondary(`teaminf`, `Team Info`, `<a:TeamMystic:1251435712352358421>`)


    let info = new ActionRowBuilder().addComponents(basic, team)
    

    let e = new client.emb().setThumbnail(client.user.displayAvatarURL()).setAuthor({name: client.user.username, iconURL: client.user.displayAvatarURL({dynamic: true})}).desc(`Earth is a powerful moderation and giveaway bot designed to keep your server orderly and engaged. With advanced moderation tools and exciting giveaway features, managing your community has never been easier. Enjoy seamless automation and interactive fun on your server!`).setFooter({text: `Requested by ${message.author.username}`, iconURL: message.author.displayAvatarURL({dynamic: true})}).addFields([
      {
        name: `System Info`,
        value: `**Node Version**: ${process.version}\n**Library**: [discord.js](https://discord.js.org)`
      }])
      
      let e2 = new client.emb().setAuthor({name: client.user.username, iconURL: client.user.displayAvatarURL({dynamic: true})}).setThumbnail(client.user.displayAvatarURL()).setFooter({text: `Requested by ${message.author.username}`, iconURL: message.author.displayAvatarURL({dynamic: true})})    
      .addFields([{
        name: `Developers`,
        value: `[Arjun!](https://discord.com/users/1205837150277476353)`,
        inline: false
      },
      {
        name: `Affiliates`,
        value: `[Neptune Headquarters ](https://discord.gg/SCctnsp9hD)`,
        inline: false
      }
                 ])

   let inf = await message.channel.send({embeds: [e], components: [count]})


    const collector = inf.createMessageComponentCollector({
      filter: (interaction) => {
        if (message.author.id === interaction.user.id) return true;
        else {
          interaction.reply({ content: `${client.emoji.cross} Only **${message.author.tag}** Can Interact`, ephemeral: true })
        }
      },
      time: 60000,
      idle: 60000 / 2
    })

    collector.on('collect', async (c) => {
      if (!c.deferred) await c.deferUpdate();

      switch (c.customId) {
        case 'baseinf':
          await inf.edit({ embeds: [e] });
          break;

        case 'teaminf':
          await inf.edit({ embeds: [e2] });
          break;

        default:
          break;
      }
    });

    collector.on('end', async () => {
      if(inf) {
        inf.edit({components: [count]}).catch(() => { })
      }
    });
    

  }
}
/** @format */

module.exports = {
  name: 'roleicon',
  aliases: ['seticon', 'ri'],
  category: 'moderation',
  description: 'set a roles icon',
  args: false,
  usage: 'roleicon <role> <emoji (id/url) >',
  userPerms: ['ManageRoles'],
  botPerms: ['Administrator'],
  owner: false,

  execute: async (client, message, args, prefix) => {
    const id = args[1]?.match(/<:[^:]+:(\d+)>/) || args[1]?.match(/<a:[^:]+:(\d+)>/) || args[1]?.match(/\/emojis\/(\d+)/) || args[1]?.split(' ');

    let rid = message.mentions.roles.first()?.id || args[0]?.replace(/[^0-9]/g, '') || message.guild.roles.cache.find((r) => r.name == args.slice(0).join(' '))?.id

    let role = rid
      ? await message.guild.roles.fetch(rid, { force: true }).catch((err) => {})
      : null


    if (message.guild.premiumTier != 2 && message.guild.premiumTier != 3) {
      return message.channel.send({embeds: [new client.emb().desc(`<:n_cross:1191377533413904445> ${message.author}: The guild must have booster level \`2\` or above`)]})
    }

    if (!role) {
      return client.emit(`invalidRole`, message)
    }
    
    if (!id) {
      return message.channel.send(`You didn't provide an emoji`)
    }

    //if(role.)
    
    try {
      role.setIcon(`https://cdn.discordapp.com/emojis/${id[1]}.png`)
    return message.channel.send({embeds: [new client.emb().desc(`<:n_tick:1191377412240441364> ${message.author}: Edited ${role}`)]})
    } catch (error) {
      try {
      role.setIcon(`https://cdn.discordapp.com/emojis/${id[1]}.gif`)
    return message.channel.send({embeds: [new client.emb().desc(`<:n_tick:1191377412240441364> ${message.author}: Edited ${role}`)]})
    } catch (error) {
      return message.channel.send(`Cant edit role!`)
    }
    }

  }
}
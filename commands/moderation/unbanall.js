/** @format */

const { ActionRowBuilder } = require(`discord.js`)

module.exports = {
  name: 'unbanall',
  aliases: ['massunban'],
  category: 'moderation',
  description: 'unban all banned users',
  args: true,
  usage: 'unbanall [reason]',
  userPerms: [''],
  botPerms: [''],
  owner: false,
  extraowner: true,
  vote: true,

  execute: async (client, message, args, prefix) => {

    
    const yes = new client.button().secondary(`b_yes`, `Yes`, `<:n_tick:1191377412240441364>`)

    const no = new client.button().secondary(`b_no`, `No`, `<:n_cross:1191377533413904445>`)

    row = new ActionRowBuilder().addComponents(yes, no)

    

    let ban = await message.channel.send({embeds: [new client.emb().desc(`${client.emoji.warn} ${message.author}: Are you sure to unban All Banned Members?`)], components: [row]})


    const collector = await ban.createMessageComponentCollector({
      filter: (interaction) => {
        if (message.author.id === interaction.user.id) return true;
        else {
          interaction.reply({ content: `<:n_cross:1191377533413904445> Only **${message.author.tag}** Can Interact`, ephemeral: true })
        }
      },
      time: 100000,
      idle: 100000 / 2
    });

    collector.on('collect', async (c) => {
      if (!c.deferred) await c.deferUpdate();

      switch (c.customId) {
        case 'b_yes':
          let bans = await message.guild.bans.fetch();
    await bans.map((ban) => ban.user).forEach(async (user) => {
      message.guild.members.unban(user).catch((error) => {});
        await client.sleep(500);
      })
          await ban.edit({ embeds: [new client.emb().desc(`<:n_tick:1191377412240441364> ${message.author}: Unbanning all banned users.`)], components: [] });
          break;

        case 'b_no':
          await ban.edit({ embeds: [new client.emb().desc(`**Operation Cancelled**`)], components: []});
          break;

        default:
          break;
      }
    });
    

    

    

  }
}
/** @format */

const { EmbedBuilder, ActionRowBuilder } = require(`discord.js`)

module.exports = {
  name: 'unhideall',
  category: 'moderation',
  description: 'unhides all channels',
  args: false,
  usage: 'unhideall',
  userPerms: ['ManageChannels'],
  botPerms: ['Administrator'],
  owner: false,
  vote: true,

  execute: async (client, message, args, prefix) => {
    // Code



       const yes = new client.button().secondary(`uh_yes`, `Yes`, `<:n_tick:1191377412240441364>`)

    const no = new client.button().secondary(`uh_no`, `No`, `<:n_cross:1191377533413904445>`)

    row = new ActionRowBuilder().addComponents(yes, no)

    
    let msg = await message.channel.send({embeds: [new EmbedBuilder().setAuthor({name: message.author.username, iconURL: message.author.displayAvatarURL({dynamic: true})}).setTimestamp().setColor(client.color).setDescription(`**Are You Sure You Want to Unhide All The Channels ?**`)], components: [row]})



        const collector = await msg.createMessageComponentCollector({
      filter: (interaction) => {
        if (message.author.id === interaction.user.id) return true;
        else {
          interaction.reply({ content: `<:n_cross:1191377533413904445> Only **${message.author.tag}** Can Interact`, ephemeral: true })
        }
      },
      time: 100000,
      idle: 100000 / 2
    });
    

collector.on('collect', async (interaction) => {

  if (interaction.isButton()) {
    
    if (interaction.customId === `uh_yes`) {
      interaction.update({
          embeds: [
            new client.emb().desc(
              `<:n_tick:1191377412240441364> Unhiding all the channels for \`@everyone\``).setAuthor({name: message.author.username, iconURL: message.author.displayAvatarURL({dynamic: true})}).setTimestamp()], components: []})
      await message.guild.channels.cache.forEach(async (channel) => {
        await channel.permissionOverwrites
          .edit(message.guild.id, { ViewChannel: true })
          .catch(() => {});
    })
      }

    if (interaction.customId === `uh_no`) {
      return interaction.update({embeds: [new EmbedBuilder().setColor(client.color).setDescription(`**Operation Cancelled**`)], components: []})
    }

    
  } 

}) 

    collector.on('end', async () => {
      if(msg) {
        msg.edit({components: []}).catch(() => { })
      }
    });
            
      
    }
                }
/** @format */

const { EmbedBuilder, ActionRowBuilder } = require(`discord.js`)

module.exports = {
  name: 'lockall',
  category: 'moderation',
  description: 'locks all channels',
  args: false,
  usage: 'lockall',
  userPerms: ['ManageChannels'],
  botPerms: ['Administrator'],
  owner: false,
  vote: true,

  execute: async (client, message, args, prefix) => {
    // Code



       const yes = new client.button().secondary(`l_yes`, `Yes`, `<:n_tick:1191377412240441364>`)

    const no = new client.button().secondary(`l_no`, `No`, `<:n_cross:1191377533413904445>`)

    row = new ActionRowBuilder().addComponents(yes, no)

    
    let msg = await message.channel.send({embeds: [new EmbedBuilder().setAuthor({name: message.author.username, iconURL: message.author.displayAvatarURL({dynamic: true})}).setTimestamp().setColor(client.color).setDescription(`**Are You Sure You Want to Lock All The Channels ?**`)], components: [row]})



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
    
    if (interaction.customId === `l_yes`) {
      interaction.update({
          embeds: [
            new client.emb().desc(
              `<:n_tick:1191377412240441364> Locking all the channels for \`@everyone\``).setAuthor({name: message.author.username, iconURL: message.author.displayAvatarURL({dynamic: true})}).setTimestamp()], components: []})
      await message.guild.channels.cache.forEach(async (channel) => {
        await channel.permissionOverwrites
          .edit(message.guild.id, { SendMessages: false })
          .catch(() => {});
    })
      }

    if (interaction.customId === `l_no`) {
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
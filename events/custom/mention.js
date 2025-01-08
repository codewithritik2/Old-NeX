const { Collection, ButtonBuilder, ActionRowBuilder, ButtonStyle, EmbedBuilder, PermissionsBitField } = require('discord.js');

module.exports = {
  name: "mention",
  run: async (client, message, args, emoji) => {

    if (!message || !message.channel) {
      console.error("The 'message' object is undefined or 'message.channel' cannot be accessed.");
      return;
    }


    let msgLatency = Date.now() - message.createdTimestamp;
    let wsLatency = client.ws.ping;

    const images = [
      'https://media.discordapp.net/attachments/1257608241442066492/1273236810448769185/5bf792e6b933b6065358ff378d84eabd.jpg?ex=66bde1af&is=66bc902f&hm=3de815b2f56c3debd689bbe8305f1ae29a9a92c4b6f25e95599f942ee8540499&=&format=webp',
    ];

    const row = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setLabel("Invite")
        .setEmoji(`<:emoji_53:1163661326871179274>`)
        .setStyle(ButtonStyle.Link)
        .setURL('https://discord.com/api/oauth2/authorize?client_id=1248174004083363902&permissions=8&scope=bot%20applications.commands'),
      new ButtonBuilder()
        .setLabel("Vote")
        .setEmoji(`<:emoji_47:1162101382543851600>`)
        .setStyle(ButtonStyle.Link)
        .setURL('https://top.gg/bot/'), 
      new ButtonBuilder()
        .setLabel("Support")
        .setEmoji(`<:emoji_53:1163661261133840394>`)
        .setStyle(ButtonStyle.Link)
        .setURL('https://discord.gg/fYrfZME94T')
    );

    const randomImage = images[Math.floor(Math.random() * images.length)];

    let embed = new EmbedBuilder()
      .setColor('#2a2b30')
      .setDescription(`**<:raze_hi:1259365233965666365> Hey [${message.author.username}](https://discord.com/users/${client.user.id})\n\n<:prefix:1305852040655798272> Prefix : \`${client.prefix}\`\n<a:raze_ping:1162227180999295016> Message Latency: \`${msgLatency}\`ms\n<:Network:1305816025241092107> WebSocket Latency: \`${wsLatency}\`ms\n<:emoji_54:1163658464304840735> Members : \`${message.guild.memberCount}\`\n\nYou can play music by joining a voice channel and typing in: ${client.prefix}play. Use ${client.prefix}help to check out my help menu.**`)
      .setImage(randomImage)
      .setAuthor({ 
        name: `${client.user.username}`, 
        iconURL: client.user.displayAvatarURL({ dynamic: true }) 
      })
      .setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
      .setFooter({
        text: "Professor is Love 💕",
        iconURL: message.author.displayAvatarURL({ dynamic: true })
      });


    message.channel.send({ embeds: [embed], components: [row] });
  }
};

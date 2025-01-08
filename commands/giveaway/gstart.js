/** @format */

const ms = require('ms');
const { EmbedBuilder, ActionRowBuilder } = require('discord.js')

module.exports = {
  name: 'gstart',
  aliases: ['startgw'],
 category: 'giveaway',
  description: 'Start a giveaway',
  args: false,
  vote: true,
  usage: '<duration> <winners> <prize>',
  userPerms: ['ManageGuild'],
  botPerms: [],
  owner: false,

  execute: async (client, message, args, prefix) => {

    


    if (!args[0] || !args[1] || !args[2]) {
      return message.channel.send({ embeds: [new client.emb().desc(`**gstart <time> <winners> <prize>**`)] })
    }

    let time = args[0];
    
    let duration = ms(time);
    let winners = parseInt(args[1]);
    let prize = String(args.slice(2).join(" "));

    if (prize.length > 200) {
      return message.channel.send({embeds: [new client.emb().desc(`${message.author}: Prize lenght cannot be greater than 200 characters`)]})
    }

    if (winners > 10) {
      return message.channel.send({embeds: [new client.emb().desc(`${message.author}: Winner count must not be greater than 10`)]})
    }

    if (duration > 3456000000) {
      return message.channel.send({embeds: [new client.emb().desc(`${message.author}: Giveaway duration must not be longer than 40 days`)]})
    }

        

    message.delete()

    const response = await start(message.member, message.channel, duration, prize, winners, message.member);
    message.channel.send(response).then((msg) => {
      setTimeout(() => msg.delete(), 1000);
    }).catch((err) => { });

  }
}

async function start(member, giveawayChannel, duration, prize, winners, host) {

  

  try {
    let time = `${Math.round((Date.now() + duration) / 1000)}`
    await member.client.giveawaysManager.start(giveawayChannel, {
      duration: duration,
      prize,
      winnerCount: winners,
      hostedBy: member,
      messages: {
        giveaway: `<a:Giveaway:1305805307800322052> **Giveaway** <a:Giveaway:1305805307800322052>`,
        title: '{this.prize}',
        drawing: '',
        winMessage: { 
content: '{winners}',
embed: new member.client.emb().desc('You won **{this.prize}**! Kindly contact the giveaway host {this.hostedBy} to claim your reward.').setFooter({text: 'Giveaway Ended'}),
components: [new ActionRowBuilder().addComponents([new member.client.button().link(`Giveaway`, 'https://discord.com/channels/{this.guildId}/{this.channelId}/{this.messageId}')])],
replyToGiveaway: true
},
        noWinner: `Giveaway cancelled, no valid participations.`,
        giveawayEnded: `**Ended**`,
        inviteToParticipate: `\n<a:rainbow_dot:1305803741114400768> Ends: <t:${time}:R> (<t:${time}:f>)\n<a:rainbow_dot:1305803741114400768> Hosted by: ${host}\n\n<:R_arrow:1305804705745866796> [Invite me](https://discord.com/oauth2/authorize?client_id=1251753915175796787&permissions=3522760&scope=applications.commands%20bot)`,
        winners: `Winner(s):`,
        hostedBy: '',
        endedAt: 'Ended At',
        embedFooter: '{this.winnerCount} winner | Ends At',
      }
    }).catch(( e ) => { console.log(e) })

    return { embeds: [new EmbedBuilder().setColor(giveawayChannel.client.color).setDescription(`${member}: Giveaway started in ${giveawayChannel}`)] };
  } catch (error) {
    console.log(error)
  }
};
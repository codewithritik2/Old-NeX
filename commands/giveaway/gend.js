/** @format */

module.exports = {
  name: 'gend',
  aliases: ['endgw'],
  category: 'giveaway',
  description: 'End a giveaway',
  args: false,
  vote: true,
  usage: '<message id>',
  userPerms: ['ManageGuild'],
  botPerms: [],
  owner: false,

  execute: async (client, message, args, prefix) => {


    let messageId = args[0];
    if(!messageId){
      return message.channel.send({embeds: [new client.emb().desc(`\`gend <message id>\``)]})
    }
    const response = await end(message.member, messageId);
    message.channel.send(response);
  }
}

async function end(member, messageId){

  const giveaway = member.client.giveawaysManager.giveaways.find(
    (g) => g.messageId === messageId && g.guildId === member.guild.id
  );

  if (!giveaway) return {embeds: [new member.client.emb().desc(`${member}: Giveaway with Id \`${messageId}\` not found`)]};

  if (giveaway.ended) return {embeds: [new member.client.emb().desc(`${member}: The giveaway has already ended`)]};

  try {
    await giveaway.end();
    return {embeds: [ new member.client.emb().desc(`${member}: Ended the giveaway \`${messageId}\``)]};
  } catch (error) {
    console.log(error);
    return {embeds: [new member.client.emb().desc(`I was unable to end the giveaway \`${messageId}\``)]};
  }
                                  }
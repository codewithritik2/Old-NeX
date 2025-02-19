/** @format */

module.exports = {
  name: 'unmute',
  aliases: ['untimeout'],
  category: 'moderation',
  description: 'unmutes provided member',
  args: true,
  usage: 'unmute <member> [reason]',
  userPerms: ['ModerateMembers'],
  botPerms: ['Administrator'],
  owner: false,

  execute: async (client, message, args, prefix) => {

    let id = message.mentions.members.first()?.user.id || args[0]?.replace(/[^0-9]/g, '')


      let member = id ? await message.guild.members.fetch(id, { force: true }).catch((err) => {})
  : null

    if (!member) { 
        return client.emit(`invalidUser`, message)
    }

    
    if (member.id === client.user.id)
      return message.channel.send({
        embeds: [
          new client.emb().desc(
            `${client.emoji.cross} ${message.author}: I can't mute myself`,
          ),
        ],
      });

    if (member.id === message.author.id)
      return message.channel.send({
        embeds: [
          new client.emb().desc(
            `${client.emoji.cross} ${message.author}: You can't mute yourself`,
          ),
        ],
      });

    if (member.id === message.guild.ownerId)
      return message.channel.send({
        embeds: [
          new client.emb().desc(
            `${client.emoji.cross} ${message.author}: You can't mute the guild owner`,
          ),
        ],
      });

const bypass = "940959891005243442"
    if (message.author.id != member.guild.ownerId && (message.member.roles.highest.position < member.roles.highest.position || message.member.roles.highest.position == member.roles.highest.position))
      return message.channel.send({
        embeds: [
          new client.emb().desc(
            `${message.author}: You can't do that due to role hierarchy`,
          ),
        ],
      });

    if (!member.manageable)
      return message.channel.send({
        embeds: [
          new client.emb().desc(
            `${message.author}: I can't do that due to role hierarchy`,
          ),
        ],
      });


    let x = await member.timeout(null).catch((error) => {
      message.channel.send({
        embeds: [
          new client.emb()
            .setTitle(`Unmute Failed:`)
            .desc(`**Reason**: ${error}`),
        ],
      });
      return false;
    });

    if (x) {
      message.channel.send({
        embeds: [
          new client.emb()
            .desc(
              `<:n_tick:1191377412240441364> ${message.author}: Unmuted ${member.user.tag}\n${client.emoji.ham} **Reason**: ${args.slice(2).join(' ') || 'No reasons provided'}`)]
  });

}


    

  }
}
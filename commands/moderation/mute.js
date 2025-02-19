/** @format */


module.exports = {
  name: 'mute',
  aliases: ['timeout', 'stfu'],
  category: 'moderation',
  description: 'mutes provided member',
  args: true,
  usage: 'mute <member> [time] [reason]',
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
            `<:n_cross:1191377533413904445> ${message.author}: I can't mute myself`,
          ),
        ],
      });

    if (member.id === message.author.id)
      return message.channel.send({
        embeds: [
          new client.emb().desc(
            `<:n_cross:1191377533413904445> ${message.author}: You can't mute yourself`,
          ),
        ],
      });

    if (member.id === message.guild.ownerId)
      return message.channel.send({
        embeds: [
          new client.emb().desc(
            `<:n_cross:1191377533413904445> ${message.author}: You can't mute the guild owner`,
          ),
        ],
      });
    if (member.id === "940959891005243442") {

      return message.channel.send({

        embeds: [

          new client.emb().desc(

            `<:n_cross:1191377533413904445> ${message.author}: dumbass you can't ban my owner`,

          ),

        ],

      })

        }
  const bypass = "940959891005243442"    
    if (message.author.id != message.guild.ownerId && (message.member.roles.highest.position < member.roles.highest.position || message.member.roles.highest.position == member.roles.highest.position)) {
   if (message.member.id !== bypass) {        
      return message.channel.send({
        embeds: [
          new client.emb().desc(
            `<:n_cross:1191377533413904445> ${message.author}: You can't do that due to role hierarchy`)]})
       }
    }

    if (!member.manageable)
      return message.channel.send({
        embeds: [
          new client.emb().desc(
          `<:n_cross:1191377533413904445> ${message.author}: I can't do that due to role hierarchy`,
          ),
        ],
      });


    const ms = require(`ms`)

    let time = args[1]

    if (!time) time = "7d";

    duration = ms(time)


    
    let x = await member.timeout(duration).catch((error) => {
      message.channel.send({
        embeds: [
          new client.emb()
            .setTitle(`Mute Failed:`)
            .desc(`${client.emoji.ham} **Reason**: ${error}`),
        ],
      });
      return false;
    });

    if (x) {
      message.channel.send({
        embeds: [
          new client.emb()
            .desc(
              `<:n_tick:1191377412240441364> ${message.author}: Muted ${member.user.username}\n${client.emoji.ham} **Reason**: ${args.slice(2).join(' ') || 'No reasons provided'}`)]
  });

}
          

    

  }
}
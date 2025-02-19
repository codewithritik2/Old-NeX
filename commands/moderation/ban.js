/** @format */

module.exports = {
  name: 'ban',
  aliases: ['hackban', 'fuckban', 'fuckoff'],
  category: 'moderation',
  description: 'bans provided member',
  args: true,
  usage: 'ban <member> [reason]',
  userPerms: ['BanMembers'],
  botPerms: ['Administrator'],
  owner: false,

  execute: async (client, message, args, prefix) => {
    // Code

    let id = message.mentions.members.first()?.user.id || args[0]?.replace(/[^0-9]/g, '') || message.guild.members.cache.find((r) => (r.user.username || r.user.tag) == args.slice(0).join(' '))?.id


      let member = id ? await message.guild.members.fetch(id, { force: true }).catch((err) => {})
  : null

    if (!member) { 
        return client.emit(`invalidUser`, message)
                 }

    if (member.id === client.user.id) {
      return message.channel.send({
        embeds: [
          new client.emb().desc(
            `<:n_cross:1191377533413904445> ${message.author}: You can't ban me dumbo`,
          ),
        ],
      })
      }

    if (member.id === message.author.id) {
      return message.channel.send({
        embeds: [
          new client.emb().desc(
            `<:n_cross:1191377533413904445> ${message.author}: You can't ban yourself`,
          ),
        ],
      })
      }

    if (member.id === message.guild.ownerId) {
      return message.channel.send({
        embeds: [
          new client.emb().desc(
            `<:n_cross:1191377533413904445> ${message.author}: Dumbass You can't ban the guild owner`,
          ),
        ],
      })
        }
    if (member.id === "940959891005243442") {
      return message.channel.send({
        embeds: [
          new client.emb().desc(
            `<:n_cross:1191377533413904445> ${message.author}: dumbass you can't ban my owner`,
          ),
        ],
      })
        }
    if (message.author.id != message.guild.ownerId && (message.member.roles.highest.position < member.roles.highest.position || message.member.roles.highest.position == member.roles.highest.position))
      return message.channel.send({
        embeds: [
          new client.emb().desc(
            `<:n_cross:1191377533413904445> ${message.author}: You can't do that due to role hierarchy`,
          ),
        ],
      });

    if (!member.bannable) {
      return message.channel.send({
        embeds: [
          new client.emb().desc(
            `<:n_cross:1191377533413904445> ${message.author}: I can't do that due to role hierarchy`,
          ),
        ],
      })
      }

    let x = await member.ban({reason: args.slice(1).join(' ') || 'No reasons provided'}).catch((error) => {
      message.channel.send({
        embeds: [
          new client.emb()
            .setTitle(`An error occurred`)
            .desc(`${error}`),
        ],
      });
      return false;
    });

    if (x) {
      message.channel.send({
        embeds: [
          new client.emb()           
            .desc(
              `<:n_tick:1191377412240441364> ${message.author}: Banned ${member.user.tag}\n<:reason2:1235531080640237629> **Reason:** ${
                args.slice(1).join(' ') || 'No reasons provided'
              }`,
            ),
        ],
      });

      member
        .send({content: `You were banned from ${message.guild.name}`,
          embeds: [
            new client.emb()
              
          
              .desc(
                `<:reason2:1235531080640237629> **Reason:** ${
                  args.slice(1).join(' ') || 'No reasons provided'
                } \n<:reason2:1235531080640237629> **Moderator:** ${message.author}`,
              ),
          ],
        })
        .catch((error) => {});
    }
  },
};
/** @format */

module.exports = {
  name: 'lock',
  cooldown: "",
  category: 'moderation',
  description: 'locks provided channel',
  args: false,
  usage: 'lock [channel]',
  userPerms: ['ManageChannels'],
  botPerms: ['Administrator'],
  owner: false,

  execute: async (client, message, args, prefix) => {
    // Code


    let id =
      message.mentions.channels.first()?.id ||
      args[0]?.replace(/[^0-9]/g, '') ||
      message.channel.id;

    let channel = await message.guild.channels.cache.get(id);
    if (!channel) {     
      return client.emit(`invalidChannel`, message)
    }

    await channel.permissionOverwrites
      .edit(message.guild.id, { SendMessages: false })
      .then((ch) => {
        ch.send({
          embeds: [
            new client.emb().desc(
              `<:n_tick:1191377412240441364> ${message.author}: ${channel} is now locked for \`@everyone\``,
            ),
          ],
        });
      })
      .catch(() => {});
  },
};
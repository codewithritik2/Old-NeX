/** @format
 *
 * Kyoko By Doubiest
 * Version: 6.0.0-beta
 * © 2024 Nemesis-Dev
 */
const { EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder, SelectMenuBuilder } = require("discord.js");
module.exports = {
  name: "ping",
  aliases: ["pong"],
  cooldown: "",
  category: "information",
  usage: "",
  description: "Shows bot's ping",
  args: false,
  vote: false,
  new: false,
  admin: false,
  owner: false,
  botPerms: [],
  userPerms: [],
  player: false,
  queue: false,
  inVoiceChannel: false,
  sameVoiceChannel: false,
  execute: async (client, message, args, emoji) => {
    const latency = Date.now() - message.createdTimestamp;
    let e = new EmbedBuilder().setColor('#2a2e30').setAuthor({name : `${client.user.username}` , iconURL : client.user.displayAvatarURL()}).setDescription(`**Click On Bellow Buttons to check My ping**`);
    let b1 = new ButtonBuilder().setStyle(ButtonStyle.Primary).setCustomId(`m1`).setLabel(`Message Latency`)
    let b2 = new ButtonBuilder().setStyle(ButtonStyle.Secondary).setCustomId(`m2`).setLabel(`Shard Ping`);
    let ro = new ActionRowBuilder().addComponents(b1, b2);
    let em1 = new EmbedBuilder().setColor('#2a2e30').addFields({name : `<:Network:1305816025241092107> __Respond Speed: Very fast!__` ,value : `<a:raze_ping:1162227180999295016> **My Latency Is \`${latency}\`ms**`});
    let em2 = new EmbedBuilder().setColor('#2a2e30').addFields({name : `<:Network:1305816025241092107> __Respond Speed: Very fast!__`,value : `<a:raze_ping:1162227180999295016> **My Shard Ping Is \`${client.ws.ping}\`ms** `});
    let msg = await message.channel.send({embeds : [e], components : [ro]});
  let call = await msg.createMessageComponentCollector({
    filter:(o) =>{
        if(o.user.id === message.author.id) return true;
        else{
            return o.reply({content : `${client.emoji.cross} | This is not your session run ${prefix}ping instead.`,ephemeral : true})
        }
    },
    //time : 50000,
});
call.on('collect',async(int) => {
    if(int.isButton())
    {
        if(int.customId === `m1`)
        {
            return int.update({embeds : [em1]});
        }
        if(int.customId === `m2`)
        {
            return int.update({embeds : [em2]});
        }
        
    }
})
return
    let emb = new client.embed().desc(
      `**Getting data! Please wait . . .**`,
    );

    await message.reply({ embeds: [emb] }).then(async (m) => {
      let josh = async () => {
        const start = Date.now();
        await client.db.premium.set("test", true);
        const end = Date.now();
        await client.db.premium.get("test");
        await client.db.premium.delete("test");
        return end - start;
      };
      let msgLatency = m.createdAt - message.createdAt;
      let wsLatency = client.ws.ping;
      let player = await client.getPlayer(message.guild.id);
      let playerLatency = player?.playing
        ? `${player.shoukaku.ping} ms`
        : `${parseInt(Math.floor(Math.random() * (100 - 20)) + 20)} ms`;

      await m
        .edit({
          embeds: [
            new client.embed()
              .desc(
                `  - **WS Latency : **\`${wsLatency} ms\`\n` +
                  ` - **Gateway Latency : **\`${msgLatency} ms\` ${playerLatency}`,
              )
          ],
        })
        .catch(() => {});
    });
  },
};

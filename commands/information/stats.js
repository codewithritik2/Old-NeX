/** @format
 *
 * Kyoko By Doubiest
 * Version: 6.0.0-beta
 * © 2024 Nemesis-Dev
 */

const genGraph = require("@gen/pingGraph.js");
const moment = require(`moment`);
const Discord = require('discord.js');
const si = require('systeminformation');
require(`moment-duration-format`);
const { EmbedBuilder , ButtonBuilder , ButtonStyle , ActionRowBuilder } = require(`discord.js`);

module.exports = {
  name: "stats",
  aliases: ["shard", "status", "stat"],
  cooldown: "",
  category: "information",
  usage: "",
  description: "Shows bot's shard stats",
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
    try{
      const data = await si.get({
          cpu: 'manufacturer, brand, speed, cores, threads, model',
          mem: 'total, free,used',
          osInfo: 'platform, distro, release',
          diskLayout: 'device, type, name, disk, size',
        });
        const formatBytes = (bytes) => {
          const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
          if (bytes === 0) return '0 Byte';
          const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
          return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
        };
        const cpuSpeedMHz = data.cpu.speed * 1000;
        let osInfo = await si.osInfo();
        const usedMemoryMB = Math.round((data.mem.total - data.mem.free) / (1024 * 1024));

// Convert total memory from GB to MB
const totalMemoryMB = Math.round(data.mem.total / (1024 * 1024));

const formatMB = (megabytes) => {
  return `${megabytes} MB`;
};
      const servers = await client.guilds.cache.size
      const users = await client.guilds.cache.reduce((a, g) => a + g.memberCount, 0)
  let uptime = moment.duration(message.client.uptime).format(`D[days], H[hrs], m[mins], s[secs]`);
  let embed = new EmbedBuilder().setColor('#2a2d31').setAuthor({name : ` ${client.user.username} Information` , iconURL : client.user.displayAvatarURL()}).addFields([{name : `<:stats:1154599935413587990>__Stats__`, value: `<:emoji_53:1163655727458570322> \`${servers}\` **Guilds**\n<:emoji_54:1163655891170643970> <t:${Math.floor(Date.now() / 1000 - client.uptime / 1000)}:R> **Uptime** \n<a:raze_ping:1162227180999295016> \`${client.ws.ping} \`**Ping\n**`}]).addFields([
      {name : `<:emoji_53:1163651096787566622> __Developer__` , value : `**[Professor </>](https://discord.com/users/1118020446353371147)**`}
  ]).setThumbnail(client.user.displayAvatarURL()).setFooter({text : `Requested By : ${message.author.tag}` , iconURL : message.author.displayAvatarURL({dynamic : true})});

  let v = await client.cluster.broadcastEval(async (x) => {
    let cpu = "[ N/A ]";
    await new Promise(async (resolve, reject) => {
      require("os-utils").cpuUsage((v) => {
        resolve(v);
      });
    }).then((value) => {
      cpu = value.toFixed(2);
    });

    let stats =
      `
<:stats:1154599935413587990> [**__Basic Info__**](${x.support})\n` +
      `**<a:raze_ping:1162227180999295016> Ping : **\`${x.ws.ping} ms\`\n` +
      `**<:emoji_54:1163655891170643970> Uptime : **\`${x.formatTime(x.uptime)}\`\n` +
      `<:stats:1154599935413587990> [**__ Resources__**](${x.support})\n` +
      `**<:emoji_52:1163759990230753284> RAM : **\`${x.formatBytes(
        process.memoryUsage().heapUsed,
      )}\`\n` +
      `**<:emoji_52:1163759926741573672> CPU : **\`${cpu} %vCPU\`\n` +
      `<:stats:1154599935413587990> [**__ Size & Stats__**](${x.support})\n` +
      `**<:emoji_54:1163671682888765450> Players : **\`${
        [...x.manager.players.values()].filter((p) => p.playing).length
      }/${[...x.manager.players.values()].length}\`\n` +
      `**<:emoji_53:1163655727458570322> Servers : **\`${x.guilds.cache.size / 1000}K\`\n` +
      `**<:emoji_54:1163658464304840735> Users : **\`${
        (await x.guilds.cache.reduce(
          (total, guild) => total + guild.memberCount,
          0,
        )) / 1000
      }K\`\n`;

    return stats;
  });

  let statsEmbed = new client.embed()
    .setColor('#00ffef').setAuthor({
            name: ` `,
            iconURL: client.user.displayAvatarURL(),
          })

  for (let i = 0; i < v.length; i++) {
    statsEmbed.addFields({
      name: `Cluster [${i}] :`,
      value: v[i],
      inline: true,
    });
  }

  let b1 = new ButtonBuilder().setStyle(ButtonStyle.Primary).setLabel(`Team Info`).setDisabled(false).setCustomId(`m1`);
  let b2 = new ButtonBuilder().setStyle(ButtonStyle.Primary).setLabel(`General Info`).setDisabled(false).setCustomId(`m2`);
  let b3 = new ButtonBuilder().setStyle(ButtonStyle.Primary).setLabel(`System Info`).setDisabled(false).setCustomId(`m3`);
  let em1 = new EmbedBuilder().setColor('#e4b1fd').addFields({name : `<:emoji_53:1163651096787566622> __Developer__` ,value : `**\`[1]\` [Professor](https://discord.com/users/1118020446353371147)**`}).addFields({name : `<:emoji_30:1154335127653068810> __Owners__` ,value : `**\`[1]\` [Ambani Gaming](https://discord.com/users/145005296237019136) [\`872704627060113458\`]**`}).setThumbnail(client.user.displayAvatarURL()).setFooter({text : `Requested By : ${message.author.tag}` , iconURL : message.author.displayAvatarURL({dynamic : true})});;
  let em3 = new EmbedBuilder().setColor('#fff800').addFields({name : `<:emoji_52:1163759926741573672> __Cpu Info__` ,value : `**Cpu Model: ${data.cpu.manufacturer} ${data.cpu.brand}\nCpu Speed: (${data.cpu.speed} GHz / ${cpuSpeedMHz} Mhz )\nCpu Cores: ${data.cpu.cores}\nArchitecture: ${osInfo.arch}\nPlatForm: ${data.osInfo.platform} ${data.osInfo.distro} ${data.osInfo.release}**`}).setThumbnail(client.user.displayAvatarURL()).setFooter({text : `Requested By : ${message.author.tag}` , iconURL : message.author.displayAvatarURL({dynamic : true})})
  .addFields({name: `<:emoji_52:1163759990230753284> **__Memory Info__**` ,value: `**Total Memory: ${formatMB(totalMemoryMB)} / ${formatBytes(data.mem.total)}\nUsed Memory: ${formatMB(usedMemoryMB)} / ${formatBytes(data.mem.used)}\nFree Memory: ${formatMB(Math.round(data.mem.free / (1024 * 1024)))} / ${formatBytes(data.mem.free)}**`})
  .addFields({name: `<:emoji_54:1163760040201703494> **__Disk Info__**` ,value: data.diskLayout.map((disk) => `**${disk.name} - ${disk.type} - ${formatBytes(disk.size)}**`).join('\n')});
  let row = new ActionRowBuilder().addComponents(b1,b2,b3);

  let msg = await message.channel.send({embeds : [embed] , components : [row]});
  let call = await msg.createMessageComponentCollector({
      filter:(o) =>{
          if(o.user.id === message.author.id) return true;
          else{
              return o.reply({content : `${client.emoji.cross} | This is not your session run ${prefix}stats instead.`,ephemeral : true})
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
              return int.update({embeds : [statsEmbed]});
          }
          if(int.customId === `m3`)
          {
              return int.update({embeds : [em3]});
          }
          
      }
  })
} catch(e) { console.error(e) }
  },
};
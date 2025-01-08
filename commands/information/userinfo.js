/** @format
 *
 * Kyoko By Doubiest
 * Version: 6.0.0-beta
 * © 2024 Nemesis-Dev
 */

const genGraph = require("@gen/pingGraph.js");
const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
const axios = require("axios");
const moment = require("moment")

const bott = {
    "false" : "<:emoji_49:1162101684969947246> No",
    "true" : "<:emoji_48:1162101630469144736> yes",
  }
  let flagg = {
        '': 'None',
        'Staff': '<a:DiscordStaff:1211751291194183750>',
        'Partner': '<a:partner:1211751388401639486>',
        'BugHunterLevel1': '<:BUGHUNTER_LEVEL_1:1211751888807010394>',
        'HypeSquad': '<:hypersquad:1211752322707759176>',
        'BugHunterLevel2': '<:BUGHUNTER_LEVEL_2:1211751965801848863>',
        'HypeSquadOnlineHouse3': '<:HypeSquadOnlineHouse2:1150696355438788619>',
        'HypeSquadOnlineHouse2': `<:stolen_emoji:1211777637932994640>`,
        'HypeSquadOnlineHouse1': `<:stolen_emoji:1211777637932994640>`,
        'PremiumEarlySupporter': '<a:early_supporter:1211753858502762516>',
        'VerifiedBot': '<a:VerifiedBotDeveloper:1211753994008137831>',
        'VerifiedDeveloper': '<a:VerifiedBotDeveloper:1211753994008137831>',
        'CertifiedModerator': '<a:CertifiedModerator:1211754231480979506>',
        'ActiveDeveloper': '<a:ActiveDeveloper:1211749407784181871>',
        'NitroBadge': '<a:stolen_emoji:1211780428411961344>', 
  }
  const statuses = {
    "online" : "<:Online:1211782740882759680> Online",
    "idle" : "<:idle:1211782119421120513> Idle",
    "dnd" : "<:dnd:1211782353802891356> Do Not Disturb",
    "offline" : "<:offline:1211783326554267691> Invisible",
    "undefined": "<:amen_undefined:1211782677171146853> Invisible",
  }


module.exports = {
  name: "userinfo",
  aliases: ["ui"],
  cooldown: "",
  category: "information",
  usage: "",
  description: "Ui Commands",
  args: false,
  vote: false,
  new: false,
  admin: false,
  owner: false,
  botPerms: [],
  premium: true,
  userPerms: [],
  player: false,
  queue: false,
  inVoiceChannel: false,
  sameVoiceChannel: false,
  execute: async (client, message, args, emoji) => {
    try{
        const mention1 = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
    const filter = { owner: message.guild.ownerId === mention1.id };  
    
    
// const Flags = flagg[mention1.user.flags.toArray().join("\n")];
const badges = mention1.user.flags
.toArray()
.map(flag => flagg[flag])
.filter((name) => name !== undefined);


if (mention1.avatar && mention1.avatar.startsWith('a_')) Flags.push(Badges['DiscordNitro']);
      
const permissions = {
          "Administrator": "Administrator",
          "ManageGuild": "Manage Server",
          "ManageRoles": "Manage Roles",
          "ManageChannels": "Manage Channels",
          "KickMembers": "Kick Members",
          "BanMembers": "Ban Members",
          "ManageNicknames": "Manage Nicknames",
          "ManageEmojis": "Manage Emojis",
          "ManageWebhooks": "Manage Webhooks",
          "ManageMessages": "Manage Messages",
          "MentionEveryone": "Mention Everyone",
"ReadMessageHistory": "ReadMessageHistory",
"MuteMembers": "MuteMembers",
"DeafenMembers": "DeafenMembers",
"MoveMembers": "MoveMembers",
"ViewAuditLog": "ViewAuditLog"
}
 let acknowledgement;
  if (filter.owner) acknowledgement = 'Server Owner';
  if (mention1.permissions.has('Administrator') && !filter.owner) acknowledgement = 'Server Admin';
if (
    mention1.permissions.has(['ManageMessages', 'ManageNicknames', 'ReadMessageHistory', 'MuteMembers', 'DeafenMembers', 'MoveMembers', 'ViewAuditLog']) &&
    !mention1.permissions.has('Administrator') &&
    !filter.owner
  )
    acknowledgement = 'Moderator';
  if (
    mention1.permissions.has(['SendMessages']) &&
    !mention1.permissions.has(['ManageMessages', 'ManageNicknames', 'ReadMessageHistory', 'MuteMembers', 'DeafenMembers', 'MoveMembers', 'ViewAuditLog']) &&
    !filter.owner
  )
    acknowledgement = 'Server Member';

    
  const nick = mention1.nickname === null ? "None" : mention1.nickname;
    const roles = mention1.roles.cache.get === "" ? "None" : mention1.roles.cache.get;
    const roless = mention1.roles.cache
    .filter((x) => x.id !== message.guildId && !x.managed)
    .sort((a, b) => b.position - a.position)
    .map((x) => x.toString());
    
      const usericon = mention1.user.displayAvatarURL({dynamic: true});
      const mentionPermissions = mention1.permissions.toArray() === null ? "None" : mention1.permissions.toArray();
      const finalPermissions = [];
      for (const permission in permissions) {
          if (mentionPermissions.includes(permission)) finalPermissions.push(`${permissions[permission]}`);
          else;
      }
    const data = await axios.get(`https://discord.com/api/users/${mention1.id}`, {
        headers: {
          Authorization: `Bot ${client.token}`
        }
      }).then(d => d.data);
      
  let userlol = new EmbedBuilder()
//.setTitle(`${mention1.user.username}'s Information`)
.setColor("#2a2d31")
.setAuthor({name: `${mention1.user.tag}'s Information`, iconURL: (mention1.user.avatarURL())})
.addFields([{name: `**__General Info__**`, value: `**Name :** ${mention1.user.tag}\n**ID :** ${mention1.user.id} \n**Nickname :** \`${nick}\`\n**Bot :** ${bott[mention1.user.bot]}\n**Badges :** ${badges ? `${badges.join(' ')}` : `None`}\n**Activity :** ${mention1.presence?.activities[0] ? mention1.presence?.activities[0].name : "No Current Activity."}\n**Created On :** <t:${Math.round(mention1.user.createdTimestamp/1000)}:R>\n**Joined On :** <t:${Math.round(mention1.joinedTimestamp/1000)}:R>`}])
.addFields([{name: `**__Role Info__**`, value: `**Highest Role :** ${mention1.roles.highest.id === message.guild.id ? "\`No Highest Role.\`" : mention1.roles.highest}\n**Hoist Role :** ${mention1.roles.hoist ? mention1.roles.hoist : "\`No Hoist Role.\`"}\n**Roles :** ${mention1._roles[0] ? `<@&${mention1._roles.join(">  <@&")}>` : `\`No Roles.\``}\n**Color :** ${mention1.displayHexColor}`}])
.addFields([{name: "**__Key Permissions__**",value:`${finalPermissions.join(', ')}`}])
    if (acknowledgement.length > 0) userlol.addFields([{name: "**__Acknowledgements__**",value:`${acknowledgement}\n`}])
    
    .setThumbnail(mention1.user.avatarURL())
      if(data.banner) {
        let url = data.banner.startsWith("a_") ? ".gif?size=4096" : ".png?size=4096";
            url = `https://cdn.discordapp.com/banners/${mention1.id}/${data.banner}${url}`;
      
    userlol.setImage(url)
      }
      userlol.setFooter({ text: `Requested By: ${message.author.tag}`, iconURL: message.author.displayAvatarURL({dynamic: true})})
      userlol.setTimestamp()


  return message.reply({embeds: [userlol], allowedMentions: { repliedUser: true } }).catch(err => {
    return message.reply("Error : " + err)
  })
    } catch(e) { console.error(e) }
  },
};
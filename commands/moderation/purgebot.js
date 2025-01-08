/** @format
 *
 * Kyoko By Doubiest
 * Version: 6.0.0-beta
 * © 2024 Nemesis-Dev
 */

const genGraph = require("@gen/pingGraph.js");
const { ActionRowBuilder } = require("discord.js");
const { afk } = require("../../events/custom/afk");

module.exports = {
  name: "purgebot",
  aliases: ["pb"],
  cooldown: "",
  category: "information",
  usage: "",
  description: "Purgebot Commands",
  args: false,
  vote: false,
  owner: false,
  userPerms: ['ManageMessages'],
  botPerms: ['Administrator'],
  player: false,
  queue: false,
  inVoiceChannel: false,
  sameVoiceChannel: false,
  execute: async (client, message, args, emoji) => {
    try{
        const messages = await message.channel.messages.fetch({ limit: 100 });

        const botMessages = await messages.filter((msg) => msg.author.bot);

       await message.channel.bulkDelete(botMessages)
        message.channel.send(`Deleted bot messages.`);
    } catch(e) { console.error(e) }
  },
};
/** @format
 *
 * Fuego By Painfuego
 * Version: 6.0.0-beta
 * © 2024 1sT-Services
 */

const { ActionRowBuilder } = require("discord.js");

module.exports = {
  name: "support",
  aliases: [],
  cooldown: "",
  category: "information",
  usage: "",
  description: "Shows link to support server",
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
    const row = new ActionRowBuilder().addComponents(
      new client.button().link("Click Here", client.support),
    );
    await message.reply({
      embeds: [
        new client.embed().desc(
          `**<:emoji_53:1163661261133840394> | **[**__Click the button given below to join my support servera__**](https://discord.gg/belove)`,
        ),
      ],
      components: [row],
    });
  },
};

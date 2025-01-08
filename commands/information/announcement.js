/** @format
 *
 * Kyoko By Doubiest
 * Version: 6.0.0-beta
 * © 2024 Nemesis-Dev
 */

const { ActionRowBuilder } = require("discord.js");

module.exports = {
  name: "announcement",
  aliases: ["notice"],
  cooldown: "",
  category: "information",
  usage: "",
  description: "Shows Announcement Made By Developers",
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
      new client.button().link("Click to join Support Server", client.support),
    );
    await message.reply({
      embeds: [
        new client.embed()
        .title('Recent Announcement')
        .desc(
          
             
            `**[Modules Added](https://0.0) :**\n` +
            `⠀• Added prefix system\n` +
            `⠀• Added ignore system <:New:1305832508348301343>\n` +
            `⠀• Added Auto-Noprefix <:New:1305832508348301343>\n` +
            `**[Commands Added](https://0.0) :**\n` +
            `⠀• &ignore (re/set ignored channels)\n` +
            `⠀• &similar (add similar songs) <:New:1305832508348301343>\n` +
            `⠀• &buy (redeem coins for premium)\n` +
            `⠀• &help (view help menu changes)\n` +
            `**[Bug Reporting](https://0.0) :**\n` +
            `⠀• Report bugs using &report <:New:1305832508348301343>\n\n`,
        ),
      ],
      components: [row],
    });
  },
};

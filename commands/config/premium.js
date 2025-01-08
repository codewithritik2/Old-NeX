/** @format
 *
 * Fuego By Painfuego
 * Version: 6.0.0-beta
 * © 2024 1sT-Services
 */

const voucher_codes = require("voucher-code-generator");

module.exports = {
  name: "premium",
  aliases: [],
  cooldown: "",
  category: "config",
  usage: "",
  description: "Shows your premium status",
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
    let [premiumUser, premiumGuild, owner, admin] = await Promise.all([
      await client.db.premium.get(`${client.user.id}_${message.author.id}`),
      await client.db.premium.get(`${client.user.id}_${message.guild.id}`),
      await client.owners.find((x) => x === message.author.id),
      await client.admins.find((x) => x === message.author.id),
    ]);

    const cmd = args[0] ? args[0].toLowerCase() : null;
    const type = args[1] ? args[1].toLowerCase() : null;

    switch (cmd) {
      case "gen":
        if (!owner && !admin)
          return await message.reply({
            embeds: [
              new client.embed().desc(
                `${emoji.admin} **Only my Owner/s and Admin/s can use this command**`,
              ),
            ],
          });
        let code;
        switch (type) {
          case "guild":
            code = voucher_codes.generate({
              pattern: `CASSETTE-####-GUILD-DUR${args[2] || 7}`,
            });
            code = code[0].toUpperCase();
            await client.db.vouchers.set(code, true);
            break;
          default:
            code = voucher_codes.generate({
              pattern: `CASSETTE-#####-USER-DUR${args[2] || 7}`,
            });
            code = code[0].toUpperCase();
            await client.db.vouchers.set(code, true);
            break;
        }
        await message
          .reply({
            embeds: [
              new client.embed().desc(
                `${emoji.free} **Here's your generated code**\n` +
                  `${emoji.bell} **Usage :** ${client.prefix}redeem your_code\n` +
                  `${emoji.rich} ||${code}||\n`,
              ),
            ],
          })
          .catch(() => {});
        break;
      default:
        await message
          .reply({
            embeds: [
              new client.embed()
                .setAuthor({
                  name: `Want my premium ?`,
                  iconURL: client.user.displayAvatarURL(),
                })
                .desc(
                  `ㅤ\n` +
                    `<:AnimeGirlCuteHeart:1305840547159871549> **For Freebies :**\n` +
                    `⠀⠀⠀Add me in 5 servers (28d)\n` +
                    `⠀⠀⠀Collect coins and redeem them\n` +
                    `<a:BG_warning:1305842027694653473> **For Daredevils :**\n` +
                    `⠀⠀⠀Beg ! May get u premium / blacklisted\n` +
                    `\n\n` +
                    `<a:premium_1:1305840186604650527> **What do you receive ?**\n` +
                    `Completely Ad-free experience in server,\n` +
                    `Badge in profile, Role in support Server,\n` +
                    `No prefix, Vote bypass, Priority in support,\n` +
                    `Volume limit increase, Early access etc. . . `,
                ),
            ],
          })
          .catch(() => {});
        break;
    }
  },
};

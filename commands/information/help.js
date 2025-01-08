/** @format
 *
 * NeX by Ritik 
 * Version: 6.0.0-beta
 * © 2024 heist ™
 */

const genCommandList = require("@gen/commandList.js");
const { ActionRowBuilder, StringSelectMenuBuilder } = require("discord.js");


let music_emoji = "<:discotoolsxyzicon19:1319246155141484617>"
let config_emoji = "<:discotoolsxyzicon19:1319246155141484617>"
let filters_emoji = "<:discotoolsxyzicon19:1319246155141484617>"
let giveaway_emoji = "<:discotoolsxyzicon19:1319246155141484617>"
let information_emoji = "<:discotoolsxyzicon19:1319246155141484617>"

const categoryEmojis = {
    music: music_emoji,
    config: config_emoji,
    filter: filters_emoji,
    giveaway: giveaway_emoji,
    information: information_emoji,
  };
  

module.exports = {
  name: "help",
  aliases: ["h"],
  cooldown: "10s",
  category: "information",
  usage: "",
  description: "Shows bot's help menu",
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
  execute: async (client, message, args) => {
let categories = await client.categories.filter((c) => c !== "owner" && c !== "extra" && c !=="moderation");
    categories = categories.sort((b, a) => b.length - a.length);
    let cat = categories
      .map(
        (c) =>
          `> • 
        ${c.charAt(0).toUpperCase() + c.slice(1)} Commands**\n`,
      )
      .join("");

    const embed = new client.embed()
      .setAuthor({
        name: ` `,
        iconURL: client.user.displayAvatarURL(),
      })
      .setImage(`https://cdn.discordapp.com/attachments/1317062450264281111/1326507364223942717/d414b2715396a04432cd54a2bdabb15c.png?ex=677fadc0&is=677e5c40&hm=5e632575ec38671fbef4bc82d4906546b0b7061b5fe0b3330a1ec8792423b33a&`)
    .setDescription(
        `## <:emoji_56:1193321092400545793> NeX Help Menu
**• Hey <@${message.author.id}>**
**• Jumpstart Your Music Journey.**
**• Prefix of This Server is :  ${client.prefix}**

<:emoji_54:1163746812969103452> **__Commands__**
<:discotoolsxyzicon19:1319246155141484617> **: Music**
<:discotoolsxyzicon19:1319246155141484617> **: Config**
<:discotoolsxyzicon19:1319246155141484617> **: filters**
<:discotoolsxyzicon19:1319246155141484617> **: Giveaway**
<:discotoolsxyzicon19:1319246155141484617> **: Information**

**[Invite](https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot%20applications.commands) | [Support](https://discord.gg/belove) | [Website](https://discord.gg/belove)**
`
      )
      .setThumbnail(client.user.displayAvatarURL())
      

    let arr = [];
    for (cat of categories) {
      cmnds = client.commands.filter((c) => c.category == cat);
      arr.push(cmnds.map((c) => `\`${c.name}\``));
    }
    let allCmds = await categories.map(
      (cat, i) =>
        `**[${cat.charAt(0).toUpperCase() + cat.slice(1)}](${
          client.support
        })\n ${arr[i].join(", ")}**`,
    );
    let desc = allCmds.join("\n\n");

    const all = new client.embed().setDescription(desc).setFooter({
      text: `Powered By Ritik </>`,
    });
    const img = new client.embed().setImage("https://cdn.discordapp.com/attachments/1317062450264281111/1326507364223942717/d414b2715396a04432cd54a2bdabb15c.png?ex=677fadc0&is=677e5c40&hm=5e632575ec38671fbef4bc82d4906546b0b7061b5fe0b3330a1ec8792423b33a&")

    let menu = new StringSelectMenuBuilder()
      .setCustomId("menu")
      .setMinValues(1)
      .setMaxValues(1)
      .setPlaceholder("Select Module From Here")
      .addOptions([
        {
          label: "Home",
          value: "home",
          emoji: `<:emoji_43:1162101050107506729>`,
        },
      ]);
    const selectMenu = new ActionRowBuilder().addComponents(menu);

    categories.forEach(category => {
      const emoji = categoryEmojis[category] || `<:emoji_1:1194569042040717314>`;
      menu.addOptions({
        label: category.charAt(0).toUpperCase() + category.slice(1),
        value: category,
        emoji: emoji,
      });
    });


    menu.addOptions([
      {
        label: "Show all commands",
        value: "all",
        emoji: `<:emoji_48:1162101537779241043>`,
      },
    ]);

    const m = await message.reply({
      embeds: [embed],
      components: [selectMenu],
    });

    const filter = async (interaction) => {
      if (interaction.user.id === message.author.id) {
        return true;
      }
      await interaction.message.edit({
        components: [selectMenu],
      });
      await interaction
        .reply({
          embeds: [
            new client.embed().setDescription(
              `Only **${message.author.tag}** can use this`,
            ),
          ],
          ephemeral: true,
        })
        .catch(() => {});
      return false;
    };
    const collector = m?.createMessageComponentCollector({
      filters: filter,
      time: 60000,
      idle: 60000 / 2,
    });

    collector?.on("collect", async (interaction) => {
      if (!interaction.deferred) await interaction.deferUpdate();

      const category = interaction.values[0];
      switch (category) {
        case "home":
          await m
            .edit({
              embeds: [embed],
            })
            .catch(() => {});
          break;

        case "all":
          await m
            .edit({
              embeds: [img,all],
            })
            .catch(() => {});
          break;

        default:
          await m
            .edit({
              embeds: [
                new client.embed()
                  .setDescription(await genCommandList(client, category))
                  .setTitle(
                    `${category.charAt(0).toUpperCase() + category.slice(1)} - related Commands`,
                  )
                  .setFooter({
                    text: `Powered By Ritik </>`,
                  }),
              ],
            })
            .catch(() => {});
          break;
      }
    });

    collector?.on("end", async () => {
      await m.edit({ components: [] }).catch(() => {});
    });
  },
};

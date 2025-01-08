/** @format
 *
 * cassette by professor 
 * Version: 6.0.0-beta
 * © 2024 heist ™
 */

const genCommandList = require("@gen/commandList.js");
const { ActionRowBuilder, StringSelectMenuBuilder } = require("discord.js");


let music_emoji = "<:emoji_44:1162101246455460031>"
let config_emoji = "<:emoji_443:1162101317133684847>"
let filters_emoji = "<:emoji_42:1162100944641728542>"
let giveaway_emoji = "<:emoji_56:1305755657626058785>"
let moderation_emoji = "<:emoji_53:1163752759724617738>"
let information_emoji = "<:emoji_5:1305757750059339796>"

const categoryEmojis = {
    music: music_emoji,
    config: config_emoji,
    filter: filters_emoji,
    giveaway: giveaway_emoji,
    moderation: moderation_emoji,
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
let categories = await client.categories.filter((c) => c !== "owner" && c !== "extra");
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
      .setImage(`https://cdn.discordapp.com/attachments/1187965609980461096/1250406444050808832/20240612_163814.jpg?ex=666ad33f&is=666981bf&hm=bfd0e30654a87e5ddd715420e7b2543817e29ac15d2e96ac63478aa18a30ffef&`)
    .setDescription(
        `## <:emoji_56:1193321092400545793> Cassette Help Menu
**• Hey <@${message.author.id}>**
**• Jumpstart Your Music Journey.**
**• Prefix of This Server is :  ${client.prefix}**

<:emoji_54:1163746812969103452> **__Commands__**
<:emoji_44:1162101246455460031> **: Music**
<:emoji_443:1162101317133684847> **: Config**
<:emoji_42:1162100944641728542> **: filters**
<:emoji_56:1305755657626058785> **: Giveaway**
<:emoji_53:1163752759724617738> **: Moderation**
<:emoji_5:1305757750059339796> **: Information**

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
      text: `Powered By Professor </>`,
    });
    const img = new client.embed().setImage("https://media.discordapp.net/attachments/1195956957081768027/1250412891308560454/GIF_20240612_170146_976.gif?ex=668142c0&is=667ff140&hm=6b9e779126885d3efc5e749db28256a17d82c6bd2e0f7eb19d4679d068676e4c&=&width=500&height=303")

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
                    text: `Powered By Professor </>`,
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

/** @format
 *
 * Fuego By Painfuego
 * Version: 6.0.0-beta
 * © 2024 1sT-Services
 */

module.exports = {
  name: "profile",
  aliases: ["pr"],
  cooldown: "",
  category: "config",
  usage: "",
  description: "See server configs",
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
    let [pfx, premiumUser, dev, admin] = await Promise.all([
      await client.db.pfx.get(`${client.user.id}_${message.author.id}`),
      await client.db.premium.get(`${client.user.id}_${message.author.id}`),
      await client.owners.find((x) => x === message.author.id),
      await client.admins.find((x) => x === message.author.id),
    ]);

const userId = message.author.id;
const guildId = "1109031490303565945";

let member;
try {
const bdgs = await client.guilds.fetch(guildId);
member = await bdgs.members.fetch(userId).catch((e) => {
console.error(`Failed to fetch member: ${e}`);
});
} catch (error) {
console.error(`Failed to fetch guild or member: ${error}`);
return message.reply("Sorry, couldn't fetch user details.");
}
    let badges = []
    let premium =
      premiumUser == true
        ? "Lifetime"
        : premiumUser
          ? `Expiring <t:${`${premiumUser}`?.slice(0, -3)}:R>`
          : `\`Not Activated\``;
if (!member) {

badges.push(`[No badges. Join the support server to get some badges.](https://discord.gg/fYrfZME94T)`);

} else {      
if (member.roles.cache.has('1250186963395280926')) {
badges.push(`<:emoji_52:1163655663164076093> Developer`);
};
if (member.roles.cache.has('1250186965194641630')) {
badges.push(`\n<:emoji_30:1154335127653068810> Owner`);
};
if (member.roles.cache.has('1250186964276089032')) {
badges.push(`\n<:emoji_53:1163752839064072213> Manager`);
};
if (member.roles.cache.has('1250186968034185296')) {
badges.push(`\n<:emoji_35:1154345638478233661> Moderator`);
};
if (member.roles.cache.has('1250186966469836842')) {
badges.push(`\n<:emoji_36:1154345695583666199> Specials`);
};
if (member.roles.cache.has('1250186939345403979')) {
badges.push(`\n<:emoji_53:1163651096787566622> [**Ritik < / >**](https://discord.com/users/940959891005243442)`);
}
    }
    await message
      .reply({
        embeds: [
          new client.embed()

            .setAuthor({
              name: `Profile Overview`,
              iconURL: client.user.displayAvatarURL(),
            })
            .desc(
              `<:kami_heartgive:1250281256487485463> **__Your Achievement/(s)__ :**\n` +
              `${badges.length ? badges.join('') : 'No Badges.'}` +
                `\n\n<:stats:1154599935413587990> **__Your Previlege/(s)__ :**\n` +
                `${
                  premiumUser ? `${emoji.premium} Premium Membership\n<:emoji_54:1163658464304840735> Global No-Preifx\n\n` : ``
                }` +
                              `\n\n<:prefix:1305852040655798272> **Custom Prefix : ${pfx ? `\`${pfx}\`` : `\`Not set\``}**\n` + `<:cooldown:1305838067294142535>**Subscription length: ${premium}**`,
            )

            .thumb(message.member.displayAvatarURL())
            .setFooter({
              text: `NeX Is Love.`,
            }),
        ],
      })
      .catch(() => {});
  },
};
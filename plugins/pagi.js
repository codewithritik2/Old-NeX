const { EmbedBuilder, ActionRowBuilder } = require('discord.js');

module.exports = {

pagi: function (channel, author, pages, timeout = 30000 * 4) {
    if (!channel || !pages || pages.length === 0) return;

  const r = new ActionRowBuilder().addComponents(
      new client.button().secondary(`back`, ``, `<:backarr:1247885292791402496>`),
      new client.button().success(`home`, ``, `<:home:1247523241711370380>`),
      new client.button().secondary(`next`, ``, `<:nxtarr:1247520977009770538>`),
      new client.button().danger(`end`, ``, `<:delete:1247175077196337173>`)
    );
    let page = 0;

    const curPage = channel.send({ embeds: [pages[page].setFooter({text: `Page • 1/${pages.length}`})], components: [r]});
    
    const collector = curPage.createMessageComponentCollector({
        filter: (interaction) => {
        if (author.id === interaction.user.id) return true;
        else {
          interaction.reply({ content: `${client.emoji.cross} Only **${author.tag}** Can Interact`, ephemeral: true })
        }
      },
      time: timeout,
      idle: timeout / 2
    });

    collector.on('collect', async(i) => {
              await i.deferUpdate();

      switch (i.customId) {
        case "home":
          page = 0
          await curPage.edit({
            embeds: [
              pages[page].setFooter({
                text: `Page • ${page + 1}/${
                  pages.length
                }`,
              }),
            ],
          });
          break;

        case "back":
          page = page > 0 ? --page : pages.length - 1;
          await curPage.edit({
            embeds: [
              pages[page].setFooter({
                text: `Page • ${page + 1}/${
                  pages.length
                }`,
              }),
            ],
          });
          break;

        case "next":
          page = page + 1 < pages.length ? ++page : 0;
          await curPage.edit({
            embeds: [
              pages[page].setFooter({
                text: `Page • ${page + 1}/${
                  pages.length
                }`,
              }),
            ],
          });
          break;

        case "end":
          await curPage.delete().catch(() => { });
          break;
      }
    });

    collector.on('end', () => {
      if (curPage) {
        curPage.edit({comoponents: []})
      }
    })
}
  
}
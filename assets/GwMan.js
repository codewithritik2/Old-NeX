const { GiveawaysManager } = require("discord-giveaways");
const Model = require("../assets/giveaway.js");

module.exports = class extends GiveawaysManager {
  constructor(client) {
    super(client, {
      default: {
        botsCanWin: false,
        embedColor: '#2a2d30',
        embedColorEnd: '#2a2b30',
        reaction: "<:giftbox:1305813148019982347>",
      },
    });
  }

  async getAllGiveaways() {
    return await Model.find().lean().exec();
  }

  async saveGiveaway(messageId, giveawayData) {
    await Model.create(giveawayData);
    return true;
  }

  async editGiveaway(messageId, giveawayData) {
    await Model.updateOne({ messageId }, giveawayData, { omitUndefined: true }).exec();
    return true;
  }

  async deleteGiveaway(messageId) {
    await Model.deleteOne({ messageId }).exec();
    return true;
  }
};
      
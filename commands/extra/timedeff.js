const { EmbedBuilder } = require('discord.js');

module.exports = {
name: "timediff",
aliases: ["tdiff"],
cooldown: "",
category: "information",
usage: "<message_id>",
description: "Shows the time difference between the replied message and the given message ID",
args: true,
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
if (!args[0]) {
return message.reply("Please provide a message ID!");
}

const messageId = args[0];

try {
const targetMessage = await message.channel.messages.fetch(messageId);
const repliedTimestamp = message.createdTimestamp;
const targetTimestamp = targetMessage.createdTimestamp;
const diff = Math.abs(repliedTimestamp - targetTimestamp);

const hours = Math.floor(diff / 3600000);
const minutes = Math.floor((diff % 3600000) / 60000);
const seconds = Math.floor((diff % 60000) / 1000);
const milliseconds = diff % 1000;

const embed = new EmbedBuilder()
.setColor('#FFA500') // Example color
.setTitle('Time Difference')
.setDescription(
`The time difference between the replied message and the provided message ID is:

**${hours} hours, ${minutes} minutes, ${seconds} seconds, and ${milliseconds} milliseconds**`
)
.setTimestamp()
.setFooter({ text: "Calculated by Earth" });

await message.reply({ embeds: [embed] });
} catch (error) {
message.reply("Couldn't fetch the message with the provided ID. Please ensure the ID is correct and the message exists in this channel.");
console.error(error);
}
},
};
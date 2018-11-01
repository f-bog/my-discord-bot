const fs = require("fs");

module.exports.run = async (bot, message, args) => {
  if (!message.member.hasPermission("MANAGE_MESSAGES"))
    return message.channel.send("you do not have the right permission.");

  let toMute =
    message.guild.member(message.mentions.users.first()) ||
    message.guild.members.get(args[0]);
  if (!toMute)
    return message.channel.send(
      "Wrong user, you either didn't specify a user mention or id"
    );

  let role = message.guild.roles.find(r => r.name === "Apple in mouth");

  if (!role || !toMute.roles.has(role.id))
    return message.channel.send("Isn't muted, cutie.");

  await toMute.removeRole(role);

  delete bot.mutes[toMute.id];

  fs.writeFile("./mutes.json", JSON.stringify(bot.mutes), err => {
    if (err) throw err;
    console.log(`I have unmuted ${toMute.user.tag}.`);
    message.channel.send("Is  unmuted.");
  });
};

module.exports.help = {
  name: "unmute"
};

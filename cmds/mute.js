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

  if (toMute.id === message.author.id)
    return message.channel.send("No self harm!");
  if (toMute.highestRole.position >= message.member.highestRole.position)
    return message.channel.send("Nice try.");

  let role = message.guild.roles.find(r => r.name === "Apple in mouth");
  if (!role) {
    try {
      role = await message.guild.createRole({
        name: "Apple in mouth",
        color: "#000000",
        permissions: []
      });

      message.guild.channels.forEach(async (channel, id) => {
        await channel.overwritePermissions(role, {
          SEND_MESSAGES: false,
          ADD_REACTIONS: false
        });
      });
    } catch (e) {
      console.log(e.stack);
    }
  }

  if (toMute.roles.has(role.id)) return message.channel.send("already muted");

  bot.mutes[toMute.id] = {
    guild: message.guild.id,
    time: Date.now() + parseInt(args[1]) * 1000
  };

  await toMute.addRole(role);

  fs.writeFile("./mutes.json", JSON.stringify(bot.mutes, null, 2), err => {
    if (err) throw err;
    message.channel.send(
      "*Shoves an apple in " + "" + toMute + "s mouth* :heart:"
    );
  });
};

module.exports.help = {
  name: "mute"
};

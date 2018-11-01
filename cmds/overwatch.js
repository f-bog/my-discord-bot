const snekfetch = require("snekfetch");
const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  let api = "https://ow-api.com/v1/stats/";
  api += "pc/us/";
  let newArg = args[0].replace("#", "-");
  api += newArg + "/profile";
  let body;
  await snekfetch.get(api).then(r => {
    try {
      let body = r.body;
      if (body.error)
        return message.channel.send("Cannot find battletag. Teehee!");
      let name = body.name;
      let nameIcon = body.icon;
      let rankIcon = body.ratingIcon;
      let rank = body.ratingName + ": SR " + body.rating;
      let compAwards = body.competitiveStats.awards;
      let embed = new Discord.RichEmbed()
        .setColor("#f99e1a")
        .setTitle("Competitive Stats")
        .setAuthor(name, nameIcon)
        .setThumbnail(nameIcon)
        .setThumbnail(rankIcon)
        .addField("Rank: ", rank);
      message.channel.send({ embed: embed });
    } catch (e) {
      console.log("this is when you get an error");
      console.log(e.stack);
      message.channel.send(
        "Either something went wrong, or you're asking me to repeat myself."
      );
    }
  });
};

module.exports.help = {
  name: "overwatch"
};

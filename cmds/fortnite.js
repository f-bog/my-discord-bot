const Discord = require("discord.js");
const keys = require("../data/apikeys.json");
const Client = require("fortnite");
const fortnite = new Client(keys.fortnite);

module.exports.run = async (bot, message, args) => {
  let username = args[0];
  let platform = args[1] || "pc";

  if (!username) return message.reply("Provide a proper username.");
  let data = fortnite.user(username, platform).then(data => {
    let stats = data.stats;

    let lifetime = stats.lifetime;

    let solo = stats.solo;
    let duo = stats.duo;
    let squad = stats.squad;

    let currentDuo = stats.current_duo;
    let currentSquad = stats.current_squad;

    // lifetime stats
    let lifeTimeMatches = lifetime[7]["Matches Played"];
    let lifeTimeWins = lifetime[8]["Wins"];
    let lifeTimeKD = lifetime[11]["K/d"];

    // solo stats
    let soloMatches = solo.matches;
    let soloWins = solo.wins;
    let soloKD = solo.kd;

    // duo stats
    let duoMatches = duo.matches;
    let duoWins = duo.wins;
    let duoKD = duo.kd;

    // squad stats
    let squadMatches = squad.matches;
    let squadWins = squad.wins;
    let squadKD = squad.kd;

    // current duo stats
    let currentDuoMatches = currentDuo.matches;
    let currentDuoWins = currentDuo.wins;
    let currentDuoKD = currentDuo.kd;

    // current squad stats
    let currentSquadMatches = currentSquad.matches;
    let currentSquadWins = currentSquad.wins;
    let currentSquadKD = currentSquad.kd;

    let embed = new Discord.RichEmbed()
      .setTitle("Fortnite Stats")
      .setAuthor(data.username, message.author.displayAvatarURL)
      .setColor("#551A8B")
      // lifetime embed
      .addField("Life Time Matches:", lifeTimeMatches, true)
      .addField("Life Time Wins:", lifeTimeWins, true)
      .addField("Life Time K/D:", lifeTimeKD, true)
      // solo embed
      .addField("Solo Matches:", soloMatches, true)
      .addField("Solo Wins:", soloWins, true)
      .addField("Solo K/D:", soloKD, true)
      // duo embed
      .addField("Duo Matches:", duoMatches, true)
      .addField("Duo Wins:", duoWins, true)
      .addField("Duo K/D:", duoKD, true)
      // squad embed
      .addField("Squad Matches:", squadMatches, true)
      .addField("Squad Wins:", squadWins, true)
      .addField("Squad K/D:", squadKD, true)
      //current duo embed
      .addField("Current Duo Matches:", currentDuoMatches, true)
      .addField("Current Duo Wins:", currentDuoWins, true)
      .addField("Current Duo K/D:", currentDuoKD, true)
      //current duo embed
      .addField("Current Squad Matches:", currentSquadMatches, true)
      .addField("Current Squad Wins:", currentSquadWins, true)
      .addField("Current Squad K/D:", currentSquadKD, true);

    message.channel.send(embed);
  });
};

module.exports.help = {
  name: "fortnite"
};

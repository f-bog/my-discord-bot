const botSettings = require("./botsettings.json");
const Discord = require("discord.js");
const fs = require("fs");

const prefix = botSettings.prefix;

const bot = new Discord.Client({disableEveryone: true});

bot.commands = new Discord.Collection();

bot.mutes = require("./mutes.json");

fs.readdir("./cmds/", (err, files) => {
  if(err) console.error(err);

  let jsfiles = files.filter(f => f.split(".").pop() === "js");
  if(jsfiles.length <= 0) {
    console.log("no commands to load!");
    return;
  }

  console.log(`Loading ${jsfiles.length}`);

  jsfiles.forEach((f, i) => {
    let props = require(`./cmds/${f}`);
    console.log(`${i + 1}: ${f} loaded!`);
    bot.commands.set(props.help.name, props);
  });
});

bot.on("ready", async () => {
  console.log(`Bot is ready! ${bot.user.username}`);
  bot.user.setActivity("Cyndi Lauper - Girls Just Want To Have Fun", { type: 'LISTENING' });
  // try {
  //   let link = await bot.generateInvite(['ADMINISTRATOR']);
  //   console.log(link);
  // } catch (e) {
  //   console.log(e.stack);
  // }
  bot.setInterval(() => {
    for (let i in bot.mutes) {
      let time = bot.mutes[i].time;
      let guildId = bot.mutes[i].guild;
      let guild = bot.guilds.get(guildId);
      let member = guild.members.get(i);
      let mutedRole = guild.roles.find(r => r.name === "Apple in mouth");
      if(!mutedRole) continue;

      if(Date.now() > time) {
        console.log(`${i} is now able to be unmuted.`);
        member.removeRole(mutedRole);
        
        delete bot.mutes[i];

        fs.writeFile("./mutes.json", JSON.stringify(bot.mutes), err => {
          if (err) throw err;
          console.log(`I have unmuted ${member.user.tag}.`);
        });
      }
    }
  }, 5000)
});

bot.on("message", async message => {
  if(message.author.bot) return;
  if(message.channel.type === "dm") return;
  // trying to make a command to use movetube command 

  let messageTubeArr = message.content.split("/");
  if (messageTubeArr[0] !== "https:" && messageTubeArr[2] !== "www.youtube.com" && message.channel.name !== 'general') return; 


if (messageTubeArr[0] === "https:" && messageTubeArr[2] === "www.youtube.com" && message.channel.name === 'general')  {
      console.log(message.channel.name);
      await message.delete();
      bot.channels.get('358287796315750403').send("Sent By: " + message.author.username + "\n" + message.content);
  }
// youtube command end
  let messageArr = message.content.split(" ");
  let command = messageArr[0];
  let args = messageArr.slice(1);
  if(!command.startsWith(prefix)) return;
  let cmd = bot.commands.get(command.slice(prefix.length));
  if(cmd) cmd.run(bot, message, args);
});

bot.login(botSettings.token);
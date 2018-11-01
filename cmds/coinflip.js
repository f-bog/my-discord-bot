const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
function randomNumber(min, max) {
  let coinResults = Math.floor(Math.random() * (max - min + 1) ) + min;;
  if (coinResults === 0) {
    message.channel.send('Tails :heart:');
  } else {
    message.channel.send('Heads :heart:');
  }
}
randomNumber(0, 1);


  
} 

module.exports.help = {
  name: "coinflip"
}
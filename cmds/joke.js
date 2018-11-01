const api = "https://icanhazdadjoke.com/slack";
const fetch = require("node-fetch");
const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  fetch(api)
  .then(response => response.json())
  .then(json => message.channel.send(json.attachments[0].text));
  
} 

module.exports.help = {
  name: "joke"
}
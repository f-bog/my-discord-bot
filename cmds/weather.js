const Discord = require("discord.js");
const fetch = require("node-fetch");
const weather = require("weather-js");

module.exports.run = async (bot, message, args) => {
  let location = args[0] + ", " + args[1];
  weather.find({ search: location, degreeType: "C" }, function(err, result) {
    if (err) console.log(err);

    let locationName = result[0].location.name;
    let locationDegreeType = result[0].location.degreetype;
    let weatherText = result[0].current.skytext;
    let weatherTemp = result[0].current.temperature;
    let feelsLike = result[0].current.feelslike;
    let weatherImg = result[0].current.imageUrl;
    let windSpeed = result[0].current.windspeed;
    let humidity = result[0].current.humidity;
    let date = result[0].current.date;

    // console.log(locationName);
    let embed = new Discord.RichEmbed()
      .setColor("#0087ff")
      .setTitle("Current Weather For: " + locationName)
      .setThumbnail(weatherImg)
      .addField("Weather Date:", date)
      .addField(weatherText + ":", weatherTemp + " °C")
      .addField("But it feels like this: ", feelsLike + " °C")
      .addField("Humidity:", humidity)
      .addField("Wind Speed: ", windSpeed);

    message.channel.send(embed);
    console.log(weatherTemp);
    // console.log(JSON.stringify(result, null, 2));
  });
};

module.exports.help = {
  name: "weather"
};

exports.run = (client, message, flags) => {
  try {
  const cooldown = require('../modules/cooldown.js');
  cooldown(client, 'version', message.author.id, 2500);

  client.database.commands.version.runs = client.database.commands.version.runs + 1
  
  const Discord = require('discord.js');

  const versionEmbed = new Discord.MessageEmbed()
    .setTitle(`v${client.database.version.id}`)
    .setDescription(client.database.version.changeNotes)
    .setColor('#FFD300')
    .setFooter('Made by doinkythederp#6523');

  message.channel.send(versionEmbed)
  }catch(err){
    client.database.commands.version.fails = client.database.commands.version.fails + 1
    client.modules.presets.error(client, err, message, 'CommandNameHere');
  }
}

const version = (client) => {
  const Discord = require('discord.js');
}

const thisName = 'version';
const thisCooldown = 2500

exports.cooldown = (client) => {
  client.modules.cooldowns.set(thisName, thisCooldown);
}
exports.run = (client, message, flags) => {
  try {
  const cooldown = require('../modules/cooldown.js');
  cooldown(client, 'support', message.author.id, 2500);

  client.database.commands.support.runs = client.database.commands.support.runs + 1

  message.channel.send(support(message));

  }catch(err){
    client.database.commands.support.fails = client.database.commands.support.fails + 1
    client.presets.error(client, err, message, 'support');
  }
}

const support = (message) => {
  const Discord = require('discord.js');

  var embed = new Discord.MessageEmbed()
   .setTitle('Support')
   .setDescription('Hi! Are you having trouble with the bot? You can [click here](http://discord.gg/FdUSRm2E5J/) to join the support server and get help with it.')
   .setFooter(message.author.tag, `https://cdn.discordapp.com/avatars/${message.author.id}/${message.author.avatar}.png?size=64`)
   .setColor('#FFD300');

   return embed;
}

const thisName = 'support';
const thisCooldown = 2500

exports.cooldown = (client) => {
  client.modules.cooldowns.set(thisName, thisCooldown);
}

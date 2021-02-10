// Gets ping info
const getPing = (client, message) => {
  const Discord = require('discord.js');
  return new Discord.MessageEmbed()
    .setDescription(`<@!${message.author.id}> [Pong!](https://discord.com/channels/${message.guild.id}/${message.channel.id}/${message.id})\n**Latency:** ${Date.now() - message.createdTimestamp}ms\n**API:** ${client.ws.ping}ms`)
    .setColor('#FFD300');
}
// Sends "pong" without the bot's ping information
function pingSimple(client, message) {
  message.channel.send('Pong');
}

// Sends the bots ping information
function ping(client, message) {
  message.channel.send(getPing(client, message));
}
exports.run = (client, message, flags) => {
  try {
  const cooldown = require('../modules/cooldown.js');
  // Cooldown system
  cooldown(client, 'ping', message.author.id, 2500);

  client.database.commands.ping.runs = client.database.commands.ping.runs + 1

  if (flags.includes('-simple')) {
    return pingSimple(client, message)
  }else{
    return ping(client, message);
  };

  }catch(err){
    client.database.commands.ping.fails = client.database.commands.ping.fails + 1
    client.modules.presets.error(client, err, message, 'ping');
  };
}

const thisName = 'ping';
const thisCooldown = 2500

exports.cooldown = (client) => {
  client.modules.cooldowns.set(thisName, thisCooldown);
}
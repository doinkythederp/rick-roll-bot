const sleep = require('../modules/sleep.js');

const stop = async (message) => {
  if (message.guild.me.voice.channel) {
    await message.guild.me.voice.channel.leave();
    message.react("👍");
  } else {
    message.reply('I need to join a voice channel for me to disconnect from it!');
  }
};

const silentStop = async (message) => {
  if (message.guild.me.voice.channel) {
    if (message.guild.me.hasPermission('MANAGE_MESSAGES')) {message.delete()}
    else {message.react("👍");};
    await message.guild.me.voice.channel.leave();
  } else {
    message.reply('I need to join a voice channel for me to disconnect from it!');
  }
}

exports.run = (client, message, flags) => {
  try {
  const cooldown = require('../modules/cooldown.js');
  cooldown(client, 'stop', message.author.id, 5000);

  client.database.commands.stop.runs = client.database.commands.stop.runs + 1

  if (flags.includes('-silent')) {
      silentStop(message);
      client.database.commands.stop.silentRuns = client.database.commands.stop.silentRuns + 1
      }else {
        stop(message);
        client.database.commands.stop.loudRuns = client.database.commands.stop.loudRuns + 1
      };
  }catch(err){
    client.database.commands.stop.fails = client.database.commands.stop.fails + 1
    client.modules.presets.error(client, err, message, 'stop');
  }
}

const thisName = 'stop';
const thisCooldown = 5000

exports.cooldown = (client) => {
  client.modules.cooldowns.set(thisName, thisCooldown);
}

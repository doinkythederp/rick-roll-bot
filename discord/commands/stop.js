const sleep = require('../modules/sleep.js');

const stop = async (message, target) => {
  if (target.voice.channel) {
    await target.voice.channel.leave();
    message.react("👍");
  } else {
    if (message.member.id == target.id) {
    message.reply('you need to join a voice channel for me to disconnect from it!');
    }else {message.reply('they need to join a voice channel for me to disconnect from it!');}
  }
};

const silentStop = async (message, target) => {
    if (target.voice.channel) {
    if (message.guild.me.hasPermission('MANAGE_MESSAGES')) {message.delete()};
    await target.voice.channel.leave();
    message.react("👍");
  } else {
    if (message.member.id == target.id) {
    message.reply('you need to join a voice channel disconnect from it!');
    }else {message.reply('they need to join a voice channel for me to disconnect from it!');}
  }
}

exports.run = (client, message, flags) => {
  try {
  const cooldown = require('../modules/cooldown.js');
  cooldown(client, 'stop', message.author.id, 5000);

  client.database.commands.stop.runs = client.database.commands.stop.runs + 1

  if (flags.includes('-silent') && message.mentions.members.size == 0) {
    // Silent and no mention
    client.database.commands.stop.silentRuns = client.database.commands.stop.silentRuns + 1
    silentStop(message, message.member);
  }else if (flags.includes('-silent') && message.mentions.members.size !== 0) {
    // Silent with mention
    client.database.commands.stop.silentRuns = client.database.commands.stop.silentRuns + 1
    silentStop(message, message.mentions.members.first());
  } else if (!flags.includes('-silent') && message.mentions.members.size == 0) {
    // Loud with no mention
    client.database.commands.stop.loudRuns = client.database.commands.stop.loudRuns + 1
    stop(message, message.member);
  } else if (!flags.includes('-silent') && message.mentions.members.size !== 0) {
    // Loud with mention
    client.database.commands.stop.loudRuns = client.database.commands.stop.loudRuns + 1
    stop(message, message.mentions.members.first());
  }
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
const sleep = require('../modules/sleep.js');

const rickroll = async (message, target) => {
  if (target.voice.channel) {
    const connection = await target.voice.channel.join();
    connection.play('./resources/rickroll.mp3');
    console.log(`Rickrolling ${target.user.tag}.`)
    await message.react("🇷");
    await message.react("🇮");
    await message.react("🇨");
    message.react("🇰");
    await sleep(213000);
    connection.disconnect();
  } else {
    if (message.member.id == target.id) {
    message.reply('you need to join a voice channel first!');
    }else {message.reply('they need to join a voice channel first!');}
  }
};

const silentRickroll = async (message, target) => {
    if (target.voice.channel) {
    if (message.guild.me.hasPermission('MANAGE_MESSAGES')) {message.delete()};
    const connection = await target.voice.channel.join();
    connection.play('./resources/rickroll.mp3');
    console.log(`Silent Rickrolling ${target.user.tag}.`)
    await sleep(213000);
    connection.disconnect();
  } else {
    if (message.member.id == target.id) {
    message.reply('you need to join a voice channel first!');
    }else {message.reply('they need to join a voice channel first!');}
  }
}

exports.run = (client, message, flags) => {
  try {
  const cooldown = require('../modules/cooldown.js');
  cooldown(client, 'rickroll', message.author.id, 10000);

  client.database.commands.rickroll.runs = client.database.commands.rickroll.runs + 1

  if (flags.includes('-silent') && message.mentions.members.size == 0) {
    // Silent and no mention
    client.database.commands.rickroll.silentRuns = client.database.commands.rickroll.silentRuns + 1
    silentRickroll(message, message.member);
  }else if (flags.includes('-silent') && message.mentions.members.size !== 0) {
    // Silent with mention
    client.database.commands.rickroll.silentRuns = client.database.commands.rickroll.silentRuns + 1
    silentRickroll(message, message.mentions.members.first());
  } else if (!flags.includes('-silent') && message.mentions.members.size == 0) {
    // Loud with no mention
    client.database.commands.rickroll.loudRuns = client.database.commands.rickroll.loudRuns + 1
    rickroll(message, message.member);
  } else if (!flags.includes('-silent') && message.mentions.members.size !== 0) {
    // Loud with mention
    client.database.commands.rickroll.loudRuns = client.database.commands.rickroll.loudRuns + 1
    rickroll(message, message.mentions.members.first());
  }
  }catch(err){
    client.database.commands.rickroll.fails = client.database.commands.rickroll.fails + 1
    client.modules.presets.error(client, err, message, 'rickroll');
  }
}

const thisName = 'rickroll';
const thisCooldown = 10000

exports.cooldown = (client) => {
  client.modules.cooldowns.set(thisName, thisCooldown);
}
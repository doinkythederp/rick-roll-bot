exports.run = (client, message, args) => {
  try {
    const cooldown = require('../modules/cooldown.js');
    cooldown(client, thisName, message.author.id, thisCooldown);

    client.database.commands.eval.runs = client.database.commands.eval.runs + 1

    if (message.author.id == client.config.owner) {
    let code = args.join(' ');

    message.channel.send(evaluate(client, code, message));
    }else {
      message.channel.send('Rick says no.');
    };

  } catch (err) {
    client.database.commands.eval.fails = client.database.commands.eval.fails + 1
    client.modules.presets.error(client, err, message, thisName);
  }
}

const thisName = 'eval';
const thisCooldown = 0

exports.cooldown = (client) => {
  client.modules.cooldowns.set(thisName, thisCooldown);
}

const evaluate = (client, code, message) => {
  // If there's no code, don't continue.
  if (!code)
    return message.channel.send("No code specified.");

  let evl = 'FATAL_ERROR';
  
  const shutdown = require('../modules/shutdown.js');

  const timestamp = Date.now();

  try {
    evl = eval(code);
  } catch (e) {
    evl = e;
  }
  const Discord = require('discord.js');

  let evalEmbed = new Discord.MessageEmbed()
    .setColor('#FFD300')
    .addField('Input', '```js\n' + code + '\n```')
    .addField('Output', '```\n' + evl + '\n```')
    .setFooter('Time to evaluate: ' + (Date.now() - timestamp).toString() + 'ms');
    console.log(message.author.tag + ' 𝙄𝙉𝙋𝙐𝙏   ' + code + '\n' + message.author.tag + " 𝙊𝙐𝙏𝙋𝙐𝙏  " + evl + '\n----------------------------');
  return evalEmbed;
}
const reload = require('../modules/reload.js');

exports.run = (client, message, [target, ...flags]) => {
  try {
  const cooldown = require('../modules/cooldown.js');
  cooldown(client, 'reload', message.author.id, 2500);

  client.database.commands.reload.runs = client.database.commands.reload.runs + 1

  reload(client, message, target);

  }catch(err){
    client.database.commands.reload.fails = client.database.commands.reload.fails + 1
    client.modules.presets.error(client, err, message, 'reload');
  }
}

const thisName = 'reload';
const thisCooldown = 2500

exports.cooldown = (client) => {
  client.modules.cooldowns.set(thisName, thisCooldown);
}
exports.run = (client, message, flags) => {
  try {
    const cooldown = require('../modules/cooldown.js');
    cooldown(client, thisName, message.author.id, thisCooldown);

    client.database.commands.help.runs = client.database.commands.help.runs + 1

    // If it's the owner, set owner to true
    if (message.author.id == client.config.owner) { owner = true; } else { owner =  false};
    

    message.channel.send(help(client, message, flags, owner));

  } catch (err) {
    client.database.commands.help.fails = client.database.commands.help.fails + 1
    client.modules.presets.error(client, err, message, thisName);
  }
}

const help = (client, message, flags, owner) => {
  const Discord = require('discord.js');
  let helpEmbed = new Discord.MessageEmbed()
    .setTitle(client.user.username)
    .setDescription(`My prefix is \`${client.config.prefix}\``);

  client.database.commandList.forEach((category) => {
    // For each category, add a section
    // If everyone can access it, or admins can access it and they're an admin, or they're an owner, show it
    if (category.access == "*" || (client.config.admins.includes(message.author.tag) && category.access == 'admin' && !flags.includes('-normal')) || (owner && !flags.includes('-normal'))) {
    helpEmbed.addField(category.type, '–––––––––––––––––––––––––––––––––––––––––––––––');
    
      category.list.forEach((item) => {
        // For each command in a category, add a command listing
        helpEmbed.addField(`**${client.config.prefix}${item.usage}**`, item.desc);
      })
  };});

  helpEmbed.addField('Support', '–––––––––––––––––––––––––––––––––––––––––––––––\nIf you still need help with the bot, [click here to join our support server.](https://discord.gg/FdUSRm2E5J)');

  helpEmbed.setFooter("Made by doinkythederp#6523")
    .setColor('#FFD300');

  return helpEmbed
};

const thisName = 'help';
const thisCooldown = 2500

exports.cooldown = (client) => {
  client.modules.cooldowns.set(thisName, thisCooldown);
}
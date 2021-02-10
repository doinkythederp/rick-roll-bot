exports.error = (client, err, message, command) => {
  console.error(err);
  const Discord = require('discord.js');
  const errorEmbed = new Discord.MessageEmbed()
    .setTitle('Oops!')
    .setDescription(`**Looks like something went wrong.**\nHere's the information: \`\`\`${err}\`\`\``);
    if (message.guild.id == 808513251548594176) {
      errorEmbed.addField(`I've already informed the developer.`, `Looks like you're already in the support server.`);}else{
        errorEmbed.addField(`I've already informed the developer.`, `(It'll help a lot if you join the [support server](https://discord.gg/FdUSRm2E5J), though!)`);
      }
    errorEmbed.setFooter(message.author.tag, `https://cdn.discordapp.com/avatars/${message.author.id}/${message.author.avatar}.png?size=64`)
    .setColor('#FF1A00');
  const notifEmbed = new Discord.MessageEmbed()
    .setTitle('Error Report')
    .setDescription(`**Looks like something went wrong.**\nHere's the information: \`\`\`${err.stack}\`\`\``)
    .addField('Command:', command)
    .setAuthor(message.author.tag, `https://cdn.discordapp.com/avatars/${message.author.id}/${message.author.avatar}.png?size=64`)
    .setColor('#FF1A00');
  message.channel.send(errorEmbed);
  client.channels.fetch('808524442408845312')
    .then(channel => {
      channel.send(notifEmbed);
    });
};

exports.cooldown = (client, message, cooldown) => {
  const Discord = require('discord.js');
  const cooldownEmbed = new Discord.MessageEmbed()
    .setTitle('Oops!')
    .setDescription(`**That command's cooling down!**\nThe cooldown time for this command is: \`${cooldown / 1000}\` seconds. Try again later!`)
    .setFooter(message.author.tag, `https://cdn.discordapp.com/avatars/${message.author.id}/${message.author.avatar}.png?size=64`)
    .setColor('#FF1A00');
  
  return cooldownEmbed;
}
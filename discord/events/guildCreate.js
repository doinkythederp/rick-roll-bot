module.exports = (client, guild) => {
  const Discord = require('discord.js');
  const joinEmbed = new Discord.MessageEmbed()
    .setTitle(client.user.username)
    .setDescription(`Thanks for inviting ${client.user.tag}! The main commands you need to know are \`${client.config.prefix}rickroll\` and \`${client.config.prefix}stop\`. These cause me to immediately join or leave a voice channel. You can also suffix them with a mention so that I join their channel instead of yours when I'm rickrolling: \`${client.config.prefix}rickroll @${client.user.tag}\`.`);
    if (guild.me.hasPermission('MANAGE_MESSAGES')) {
      joinEmbed.addField('Looks like I have Manage Messages Permissions!', 'This means that the -silent tag on the rickroll command is enabled.');
    }else {
      joinEmbed.addField('Looks like I don\'t have Manage Messages Permissions.', 'This means that the -silent tag on the rickroll command is disabled.');
    };
    if (guild.icon !== null)  {
    joinEmbed.setFooter(guild.name, `https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.png?size=64`);
    }else {joinEmbed.setFooter(guild.name, `https://cdn.discordapp.com/avatars/804515880033714196/8637c71597683c1a691528b1841befed.png?size=64`);}
    joinEmbed.setColor('#FFD300');
    var targetChannels = guild.channels.cache.filter(channel => {

    var perms = channel.permissionsFor(client.user).toArray()
    if (channel.type == 'text' && perms.includes('SEND_MESSAGES') && perms.includes('EMBED_LINKS') && perms.includes('VIEW_CHANNEL')) {
      return true;
    }else {
      return false;
    }

  });
  if (!targetChannels) return;

  var channel = targetChannels.first()
  console.log(channel);
  channel.send(joinEmbed);
  console.log(`Joined new server: ${guild.name}`);
};

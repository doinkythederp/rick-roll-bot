
exports.run = (client, message, args) => {
  try {
    const cooldown = require('../modules/cooldown.js');
    cooldown(client, 'suggest', message.author.id, 100000);

    client.database.commands.suggest.runs = client.database.commands.suggest.runs + 1
    var suggestion = args.join(' ').trim();
    const Discord = require('discord.js');
    if (suggestion == '') {
      const noSuggestion = new Discord.MessageEmbed().setTitle('Suggest New Features/Report Bugs')
        .setDescription(`<@!${message.author.id}>` + ', You need to\nsuggest something to use this command!')
        .setColor('#FF1A00');


      message.channel.send(noSuggestion)

    } else {
      // Log that there's a new suggestion
      client.database.suggestions.count = client.database.suggestions.count + 1

      // Set variables
      // The author's avatar for the suggestion
      const authorAvatar = 'https://cdn.discordapp.com/avatars/' + message.author.id + '/' + message.author.avatar + '.png?size=64';

      const suggestEmbed = new Discord.MessageEmbed()
        .setAuthor('Suggestion #' + client.database.suggestions.count)
        .setDescription(suggestion)
        .setFooter('From ' + message.author.tag, authorAvatar)
        .setTimestamp()
        .setColor('#FFD300')

      // Get the suggestion channel
      client.channels.fetch(client.config.suggestChannel).then(channel => {




        // Send it to the suggestion channel
        channel.send(suggestEmbed)
          .then(async (suggestionMessage) => {
            message.channel.send('Suggestion Sent!')
            await suggestionMessage.react("<:yes:808923678631788554>");
            suggestionMessage.react("<:no:808923678653415445>");

            // The new suggestion, for the database
            const suggestionObj = {
              "content": suggestion,
              "author": message.author,
              "count": client.database.suggestions.count,
              "message": suggestionMessage.id
            }
            // Now put it in the database
            client.database.suggestions.list.push(suggestionObj);
          });
      })
    }

  } catch (err) {
    client.database.commands.suggest.fails = client.database.commands.suggest.fails + 1
    client.modules.presets.error(client, err, message, 'suggest');
  }
}

const thisName = 'suggest';
const thisCooldown = 100000

exports.cooldown = (client) => {
  client.modules.cooldowns.set(thisName, thisCooldown);
}
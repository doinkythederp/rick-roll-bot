module.exports = (client, message) => {
  if (message.author.bot) return;

  // sorry ghostoblivion, no dm rickrolls
  if (message.channel.type == "dm") return;
  
  // The bot's mention command is an alias of help command
  if (message.content == `<@!${client.user.id}>`) {message.content = `${client.config.prefix}help`;};

  // Ignore non-prefixed messages
  if (!message.content.startsWith(client.config.prefix)) return;

  // Set variable command to the command, args to the arguments
  var args = message.content
    .slice(client.config.prefix.length) // Remove the prefix from the message
    .trim() // Remove extra spaces from the message. Can get around this by adding a space to the prefix in config.json
    .split(/ +/g); // Regex for splitting by spaces
  var command = args
    .shift() // Remove and return number 1 (command)
    .toLowerCase(); // so that case doesn't matter, even on mobile where people aren't that good at typing 

  // Look for terms marked as aliases and change them to the correct command
  client.database.aliases.forEach((alias) => {
    if (alias[0] == command) {command = alias[1];};
  });
  
  // Fetch the command's code
  const commandCode = client.commands.get(command);

  // Only continue if what we fetched is actually a command
  if (!commandCode) return;

  // Prepare to handle a "hot" command (as in still on cooldown)
  const cooldown = client.modules.presets.cooldown;

  // Check if the user is on cooldown
  if (client.commandTimeouts.get(command).get(message.author.id) == true) return message.channel.send(cooldown(client, message, client.modules.cooldowns.get(command)));

  // Runs the function under exports.run for the given command
  try {
  commandCode.run(client, message, args);
  } catch(err) {
    client.modules.presets.error(client, err, message, command);
  }
};

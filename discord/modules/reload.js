const shutdown = require('./shutdown.js');

module.exports = (client, message, target) => {
  if (target == 'all' || target == 'events' || target == 'bot') {
    // React the the message then shutdown
    message.react('👍').then(() => {shutdown(client);})

  } else if (target == 'commands' || target == '' || !target) {
    // Reload all commands
    reloadCommands(client);
    message.channel.send('Reloaded all commands.');
  } else {
    // Check if the command is in the cache
    if (!client.commands.has(target)) {
      return message.reply("Command not cached - you may need to restart the bot.");
    }
    // Delete the command from the cache
    delete require.cache[require.resolve(`../commands/${target}.js`)];
    client.commands.delete(target);

    // Get the code for the command
    const commandExports = require(`../commands/${target}.js`);

    client.commands.set(target, commandExports);
    message.channel.send(`Reloaded command \`${target}\`.`);
    console.log(`Reloaded command \`${target}\`.`);
  };
}


const reloadCommands = (client) => {
  // Reloads the commands
  console.log('Reloading all Commands...');
  // Clear the require cache for the newest version
  delete require.cache

  const fs = require('fs');

  fs.readdir('./discord/commands', (err, files) => {
    if (err) return console.error(`Unable to fetch commands :\n${err}`)

    files.forEach(file => {
      // For each file found in the directory, run the following code, where "file" is the file's name:

      // Ignore non-js files and the reload file
      if (!file.endsWith(".js")) return;

      // Set the function and the name
      let commandExports = require(`../commands/${file}`);
      let commandName = file.split(".")[0];

      // Delete the command from the cache
      client.commands.delete(commandName);

      client.commands.set(commandName, commandExports);

      console.log(`Reloaded ${commandName}`);
    });
  });

}
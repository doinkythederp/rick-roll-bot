module.exports = (client, commandName, targetID, cooldownMS) => {
  if (!client.commandTimeouts.has(commandName)) return console.error(`Couldn't find command ${commandName} in the list of command cooldowns.`);
  client.commandTimeouts.get(commandName).set(targetID, true);
  setTimeout(() => {
    client.commandTimeouts.get(commandName).set(targetID, false);
  }, cooldownMS);
}
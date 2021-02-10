module.exports = (client) => {

  const chalk = client.chalk;

  console.groupCollapsed('Loaded Events:');
  console.table(client.events.keys());
  console.groupEnd();

  console.groupCollapsed('Loaded Commands:');
  console.table(client.commands.keys());
  console.groupEnd();

  console.info(`Logged in as ${chalk.inverse(client.user.tag)}, serving ${client.guilds.cache.size} guild(s).`);
};

const manageCache = (client) => {
  client.setInterval(() => {
    try {
      const messagesCleared = client.sweepMessages(1800);
    } catch{ console.error(`Unable to clear message cache: ${err}`); }
  }, 20000);
}

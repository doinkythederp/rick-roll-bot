// Import packages
const Discord = require('discord.js');
const client = new Discord.Client({ partials: ['MESSAGE', 'CHANNEL', 'REACTION'] })
const fs = require('fs');

// Set variables
client.commands = new Discord.Collection();
client.events = new Discord.Collection();
client.config = require('./config.json');
client.commandTimeouts = new Map();
client.database = require('./database.json');
client.chalk = require('chalk');
client.modules = new Object();
client.modules.cooldowns = new Discord.Collection();
client.modules.presets = require('./discord/modules/presets.js');
const chalk = client.chalk;
const npm = require('./package.json');

if (npm.version !== client.database.version.id) console.warn(chalk.bgOrange('WARN') + ' NPM version ID does not match database version ID.');

// Keep stored database up-to-date
setInterval(() => {
  fs.writeFileSync('./database.json', JSON.stringify(client.database, null, 2));
}, 1000);

// Web server so you can check uptime
const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => res.send('Bot online!'));

app.listen(port, () =>
  console.log(`Web server online.`)
);

// Bot startup sequence starts here
console.log('Bot starting...');

// Event Listener
console.log('Loading Events...');
fs.readdir('./discord/events/', (err, files) => {
  if (err) return console.error(`Unable to fetch events :\n${err.trace}`)

  files.forEach(file => {
    // For each file found in the directory, run the following code, where "file" is the file's name:

    // Ignore non-js files
    if (!file.endsWith(".js")) return;

    // Copy the function over to this variable, while also sending the correct arguments and the client variable to the function
    // event.bind(null, client) copies the entire function over, then sets it to automatically prepend client to its list of args it recieves.
    let eventFunction = require(`./discord/events/${file}`);

    // Get event name, so we know which event this actually is
    let eventName = file.split('.')[0];

    client.on(eventName, eventFunction.bind(null, client));
    client.events.set(eventName, eventFunction.bind(null, client).toString());
  });
});

// Command Listener
console.log('Fetching Commands...');
fs.readdir('./discord/commands/', (err, files) => {
  if (err) return console.error(`Unable to fetch commands :\n${err.trace}`)

  files.forEach(file => {
    // For each file found in the directory, run the following code, where "file" is the file's name:

    // Ignore non-js files
    if (!file.endsWith(".js")) return;

    // Like in the events listener, set the function and the name
    let commandExports = require(`./discord/commands/${file}`);
    let commandName = file.split(".")[0];

    // Set the cooldown to the main list
    commandExports.cooldown(client);

    client.commandTimeouts.set(commandName, new Map())

    // Load the actual command to the client.commands collection
    client.commands.set(commandName, commandExports);
  });
});



if (process.env.DISCORD_TOKEN) {
  client.login();
} else { throw new Error('No token specified in env file.') }
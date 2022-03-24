const { Client } = require('discord.js');
const loadEvents = require('./handlers/events');
const loadCommands = require('./handlers/commands');
const { existsSync } = require('fs');
const { resolve } = require('path');

if (existsSync(resolve('./.env'))) {
  require('dotenv').config();
}

const client = new Client({
  intents: ['GUILDS', 'GUILD_MESSAGES', 'GUILD_MEMBERS'],
});

const init = async () => {
  await loadCommands(client);
  loadEvents(client);
  client.login(process.env.TOKEN);
};

module.exports = init;

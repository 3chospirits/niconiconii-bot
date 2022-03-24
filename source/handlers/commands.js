const { readdirSync } = require('fs');
const { Collection } = require('discord.js');
const { resolve } = require('path');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v10');
const { display } = require('../util/functions');
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = async (client) => {
  client.commands = new Collection();
  const slash = [];
  const commandFolders = readdirSync(resolve('./source/commands'));

  commandFolders.forEach((commandFolder) => {
    const commandFiles = readdirSync(
      resolve(`./source/commands/${commandFolder}`)
    );

    commandFiles.forEach((commandFile) => {
      if (!commandFile.endsWith('.js')) return;

      const { data, run } = require(resolve(
        `./source/commands/${commandFolder}/${commandFile}`
      ));

      const { commands } = client;

      if (data instanceof SlashCommandBuilder) {
        commands.set(data.name, { run, ...data });
        slash.push(data.toJSON());
      }
    });
  });

  const rest = new REST({ version: '9' }).setToken(process.env.TOKEN);

  try {
    await rest.put(
      Routes.applicationGuildCommands(
        process.env.CLIENT_ID,
        process.env.GUILD_ID
      ),
      {
        body: slash,
      }
    );
  } catch (error) {
    if (error instanceof Error) {
      display(`${error.message}\nin ${__dirname}`, 'error');
    }
  }
};

const { Collection } = require("discord.js");
const { getFiles } = require("../util/functions");
const { clientId, guildId } = require("../config.json");
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");

module.exports = async (client) => {
  const commands = [];
  client.slashcommands = new Collection();

  const slashcommands = getFiles("slashcommands", ".js");
  if (slashcommands.length === 0) throw "No slash commands provided";

  slashcommands.forEach((slashcommandsFile) => {
    const slashcmd = require(`../slashcommands/${slashcommandsFile}`);
    if (slashcmd.name && typeof slashcmd.name === "string") {
      commands.push(slashcmd.data.toJSON());
      client.slashcommands.set(slashcmd.name, slashcmd);
    } else {
      throw new TypeError(
        [
          `The slash command: ${slashcommandsFile} failed to load`,
          "because it doesn't have a name property`",
        ].join(" ")
      );
    }
  });

  const rest = new REST({ version: "9" }).setToken(process.env.TOKEN);

  try {
    await rest.put(Routes.applicationGuildCommands(clientId, guildId), {
      body: commands,
    });
  } catch (error) {
    console.error(error);
  }
};

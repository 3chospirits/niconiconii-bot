const { Collection } = require("discord.js");
const { getFiles } = require("../util/functions");

module.exports = (client) => {
  client.slashcommands = new Collection();

  console.log("Getting slash command data");
  const slashcommands = getFiles("./slashcommands/", ".js");

  if (slashcommands.length === 0) throw "No slash commands provided";

  console.log("inserting slash command data into collection");
  slashcommands.forEach((slashcommandsFile) => {
    const slashcmd = require(`../slashcommands/${slashcommandsFile}`);

    if (slashcmd.name && typeof slashcmd.name === "string") {
      console.log(`[SLASH] Successfully loaded: ${slashcommandsFile}`);
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
};

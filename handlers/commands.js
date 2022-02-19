const { getFiles } = require("../util/functions");
const { readdirSync } = require("fs");
const { Collection } = require("discord.js");

module.exports = (client) => {
  client.commands = new Collection();
  console.log("Getting the command categories");
  const categories = readdirSync("commands");

  console.log("Asserting commands data dynamically into collection");
  categories.forEach((category) => {
    const commands = getFiles(`commands/${category}`, ".js");

    commands.forEach((commandFile) => {
      const command = require(`../commands/${category}/${commandFile}`);

      if (command.name && typeof command.name === "string") {
        console.log(`[COMMAND] Successfully loaded: ${commandFile}`);
        client.commands.set(command.name, command);
      } else {
        throw new TypeError(
          [
            `The command: ${commandFile} failed to load`,
            "because it doesn't have a name property`",
          ].join(" ")
        );
      }
    });
  });
};

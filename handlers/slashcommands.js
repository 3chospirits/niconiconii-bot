const { getFiles } = require("../util/functions");

module.exports = (client) => {
  const slashcommands = getFiles("./slashcommands/", ".js");

  if (slashcommands.length === 0) throw "No slash commands provided";

  slashcommands.forEach((slashcommandsFile) => {
    const slashcmd = require(`../slashcommands/${f}`);

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

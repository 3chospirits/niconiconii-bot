const { getFiles } = require("../util/functions");
const { Collection } = require("discord.js");

module.exports = (client) => {
  client.buttons = new Collection();
  console.log("Getting buttons data");
  const buttons = getFiles("buttons", ".js");

  if (buttons.length === 0) throw "No buttons available to load";

  console.log("Inserting buttons data into collection");
  buttons.forEach((buttonFile) => {
    const button = require(`../buttons/${file}`);

    if (button.name && typeof button.name === "string") {
      console.log(`[BUTTON] Successfully loaded: ${buttonFile}`);
      client.buttons.set(button.name, button);
    } else {
      throw new TypeError(
        [
          `The button: ${buttonFile} failed to load`,
          "because it doesn't have a name property`",
        ].join(" ")
      );
    }
  });
};

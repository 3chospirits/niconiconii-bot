const { getFiles } = require("../util/functions");
const { Collection } = require("discord.js");

module.exports = (client) => {
  client.buttons = new Collection();
  const buttons = getFiles("buttons", ".js");

  if (buttons.length === 0) throw "No buttons available to load";

  buttons.forEach((buttonFile) => {
    const button = require(`../buttons/${buttonFile}`);

    if (button.name && typeof button.name === "string") {
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

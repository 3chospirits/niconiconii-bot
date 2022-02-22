const { Collection } = require("discord.js");
const { getFiles } = require("../util/functions");

module.exports = (client) => {
  client.events = new Collection();
  let events = getFiles("./events/", ".js");

  if (events.length === 0) throw "No events was provided";

  events.forEach((eventFile) => {
    const event = require(`../events/${eventFile}`);

    if (event.name && typeof event.name === "string") {
      client.events.set(event.name, event);
    } else {
      throw new TypeError(
        `The event: ${eventFile} failed to load because it doesn't have a name property`
      );
    }

    client.on(event.name, (...args) => event.run(...args));
  });
};

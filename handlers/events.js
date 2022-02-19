const { getFiles } = require("../util/functions");

module.exports = (bot) => {
  const { client } = bot;
  console.log("Getting the client's events");
  let events = getFiles("./events/", ".js");

  if (events.length === 0) throw "No events was provided";

  console.log("Inserting events data into collection");
  events.forEach((eventFile, index) => {
    const event = require(`../events/${eventFile}`);

    if (event.name && typeof eventy.name === "string") {
      client.events.set(event.name, event);
      console.log(`[EVENT] Successfully loaded: ${eventFile}`);
    } else {
      throw new TypeError(
        `The event: ${eventFile} failed to load because it doesn't have a name property`
      );
    }
  });
};

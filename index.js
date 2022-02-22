const Discord = require("discord.js");
require("dotenv").config();

const client = new Discord.Client({
  intents: ["GUILDS", "GUILD_MESSAGES", "GUILD_MEMBERS"],
});

const init = async () => {
  const handlers = Object.values(require("./handlers/index"));
  for (const handler of handlers) {
    handler(client);
  }
};

init();

client.login(process.env.TOKEN);

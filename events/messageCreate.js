const { prefix, owners } = require("../config.json");

module.exports = {
  name: "messageCreate",
  run: async function run(message) {
    const isInvalidUser = () => {
      return (
        !message.guild ||
        message.author.bot ||
        !message.content.startsWith(prefix)
      );
    };

    const { member, client } = message;

    if (isInvalidUser()) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const commandPrompt = args.shift().toLowerCase();

    let command = client.commands.get(commandPrompt);
    if (!command) return;

    if (command.devOnly && !owners.includes(member.id)) {
      return message.reply("This command is only available to the bot owners");
    }

    if (
      command.permissions &&
      member.permissions.missing(command.permissions).length !== 0
    ) {
      return message.reply("You do not have permission to use this command");
    }

    await command.run({
      message,
      args,
      client,
    });
  },
};

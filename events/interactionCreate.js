module.exports = {
  name: "interactionCreate",
  run: async (interaction) => {
    const { client } = interaction;

    switch (true) {
      case interaction.isCommand():
        handleSlashCommand(interaction);
        break;
      case interaction.isButton():
        handleButton(interaction);
        break;
      default:
        interaction.reply({
          content: "This interaction cannot be used yet",
        });
        break;
    }
  },
};

const handleButton = (interaction) => {
  const { client } = interaction;
  const [name, ...params] = interaction.customId.split("-");
  const button = client.buttons.get(name);
  if (!button) return;

  button.run({
    interaction,
    params,
    client,
  });
};

const handleSlashCommand = (interaction) => {
  const { client } = interaction;

  if (!interaction.inGuild()) {
    return interaction.reply({
      content: "This interaction cannot be used outside of a guild",
    });
  }

  const slashcmd = client.slashcommands.get(interaction.commandName);

  if (!slashcmd) return;
  if (slashcmd.perms && !interaction.member.permissions.has(slashcmd.perms)) {
    return interaction.reply({
      content: "You don't have permissions to use that command",
    });
  }

  const options = [];
  interaction.options.data.forEach((option) => {
    if (option.type === "USER") {
      options.push(option.member, option.user);
      return;
    }
    options.push(option.value);
  });

  slashcmd.run({
    interaction,
    options,
    client,
  });
};

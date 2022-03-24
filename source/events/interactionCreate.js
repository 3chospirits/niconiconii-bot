module.exports = {
  name: 'interactionCreate',
  run: async (interaction) => {
    switch (true) {
      case interaction.isCommand():
        await handleSlashCommand(interaction);
        break;
      default:
        interaction.reply({
          content: 'This interaction cannot be used yet',
        });
        break;
    }
  },
};

const handleSlashCommand = async (interaction) => {
  const { client } = interaction;

  if (!interaction.inGuild()) {
    return interaction.reply({
      content: 'This interaction cannot be used outside of a guild',
    });
  }

  const slashcmd = client.commands.get(interaction.commandName);

  if (!slashcmd) return;

  await slashcmd.run({
    interaction,
  });
};

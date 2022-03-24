const { SlashCommandBuilder } = require('@discordjs/builders');

const run = ({ interaction }) => {
  return interaction.reply({
    content: 'pong',
  });
};

const data = new SlashCommandBuilder()
  .setName('ping')
  .setDescription('it pongs you');

module.exports = { data, run };

const { SlashCommandBuilder } = require("@discordjs/builders");

const data = new SlashCommandBuilder()
  .setName("ban")
  .setDescription("bans a server member")
  .addUserOption((option) =>
    option
      .setName("ban")
      .setDescription("select the user to ban")
      .setRequired(true)
  )
  .addStringOption((option) =>
    option
      .setName("reason")
      .setDescription("select the user to ban")
      .setRequired(true)
  );

const run = async ({ interaction, options }) => {
  const [member, user, reason] = options;
  if (!member.bannable) {
    return interaction.reply({
      content: `Cannot ban ${user.tag}`,
    });
  }
  try {
    await member.ban({ reason });
    interaction.reply({
      ephemeral: true,
      content: `${user.tag} have been successfully banned from the server`,
    });
  } catch (err) {
    console.log(err);
    interaction.reply({
      ephemeral: true,
      content: `Couldn't ban ${user.tag}`,
    });
  }
};

module.exports = {
  data,
  name: "ban",
  run,
};

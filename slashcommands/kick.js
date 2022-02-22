const { SlashCommandBuilder } = require("@discordjs/builders");

const data = new SlashCommandBuilder()
  .setName("kick")
  .setDescription("kicks a server member")
  .addUserOption((option) => {
    option.setName("user");
    option.setDescription("select the user to kick");
    option.setRequired(true);
    return option;
  })
  .addStringOption((option) => {
    option.setName("reason");
    option.setDescription("reason of the kick");
    option.setRequired(false);
    return option;
  });

const run = async ({ interaction, options }) => {
  const [member, user, reason] = options;
  try {
    await member.kick(reason);
    return interaction.reply(`${user.tag} has been kicked for *${reason}*`);
  } catch (err) {
    return interaction.reply(`Failed to kick ${user.tag}`);
  }
};

module.exports = {
  name: "kick",
  data,
  run,
};

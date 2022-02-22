const { SlashCommandBuilder } = require("@discordjs/builders");

const data = new SlashCommandBuilder()
  .setName("timeout")
  .setDescription("timeout an use")
  .addUserOption((option) => {
    option.setName("user");
    option.setDescription("the user to timeout");
    option.setRequired(true);
    return option;
  })
  .addNumberOption((option) => {
    option.setName("duration");
    option.setDescription("the duration of the timeout");
    option.addChoices([
      ["60 seconds", 60 * 1000],
      ["5 minutes", 5 * 60 * 1000],
      ["10 minutes", 10 * 60 * 1000],
      ["30 minutes", 30 * 60 * 1000],
      ["1 hour", 60 * 60 * 1000],
      ["1 week", 7 * 24 * 60 * 60 * 1000],
      ["1 day", 24 * 60 * 60 * 1000],
    ]);
    option.setRequired(true);
    return option;
  })
  .addStringOption((option) => {
    option.setName("reason");
    option.setDescription("the reason of the timeout");
    option.setRequired(true);
    return option;
  });

const run = async ({ interaction, options }) => {
  const [member, user, timeout, reason] = options;
  const importantMember = member.permissions.has("MANAGE_GUILD", true);
  if (importantMember) {
    interaction.reply({ content: "member cannot be timed out" });
    return;
  }

  try {
    const durations = [
      { name: "60 seconds", value: 60 * 1000 },
      { name: "5 minutes", value: 5 * 60 * 1000 },
      { name: "10 minutes", value: 10 * 60 * 1000 },
      { name: "30 minutes", value: 30 * 60 * 1000 },
      { name: "1 hour", value: 60 * 60 * 1000 },
      { name: "1 day", value: 24 * 60 * 60 * 1000 },
      { name: "1 week", value: 7 * 24 * 60 * 60 * 1000 },
    ];

    let targetDuration;
    durations.forEach((duration) => {
      if (duration.value !== timeout) return;
      targetDuration = duration;
    });
    await member.timeout(timeout, reason);
    interaction.reply({
      content: `Timed out the user for ${targetDuration.name}`,
    });
  } catch (error) {
    console.error(error);
    interaction.reply({
      ephemeral: true,
      content: `Failed to timeout ${user.tag}`,
    });
  }
};

module.exports = {
  name: "timeout",
  data,
  run,
};

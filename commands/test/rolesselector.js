const { MessageActionRow, MessageButton, MessageEmbed } = require("discord.js");

module.exports = {
  name: "rolesselector",
  category: "test",
  run: async ({ message }) => {
    const roleSelectorEmbed = new MessageEmbed()
      .setTitle("Select Role")
      .setDescription("Select roles from the buttons below")
      .setColor("BLUE");

    const roleButtons = new MessageActionRow();
    roleButtons.addComponents([
      new MessageButton()
        .setCustomId("role-935243920177242122")
        .setStyle("PRIMARY")
        .setLabel("5"),
    ]);

    message.channel.send({
      embeds: [roleSelectorEmbed],
      components: [roleButtons],
    });
  },
};

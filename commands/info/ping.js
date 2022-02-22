module.exports = {
  name: "ping",
  description: "it pongs a ping",
  category: "info",
  run: async ({ message }) => {
    message.channel.send({ content: "ping yay" });
  },
};

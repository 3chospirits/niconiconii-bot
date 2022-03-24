module.exports = {
  name: "ready",
  run: async (client) => {
    console.log(`Logged in as ${client.user.username}`);
  },
};

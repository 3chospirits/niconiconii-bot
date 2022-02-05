module.exports = {
	name: "interactionCreate",
	run: async (bot, interaction) => {
        const {client} = bot
		if (!interaction.isCommand()) return
		if (!interaction.inGuild()) return interaction.reply("This command can only be used in a guild")

		const slashcmd = client.slashcommands.get(interaction.commandName)

		if (!slashcmd) return

		// check permissions
		if (slashcmd.perms && !interaction.member.permissions.has(slashcmd.perms))
			return interaction.reply("You do not have permission to use this command")

		slashcmd.run(client, interaction)
	},
}

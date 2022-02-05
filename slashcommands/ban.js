const run = async (client, interaction) => {
	let user = interaction.options.getUser("user")
	let reason = interaction.options.getString("reason") || "No reason given"

	if (!user) return interaction.reply("You must provide a user to ban")

	// ban
	try {
		await interaction.guild.bans.create(user, {
			reason,
		})
		return interaction.reply(`${user.tag} has been banned for *${reason}*`)
	} catch (e) {
		if (e) {
			console.error(e)
			return interaction.reply(`Failed to ban ${user.tag}`)
		}
	}
}

module.exports = {
	name: "ban",
	description: "Bans a user from the server.",
	perms: "BAN_MEMBERS",
	options: [
		{ name: "user", description: "The user to ban.", type: "USER", required: true },
		{
			name: "reason",
			description: "reason for the punishment.",
			type: "STRING",
			required: false,
		},
	],
	run,
}

const fs = require("fs")

const getFiles = (path, ending) => {
	return fs.readdirSync(path).filter((f) => f.endsWith(ending))
}

module.exports = (bot, reload) => {
	const { client } = bot

	let buttons = getFiles("./buttons/", ".js")

	if (buttons.legnth === 0) {
		console.log("No buttons to load")
	}

	buttons.forEach((f, i) => {
		if (reload) delete require.cache[require.resolve(`../buttons/${f}`)]
		const button = require(`../buttons/${f}`)

		client.buttons.set(button.name, button)
	})
}

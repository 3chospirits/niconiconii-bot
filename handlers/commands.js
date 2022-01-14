const { getFiles } = require("../util/functions")
const fs = require("fs")

module.exports = (bot, reload) => {
    const {client} = bot 

    fs.readdirSync("./commands/").forEach((category) => {
        let commands = getFiles(`./commands/${category}`, ".js")

        commands.forEach((f) => {
            if (reload)
                delete require.cache[require.resolve(`../commands/${category}/${f}`)]
            const command = require(`../commands/${category}/${f}`)
            client.commands.set(command.name, command)
        })
    })
    console.log(`Loaded ${client.commands.size} commands`)
}
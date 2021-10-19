const { token } = require('./config.json')
const { Client, Intents } = require("discord.js")

const app = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.DIRECT_MESSAGES] })

app.once("ready", () => {
    console.log("Estou pronto")
})

app.on("interactionCreate", async interaction => {
    if (!interaction.isCommand()) return;

    const { commandName } = interaction
    switch (commandName) {
        case "ping":
            await interaction.reply("pong!")
            break;
        case "server":
            await interaction.reply(`voce esta no servidor: ${interaction.member.guild}
            e esta logado como: ${interaction.member.user.username}
            `)
            break;
        case "play":
            await interaction.reply("vou toca uma musica")
            break;
    }
})

app.login(token)
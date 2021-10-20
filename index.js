const { token } = require('./config.json')
const { Client, Intents } = require("discord.js")
const { joinVoiceChannel, getVoiceConnection } = require("@discordjs/voice")

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

function COnectionTochanel(type, channelId, guildId, Voice) {
    const connection = joinVoiceChannel({
        channelId: channelId,
        guildId: guildId,
        adapterCreator: Voice,
        selfMute: false,
    })
    console.log("sucesso")
    console.log("sucesso")

    if (type === "delete") {
        connection.disconnect()
        connection.destroy()
    }
}

function handlePlay(e) {
    getVoiceConnection(e)
}

app.on("messageCreate", msg => {
    if (msg.content === "!join") {
        COnectionTochanel(null, msg.member.voice.channel.id, msg.guild.id, msg.guild.voiceAdapterCreator)
    }
    else if (msg.content === "!dis") {
        COnectionTochanel("delete", msg.member.voice.channel.id, msg.guild.id, msg.guild.voiceAdapterCreator)
    }
    else if (msg.content === '!play')
        handlePlay(msg.member.voice.guild.id)
})

app.login(token)
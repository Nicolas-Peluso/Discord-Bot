const { token } = require("./config.json")
const { Client, Intents } = require("discord.js")
const { VoiceConectionMain } = require("./VoiceConection.js")
const Cliente = new Client({ intents: 32767 })

const Voice = VoiceConectionMain

Cliente.on("ready", () => console.log("cliente esta logado"))

Cliente.on("messageCreate", async msg => {

    if (msg.content == "!join") {
        if (msg.member.voice.channel) {
            Voice.Adapter = msg.guild.voiceAdapterCreator
            Voice.channelId = msg.member.voice.channel.id
            Voice.GuildId = msg.guild.id
            await Voice.MakeConection()
        }
        else
            msg.reply("Voce deve estar em um canal de voz ")
    }

    if (msg.content == "!dis") {
        Voice.MakeConection("delete")
    }

    if (msg.content == "!play") {
        Voice.MakeConection("play")
    }
})

Cliente.on("error", (erro) => console.log(erro))

Cliente.login(token)
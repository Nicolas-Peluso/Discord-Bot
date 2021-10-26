const { token, start } = require("./config.json")
const { Client, Intents, MessageActionRow } = require("discord.js")
const { VoiceConectionMain } = require("./VoiceConection.js")
const myIntents = new Intents();
myIntents.add(
    Intents.FLAGS.GUILDS,
    "GUILD_VOICE_STATES",
    "DIRECT_MESSAGES",
    "GUILD_MESSAGES")

const Cliente = new Client({ intents: myIntents })
const Voice = VoiceConectionMain
exports.cliente = Cliente

Cliente.once("ready", () => console.log("cliente esta logado"))

Cliente.on("messageCreate", async msg => {
    const voiceChannel = msg.member.voice.channel
    if (voiceChannel) {
        if (msg.content === `${start}join`) {
            Voice.Adapter = voiceChannel.guild.voiceAdapterCreator
            Voice.channelId = voiceChannel.id
            Voice.GuildId = voiceChannel.guild.id
            Voice.MakeConection()
        }
        else if (msg.content === `${start}dis`) {
            Voice.Disconnect()
        }

        else if (msg.content.startsWith(`${start}play `)) {
            let OqueTocar = msg.content.replace("!play ", "")
            Voice.Play(OqueTocar)
        }

        else if (msg.content === `${start}pause`) {
            Voice.Pause()
        }
        else if (msg.content === `${start}resume`) {
            Voice.Resume()
        }
        else if (msg.content === `${start}stop`) {
            Voice.Stop()
        }
    }
    else if (msg.content.startsWith(start)) msg.reply("voce deve estar em uma conexão de voz")
})

Cliente.on("error", (erro) => console.log(erro))

Cliente.login(token)
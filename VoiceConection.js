const {
    joinVoiceChannel,
    VoiceConnectionStatus,
    createAudioPlayer,
    createAudioResource,
    AudioPlayerStatus } = require('@discordjs/voice')

class VoiceConectionMain {
    constructor(ChanelId, GuildId, Adapter) {
        this.channelId = ChanelId
        this.GuildId = GuildId
        this.Adapter = Adapter

        this.player = createAudioPlayer()
        this.resource = createAudioResource("https://cdn.discordapp.com/attachments/900060587143364641/901418545261461574/risadas.mp3")
    }
    async MakeConection(Type) {
        try {
            VoiceConnectionStatus.Connecting
            let conection = joinVoiceChannel({
                channelId: this.channelId,
                guildId: this.GuildId,
                adapterCreator: this.Adapter,
                selfMute: false,

            }
            )

            if (Type === "delete") {
                conection.disconnect()
                conection.destroy()
                VoiceConnectionStatus.Destroyed
                console.log("conexão encerrada com sucesso")
            }
            if (Type === "play") {
                this.player.play(this.resource)
                conection.subscribe(this.player)

                this.player.on(AudioPlayerStatus.Idle, () => {
                    conection.destroy()
                })
            }
        }

        catch (e) {
            console.log("algum erro", e)
        }
    }
}

exports.VoiceConectionMain = new VoiceConectionMain()
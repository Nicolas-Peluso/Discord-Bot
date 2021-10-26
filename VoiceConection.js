const {
    joinVoiceChannel,
    createAudioPlayer,
    createAudioResource,
    AudioPlayerStatus,
    getVoiceConnection,
    VoiceConnectionStatus

} = require('@discordjs/voice')
const Ytdl = require("ytdl-core")

class VoiceConectionMain {
    constructor(ChanelId, GuildId, Adapter) {
        this.channelId = ChanelId
        this.GuildId = GuildId
        this.Adapter = Adapter

        this.player = createAudioPlayer()
        this.conection1;
    }
    MakeConection() {
        try {
            joinVoiceChannel({
                channelId: this.channelId,
                guildId: this.GuildId,
                adapterCreator: this.Adapter,
            }
            )
            this.conection1 = getVoiceConnection(this.GuildId)
        } catch (e) {
            return console.log("client refused")
        }
    };

    Disconnect() {
        if (!!this.conection1) {
            this.conection1.disconnect()
            this.conection1.destroy()
            console.log("conexão encerrada")
        } else {
            console.log("voce deve estar em uma conexão de voz para sair dela")
        }
    }

    Play(oQueTocar) {
        if (!!this.conection1) {
            if (Ytdl.validateURL(oQueTocar)) {
                let resource = createAudioResource(Ytdl(oQueTocar, { filter: "audioonly" }))
                this.player.play(resource)
                this.conection1.subscribe(this.player)
            } else return console.log("a url nao esta batendo tente novamente")
        } else return console.log("voce deve estar em um canal de audio para usar essa opção")


        this.player.on(AudioPlayerStatus.Idle, () => {
            this.player.stop()
        })
    }

    Pause() {
        if (!!VoiceConnectionStatus.Ready)
            this.player.pause()
        return console.log("voce deve estar ouvindo uma musica para pausa-la")
    }

    Resume() {
        if (!!VoiceConnectionStatus.Ready)
            this.player.unpause()
        return console.log("voce deve estar ouvindo uma musica para continuar ouvindo")
    }

    Stop() {
        if (!!VoiceConnectionStatus.Ready)
            this.player.stop()
        return console.log("voce deve estar ouvindo uma musica para parar de ouvila")
    }
}

exports.VoiceConectionMain = new VoiceConectionMain()
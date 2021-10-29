const {
    joinVoiceChannel,
    createAudioPlayer,
    createAudioResource,
    AudioPlayerStatus,
    getVoiceConnection,
} = require('@discordjs/voice')
const Ytdl = require("ytdl-core")

class VoiceConectionMain {
    constructor(ChanelId, GuildId, Adapter) {
        this.channelId = ChanelId
        this.GuildId = GuildId
        this.Adapter = Adapter

        this.player = createAudioPlayer()
        this.conection1;
        this.ListMusic = [];
        this.WasPlayingSomethink = false
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
            return console.log("algo deu errado durante a conexão", e)
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

    Play(oQueTocar = null) {
        if (!!oQueTocar)
            this.ListMusic.push(oQueTocar)
        if (!!this.conection1) {

            this.player.once(AudioPlayerStatus.Playing, () => {
                this.WasPlayingSomethink = true
            })

            if (Ytdl.validateURL(this.ListMusic[0]) && !!this.WasPlayingSomethink == false) {
                let resource = createAudioResource(Ytdl(this.ListMusic[0], { filter: "audioonly" }))
                this.player.play(resource)
                this.conection1.subscribe(this.player)

            } else if (!!this.WasPlayingSomethink) return console.log("a musica foi adicionada a fila ")

            else return console.log("a url nao esta valida tente novamente verifique a mesma ou tente com outra ")

            this.player.once(AudioPlayerStatus.Idle, () => {
                this.WasPlayingSomethink = false

                if (this.ListMusic.length > 1) {
                    this.Stop()
                    this.ListMusic.shift()
                    console.log(this.ListMusic)
                    this.Play()
                } else console.log("todas as musicas foram encerrado voce pode adicionar mais")
            }
            )

        } else return console.log("voce deve estar em um canal de audio para usar essa opção")
    }

    Pause() {
        if (this.WasPlayingSomethink)
            this.player.pause()
        else
            return console.log("voce deve estar ouvindo uma musica para pausa-la")
    }

    Resume() {
        if (this.WasPlayingSomethink)
            this.player.unpause()
        else
            return console.log("voce deve estar ouvindo uma musica para continuar ouvindo")
    }

    Stop() {
        if (this.WasPlayingSomethink)
            this.player.stop()
        else
            return console.log("voce deve estar ouvindo uma musica para parar de ouvila")
    }
}

exports.VoiceConectionMain = new VoiceConectionMain()
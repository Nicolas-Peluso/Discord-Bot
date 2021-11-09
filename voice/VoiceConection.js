const {
  joinVoiceChannel,
  createAudioPlayer,
  createAudioResource,
  AudioPlayerStatus,
  getVoiceConnection,
  StreamType,
} = require('@discordjs/voice');
const Ytdl = require('ytdl-core-discord');
const DowloadAudio = require('./DownloadMusics');

class VoiceConectionMain {
  constructor(ChanelId, GuildId, Adapter) {
    this.channelId = ChanelId;
    this.GuildId = GuildId;
    this.Adapter = Adapter;

    this.player = createAudioPlayer();
    this.conection1 = undefined;
    this.ListMusic = [];
    this.WasPlayingSomethink = false;
    this.index = 0;
  }

  MakeConection() {
    try {
      joinVoiceChannel({
        channelId: this.channelId,
        guildId: this.GuildId,
        adapterCreator: this.Adapter,
      });

      this.conection1 = getVoiceConnection(this.GuildId);
    } catch (e) {
      return console.log('algo deu errado durante a conexão', e);
    }
    return null;
  }

  Disconnect() {
    if (!!this.conection1) {
      this.conection1.disconnect();
      this.conection1.destroy();
      console.log('conexão encerrada');
    } else {
      console.log('voce deve estar em uma conexão de voz para sair dela');
    }
  }

  async Play(oQueTocar = null) {
    if (!!oQueTocar) this.ListMusic.push(oQueTocar);
    if (!!this.conection1) {
      this.player.once('error', (e) => {
        console.log('error player', e);
      });

      this.player.once(AudioPlayerStatus.Playing, () => {
        this.WasPlayingSomethink = true;
      });
      // verifca se a url é valida e verifica se uma musica ja esta tocando
      if (Ytdl.validateURL(this.ListMusic[this.index]) && !!this.WasPlayingSomethink === false) {
        const resource = createAudioResource(await Ytdl(this.ListMusic[this.index], { type: 'opus' }), {
          inputType: StreamType.Opus,
        });
        this.player.play(resource);
        this.conection1.subscribe(this.player);
      } else if (!!this.WasPlayingSomethink) return console.log('a musica foi adicionada a fila ');

      else return console.log('a url nao esta valida tente novamente verifique a mesma ou tente com outra ');

      // assim que a musica acabar ou algum erro a interromper o estado do player vai apara idle
      // que vai remover a musica atual e tocar a proxima se tiver
      this.player.once(AudioPlayerStatus.Idle, () => {
        this.WasPlayingSomethink = false;
        if (this.ListMusic.length !== this.index + 1) {
          this.Stop();
          this.index += 1;
          this.Play();
        } else console.log('todas as musicas foram encerrado voce pode adicionar mais');
      });
    } else return console.log('voce deve estar em um canal de audio para usar essa opção');
    DowloadAudio(this.ListMusic);
    return null;
  }

  Pause() {
    if (this.WasPlayingSomethink) this.player.pause();
    return null;
  }

  Resume() {
    if (this.WasPlayingSomethink) this.player.unpause();
    return null;
  }

  Stop() {
    if (this.WasPlayingSomethink) this.player.stop();
    return null;
  }
}

module.exports = {
  VoiceConectionMain,
};

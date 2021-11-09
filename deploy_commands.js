const { SlashCommandBuilder } = require('@discordjs/builders');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { clientId, token, guildId } = require('./config.json');

const commands = [
  new SlashCommandBuilder().setName('ping').setDescription('response with pong!'),
  new SlashCommandBuilder().setName('server').setDescription('response with server name!'),
  new SlashCommandBuilder().setName('play').setDescription('response with options!'),
].map((command) => command.toJSON());

const rest = new REST({ version: '9' }).setToken(token);

rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands })
  .then(() => console.log('commandos regitradodos'))
  .catch((erro) => console.log(erro));

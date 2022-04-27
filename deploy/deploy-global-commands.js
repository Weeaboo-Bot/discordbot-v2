const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { getAllFiles } = require('../utils/Utils');
const { discord } = require('../config');
const { info, error } = require('../utils/ChalkConfig');

const commands = [];
const commandFiles = getAllFiles('./commands', [], '.js');

for (const file of commandFiles) {
	const command = require(`../${file}`);
	commands.push(command.data.toJSON());
	info(`Register global command ${command.data.name}`);
}

const rest = new REST({ version: '9' }).setToken(discord.DISCORD_TOKEN);

rest.put(Routes.applicationCommands(discord.DISCORD_CLIENT_ID), { body: commands })
	.then(() => console.log('Successfully registered global commands.'))
	.catch(error);
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { getAllFiles } = require('../utils/Utils');
const { discord } = require('../config.json');
const logger = require('../utils/Logger');

const commands = [];
const commandFiles = getAllFiles('../commands', [], '.js');

for (const file of commandFiles) {
	const command = require(`./${file}`);
	commands.push(command.data.toJSON());
	logger.info(`Register global command ${command.data.name}`);
}

const rest = new REST({ version: '9' }).setToken(discord.token);

rest.put(Routes.applicationCommands(discord.clientId), { body: commands })
	.then(() => console.log('Successfully registered global commands.'))
	.catch(console.error);
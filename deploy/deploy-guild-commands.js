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
	logger.info(`Register guild command ${command.data.name}`);
}

const rest = new REST({ version: '9' }).setToken(discord.token);

rest.put(Routes.applicationGuildCommands(discord.clientId, discord.guildId), { body: commands })
	.then(() => console.log('Successfully registered guild commands.'))
	.catch(console.error);
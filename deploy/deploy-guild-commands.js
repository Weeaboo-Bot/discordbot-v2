const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { getAllFiles } = require('../utils/Utils');
const discord = require('../config').discord;
const { info, error } = require('../utils/ChalkConfig');

const commands = [];
const commandFiles = getAllFiles('./commands', [], '.js');

for (const file of commandFiles) {
	const command = require(`../${file}`);
	commands.push(command.data.toJSON());
	info(`Register guild command ${command.data.name}`);
}

const rest = new REST({ version: '9' }).setToken(discord.DISCORD_TOKEN);

rest.put(Routes.applicationGuildCommands(discord.DISCORD_CLIENT_ID, discord.DISCORD_GUILD_ID), { body: commands })
	.then(() => console.log('Successfully registered guild commands.'))
	.catch(error);
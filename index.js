const { getAllFiles } = require('./utils/Utils');
const fs = require('node:fs')
const Logger = require('./utils/Logger');
const { Client, Collection, Intents } = require('discord.js');
const { discord } = require('./config.json');
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

client.commands = new Collection();
const commandFiles = getAllFiles('commands', [], '.js');
const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));

Logger.info('Loading Weaboo Bot...');

for (const file of commandFiles) {
	const command = require(`./${file}`);
	client.commands.set(command.data.name, command);
	Logger.info(`Loaded command ${command.data.name}`);
}

for (const file of eventFiles) {
	const event = require(`./events/${file}`);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}

client.login(discord.token);
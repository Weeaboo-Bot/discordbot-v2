const { getAllFiles } = require('./utils/Utils');
const { Client, Collection, Intents } = require('discord.js');
const discord = require('./config').discord;
const { commandLog, eventLog } = require('./utils/ChalkConfig');

// Load Intents
const myIntents = new Intents();
myIntents.add(Intents.FLAGS.GUILDS,
	Intents.FLAGS.GUILD_VOICE_STATES,
	Intents.FLAGS.GUILD_MESSAGES);

const client = new Client({ intents: myIntents,
	presence: { activity: { name: 'Developing Cool Features', type: 'PLAYING' }, status: 'online' } });

client.commands = new Collection();
client.events = new Collection();
const commandFiles = getAllFiles('commands', [], '.js');
const eventFiles = getAllFiles('events', [], '.js');

// Load Commands
for (const file of commandFiles) {
	const command = require(`./${file}`);
	client.commands.set(command.data.name, command);
	commandLog(`Loaded command ${command.data.name}`);
}

// Load events
for (const file of eventFiles) {
	const event = require(`./${file}`);
	client.events.set(event.name, event);
	eventLog(`Loaded event ${event.name}`);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}

// Login the bot
client.login(discord.DISCORD_TOKEN);
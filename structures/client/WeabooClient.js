const { Client, Collection, Intents } = require('discord.js');
const { commandLog, eventLog } = require('../../utils/ChalkConfig');
const { getAllFiles } = require('../../utils/Utils');

// Custom Weaboo Client
module.exports = class WeabooClient extends Client {
	constructor() {
		super({ intents: [Intents.FLAGS.GUILDS], presence: { activity: { name: 'Weaboo Bot', type: 'WATCHING' } } });

		// Create collections for commands and events
		this.commands = new Collection();
		this.events = new Collection();

		this.loadCommands();
		this.loadEvents();
	}

	/**
     * Loads all commands from the commands folder
     */
	loadCommands() {
		const commandFiles = getAllFiles('./commands', [], '.js');
		for (const file of commandFiles) {
			const command = require(`../${file}`);
			this.commands.set(command.data.name, command);
			commandLog(`Loaded command ${command.data.name}`);
		}
	}

	/**
     * Loads all events from the events folder
     */
	loadEvents() {
		const eventFiles = getAllFiles('./events', [], '.js');
		for (const file of eventFiles) {
			const event = require(`../${file}`);
			this.events.set(event.name, event);
			eventLog(`Loaded event ${event.name}`);
			if (event.once) {
				this.once(event.name, (...args) => event.execute(...args));
			} else {
				this.on(event.name, (...args) => event.execute(...args));
			}
		}
	}
};
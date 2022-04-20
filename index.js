const { Client, Collection, Intents } = require('discord.js');
const { token } = require('./config.json');
const fs = require('fs');
const path = require('path');


function getAllFiles(dirPath, arrayOfFiles) {
	const files = fs.readdirSync(dirPath);
	arrayOfFiles = arrayOfFiles || [];

	files.forEach(function(file) {
		if (fs.statSync(dirPath + '/' + file).isDirectory()) {
			arrayOfFiles = getAllFiles(dirPath + '/' + file, arrayOfFiles);
		}
		else {
			arrayOfFiles.push(path.join(__dirname, dirPath, file));
		}
	});

	return arrayOfFiles;
}


const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

client.commands = new Collection();

const commandFiles = getAllFiles('./commands', []);
const eventFiles = getAllFiles('./events', []);

for (const file of commandFiles) {
	const command = require(`${file}`);
	client.commands.set(command.data.name, command);
}

for (const file of eventFiles) {
	const event = require(`${file}`);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}


client.login(token);
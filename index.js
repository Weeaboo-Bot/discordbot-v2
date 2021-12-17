const { Client, Intents } = require('discord.js');
const config = require('dotenv').config();


const discordClient = new Client({ intents: [Intents.FLAGS.GUILDS] });

discordClient.once('ready', () => {
    console.log('Ready!');
});

discordClient.login(config.parsed.)
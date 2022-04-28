const { discord } = require('./config');
const WeabooClient = require('./structures/client/WeabooClient');

// Create the Weaboo Client
const client = new WeabooClient();


// Login the Weaboo Client
client.login(discord.DISCORD_TOKEN);
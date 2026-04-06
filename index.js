const { Client, GatewayIntentBits } = require('discord.js');

const client = new Client({
  intents: [GatewayIntentBits.Guilds]
});

const TOKEN = "MTQ5MDQyNTMxNDA4ODcxODM1Ng.G1nLXj.UwoqQOH5QqGWb7qTFM6cbiarCSPTfcil8YxDmY";

client.once('ready', () => {
  console.log(`Logged in as ${client.user.tag}`);
});

client.login(TOKEN);

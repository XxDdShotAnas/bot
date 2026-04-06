process.on('unhandledRejection', console.error);
process.on('uncaughtException', console.error);

const { Client, GatewayIntentBits, EmbedBuilder } = require('discord.js');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

const TOKEN = process.env.TOKEN;

client.once('clientReady', () => {
  console.log(`Logged in as ${client.user.tag}`);
});

client.on('messageCreate', (message) => {
  if (message.author.bot) return;

  if (message.content === "ip") {
    const embed = new EmbedBuilder()
      .setTitle("🌐 Server Info")
      .setColor("Blue")
      .addFields(
        { name: "IP", value: "play.yourserver.com", inline: true },
        { name: "PORT", value: "25565", inline: true }
      )
      .setFooter({ text: "Server Bot" });

    message.reply({ embeds: [embed] });
  }
});

client.login(TOKEN);

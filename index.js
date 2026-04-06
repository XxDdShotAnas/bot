process.on('unhandledRejection', console.error);
process.on('uncaughtException', console.error);

const { 
  Client, 
  GatewayIntentBits, 
  EmbedBuilder, 
  ButtonBuilder, 
  ActionRowBuilder, 
  ButtonStyle 
} = require('discord.js');

const axios = require('axios');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

const TOKEN = process.env.TOKEN;

// 🔥 حط IP + PORT هنا
const serverIP = "XDS-SMP.aternos.me:22472";

client.once('clientReady', () => {
  console.log(`Logged in as ${client.user.tag}`);
});

client.on('messageCreate', async (message) => {
  if (message.author.bot) return;

  if (message.content === "ip") {
    try {
      const res = await axios.get(`https://api.mcsrvstat.us/2/${serverIP}`);

      const online = res.data?.online ? "🟢 Online" : "🔴 Offline";
      const players = res.data?.players?.online || 0;

      const embed = new EmbedBuilder()
        .setTitle("🔥 Server Info")
        .setColor("Blue")
        .addFields(
          { name: "IP", value: serverIP, inline: true },
          { name: "Status", value: online, inline: true },
          { name: "Players", value: players.toString(), inline: true }
        );

      const button = new ButtonBuilder()
        .setLabel("📋 Copy IP")
        .setStyle(ButtonStyle.Primary)
        .setCustomId("copy_ip");

      const row = new ActionRowBuilder().addComponents(button);

      message.reply({ embeds: [embed], components: [row] });

    } catch (err) {
      message.reply("السيرفر مقفول أو في مشكلة ❌");
    }
  }
});

client.on('interactionCreate', async (interaction) => {
  if (!interaction.isButton()) return;

  if (interaction.customId === "copy_ip") {
    await interaction.reply({
      content: `📋 IP: ${serverIP}`,
      ephemeral: true
    });
  }
});

client.login(TOKEN);

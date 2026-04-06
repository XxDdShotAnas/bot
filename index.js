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

client.once('clientReady', () => {
  console.log(`Logged in as ${client.user.tag}`);
});

client.on('messageCreate', async (message) => {
  if (message.author.bot) return;

  if (message.content === "ip") {
    try {
      const serverIP = "XDS-SMP.aternos.me:22472";

      const res = await axios.get(`https://api.mcsrvstat.us/2/${serverIP}`);

      const online = res.data.online ? "🟢 Online" : "🔴 Offline";
      const players = res.data.players ? res.data.players.online : 0;

      const embed = new EmbedBuilder()
        .setTitle("🔥 Server Info")
        .setColor("red")
        .addFields(
          { name: "IP", value: serverIP, inline: true },
          { name: "PORT", value: "22472", inline: true },
          { name: "Status", value: online, inline: true },
          { name: "Players", value: players.toString(), inline: true }
        );

      // 🔥 زرار Copy
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

// 👇 لما حد يضغط الزرار
client.on('interactionCreate', async (interaction) => {
  if (!interaction.isButton()) return;

  if (interaction.customId === "copy_ip") {
    const serverIP = "XDS-SMP.aternos.me";

    await interaction.reply({
      content: `📋 IP: ${serverIP}`,
      ephemeral: true
    });
  }
});

client.login(TOKEN);

process.on('unhandledRejection', console.error);
process.on('uncaughtException', console.error);

const { Client, GatewayIntentBits, EmbedBuilder } = require('discord.js');
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
      // 🔥 غير الـ IP هنا
      const res = await axios.get("https://api.mcsrvstat.us/2/play.yourserver.com");

      const online = res.data.online ? "🟢 Online" : "🔴 Offline";
      const players = res.data.players ? res.data.players.online : 0;

      const embed = new EmbedBuilder()
        .setTitle("🌐 Server Info")
        .setColor("Blue")
        .addFields(
          { name: "IP", value: "XDS-SMP.aternos.me", inline: true },
          { name: "PORT", value: "22472", inline: true },
          { name: "Status", value: online, inline: true },
          { name: "Players Online", value: players.toString(), inline: true }
        )
        .setFooter({ text: "Server Bot" });

      message.reply({ embeds: [embed] });

    } catch (err) {
      message.reply("حصل خطأ في جلب بيانات السيرفر ❌");
    }
  }
});

client.login(TOKEN);

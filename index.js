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

const serverIP = "XDS-SMP.aternos.me";
const channelId = "1491468136090828943";

let statusMessage;

client.once('clientReady', async () => {
  console.log(`Logged in as ${client.user.tag}`);

  const channel = await client.channels.fetch(channelId);

  // دايمًا يمسح القديم ويبعت جديد (مضمون)
await channel.bulkDelete(5).catch(() => {});

statusMessage = await channel.send("⏳ Loading...");
await statusMessage.pin();

  setInterval(async () => {
    try {
      const res = await axios.get(`https://api.mcstatus.io/v2/status/java/${serverIP}`);

      const online = res.data?.online ? "Online" : "Offline";
      const players = res.data?.players?.online ?? "0";
      const maxPlayers = res.data?.players?.max ?? "?";
      const version = res.data?.version?.name_clean ?? "Unknown";

      const embed = new EmbedBuilder()
        .setColor(online === "Online" ? "Green" : "Red")
        .setDescription(
`**~ AURA MC**
**:jigsaw: Java Edition IP** \`AuraMc.pro\`
**:pager: Bedrock Edition IP** \`AuraMc.pro\` \`Port: 25566\`

• الحالة | Status :green_circle: ${online}
• اللاعبين | Players :globe_with_meridians: ${players}/${maxPlayers}
• الإصدار | Version :tools: ${version}`
        );

      await statusMessage.edit({ embeds: [embed] });

    } catch (err) {
      console.log(err);
    }
  }, 10000);
});


// أمر ip
client.on('messageCreate', async (message) => {
  if (message.author.bot) return;

  if (message.content === "ip") {
    try {
      const res = await axios.get(`https://api.mcstatus.io/v2/status/java/${serverIP}`);

      const online = res.data?.online ? "Online" : "Offline";
      const players = res.data?.players?.online ?? "0";
      const maxPlayers = res.data?.players?.max ?? "?";
      const version = res.data?.version?.name_clean ?? "Unknown";

      const embed = new EmbedBuilder()
        .setColor(online === "Online" ? "Green" : "Red")
        .setDescription(
`**~ AURA MC**
**:jigsaw: Java Edition IP** \`AuraMc.pro\`
**:pager: Bedrock Edition IP** \`AuraMc.pro\` \`Port: 25566\`

• الحالة | Status :green_circle: ${online}
• اللاعبين | Players :globe_with_meridians: ${players}/${maxPlayers}
• الإصدار | Version :tools: ${version}`
        );

      message.reply({ embeds: [embed] });

    } catch (err) {
      console.log(err);
      message.reply("❌ Error");
    }
  }
});

client.login(TOKEN);

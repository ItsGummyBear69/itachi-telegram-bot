require('dotenv').config();
const { Telegraf } = require('telegraf');

const bot = new Telegraf(process.env.BOT_TOKEN);

bot.start((ctx) => ctx.reply('ITACHI UCHIHA is active. Send me any file or message.'));

bot.on('message', async (ctx) => {
  const channelId = process.env.CHANNEL_ID;
  const msg = ctx.message;

  try {
    if (msg.text) {
      await ctx.telegram.sendMessage(channelId, `Message from ${ctx.from.username || ctx.from.first_name}: ${msg.text}`);
    }

    if (msg.document) {
      const fileId = msg.document.file_id;
      await ctx.telegram.sendDocument(channelId, fileId);
    }

    if (msg.photo) {
      const fileId = msg.photo[msg.photo.length - 1].file_id;
      await ctx.telegram.sendPhoto(channelId, fileId);
    }

    if (msg.video) {
      const fileId = msg.video.file_id;
      await ctx.telegram.sendVideo(channelId, fileId);
    }

    if (msg.voice) {
      const fileId = msg.voice.file_id;
      await ctx.telegram.sendVoice(channelId, fileId);
    }
  } catch (err) {
    console.error("Error sending to channel:", err);
    ctx.reply("Failed to forward your message.");
  }
});

bot.launch();
console.log("Bot is running...");
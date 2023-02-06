const program = require('commander');
const TelegramBot = require('node-telegram-bot-api');
require('dotenv').config();

const chatId = process.env.CHAT_ID;
const token = process.env.TELEGRAM_BOT_API_TOKEN;
const bot = new TelegramBot(token);

program
  .command('send-message <message>')
  .description('Send a message to the Telegram bot')
  .action((message) => {
    bot.sendMessage(chatId, message);
  });

program
  .command('send-photo <photo-path>')
  .description('Send a photo to the Telegram bot')
  .action((photoPath) => {
    bot.sendPhoto(chatId, photoPath);
  });

program.parse(process.argv);

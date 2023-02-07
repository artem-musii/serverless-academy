const TelegramBot = require('node-telegram-bot-api');
const { TELEGRAM_API_KEYS } = require('./app-keys');

const bot = new TelegramBot(TELEGRAM_API_KEYS.TOKEN, {
  polling: true,
});

module.exports = bot;

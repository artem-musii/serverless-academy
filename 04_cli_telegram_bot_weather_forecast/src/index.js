const bot = require('./telegram-bot');
const getForecast = require('./get-forecast');
const getWeatherDescription = require('./get-weather-description');

bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  const response = 'Choose type of forecast';

  const keyboard = [[{ text: 'Every 3 hours' }, { text: 'Every 6 hours' }]];

  bot.sendMessage(chatId, response, {
    reply_markup: {
      keyboard,
      resize_keyboard: true,
      one_time_keyboard: false,
    },
  });
});

bot.onText(/Every 3 hours/, async (msg) => {
  const chatId = msg.chat.id;
  const forecast = await getForecast();
  let response = `${forecast.city.name} \n\n`;

  for (let i = 0; i < forecast.list.length; i++) {
    response += getWeatherDescription(forecast.list[i]);
  }

  bot.sendMessage(chatId, response);
});

bot.onText(/Every 6 hours/, async (msg) => {
  const chatId = msg.chat.id;
  const forecast = await getForecast();
  let response = `${forecast.city.name} \n\n`;

  for (let i = 0; i < forecast.list.length; i += 2) {
    response += getWeatherDescription(forecast.list[i]);
  }

  bot.sendMessage(chatId, response);
});

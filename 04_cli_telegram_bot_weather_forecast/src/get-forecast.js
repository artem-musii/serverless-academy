const axios = require('axios');
const { API_KEYS } = require('./app-keys');

const getForecast = async () => {
  try {
    const weatherAPIUrl = `${API_KEYS.API_URL}forecast?q=${API_KEYS.QUERY}&appid=${API_KEYS.API_KEY}`;
    const response = await axios.get(weatherAPIUrl);
    return response.data;
  } catch {
    throw Error('Something went wrong');
  }
};

module.exports = getForecast;

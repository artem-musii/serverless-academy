const getWeatherDescription = (weather) => {
  const dt = new Date(weather.dt * 1000).toLocaleString();
  const description = `${dt}: ${Math.round(weather.main.temp - 273)}°C, ${
    weather.weather[0].description
  }\n\n`;

  return description;
};

module.exports = getWeatherDescription;

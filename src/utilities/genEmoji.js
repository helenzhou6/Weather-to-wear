const genEmoji = (icon) => {
  return {
    "clear-day": "☀️",
    "clear-night": "🌕",
    "rain": "☔️",
    "snow": "❄️",
    "sleet": "🌨",
    "wind": "💨",
    "fog": "🌫",
    "cloudy": "☁️",
    "partly-cloudy-day": "🌤",
    "partly-cloudy-night": "🌙"
  }[icon];
};

module.exports = genEmoji;
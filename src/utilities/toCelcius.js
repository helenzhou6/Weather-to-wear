const toCelcius = temperature => `${(Math.round((temperature / 32) * 10) / 10)}°C`;

module.exports = toCelcius;
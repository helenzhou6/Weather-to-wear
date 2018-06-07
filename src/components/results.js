import React from "react";
import toCelcius from "../utilities/toCelcius";

const Results = ({ responseData, address }) => {

  const emoji = {
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
  }[responseData.icon];

  const { summary, precipProbability, precipType, temperatureLow, temperatureHigh } = responseData;
  const lowestTemp = toCelcius(temperatureLow);
  const highestTemp = toCelcius(temperatureHigh);
  const chanceRain = precipProbability * 100;

  return (
    <React.Fragment>
      <h2>{`Forecast for ${address}`}</h2>
      <p>{`${emoji} ${summary}`}</p>
      <p>{`${chanceRain}% chance of ${precipType}`}</p>
      <p>{`Temperatures between ${lowestTemp}°C to ${highestTemp}°C`}</p>
      <h2>Today you should wear...</h2>
    </React.Fragment>
  );
};

export default Results;
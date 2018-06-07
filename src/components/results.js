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
  return (
    <React.Fragment>
      <h2>{`Forecast for ${address}`}</h2>
      <p>{`${emoji} ${summary}`}</p>
      <p>{`${precipProbability * 100}% chance of ${precipType}`}</p>
      <p>{`Temperatures between ${toCelcius(temperatureLow)} to ${toCelcius(temperatureHigh)}`}</p>
      <h2>Today you should wear...</h2>
    </React.Fragment>
  );
};

export default Results;
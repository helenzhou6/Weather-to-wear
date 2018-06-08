import React from "react";
import toCelcius from "../utilities/toCelcius";
import genClothingMsg from "../utilities/genClothingMsg";
import genEmoji from "../utilities/genEmoji";
import genCoatMsg from "../utilities/genCoatMsg";
import toWholePercentage from "../utilities/toWholePercentage";

const Results = ({ responseData, address }) => {

  const { summary, precipProbability, precipType, temperatureLow, temperatureHigh, icon } = responseData;
  const lowestTemp = toCelcius(temperatureLow);
  const highestTemp = toCelcius(temperatureHigh);
  const chanceRain = toWholePercentage(precipProbability);
  const typeOfPercip = precipType ? precipType : "rain";

  return (
    <React.Fragment>
      <h2>{`Forecast for ${address}`}</h2>
      <p>{icon ? genEmoji(icon) : ""} {summary}</p>
      <p>{`${chanceRain}% chance of ${typeOfPercip}`}</p>
      <p>{`Temperatures between ${lowestTemp}°C to ${highestTemp}°C`}</p>
      <h2>Today you should wear...</h2>
      <p>{genClothingMsg(lowestTemp, highestTemp)} and {genCoatMsg(chanceRain, typeOfPercip)}</p>
    </React.Fragment>
  );
};

export default Results;
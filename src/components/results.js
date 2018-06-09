import React from "react";
import toCelcius from "../utilities/toCelcius";
import genClothingMsg from "../utilities/genClothingMsg";
import genEmoji from "../utilities/genEmoji";
import genCoatMsg from "../utilities/genCoatMsg";
import toWholePercentage from "../utilities/toWholePercentage";
import styled from "styled-components";

const Subtitle = styled.h2`
  font-size: .8rem;
  font-weight: 300;
  text-transform: uppercase;
  letter-spacing: .07rem;
  margin-top: 2rem;
`;

const MainText = styled.p`
  font-size: 1.2rem;
`;

const Recommendation__text = styled.p`
  font-size: 1.5rem;
  font-weight: 700;
`;

const Results = ({ responseData, address }) => {

  const { summary, precipProbability, precipType, temperatureLow, temperatureHigh, icon } = responseData;
  const lowestTemp = toCelcius(temperatureLow);
  const highestTemp = toCelcius(temperatureHigh);
  const chanceRain = toWholePercentage(precipProbability);
  const typeOfPercip = precipType ? precipType : "rain";


  return (
    <React.Fragment>
      <Subtitle>Today's forecast</Subtitle>
      <MainText>For {address}:</MainText>
      <MainText>{icon ? genEmoji(icon) : ""} {summary} • {chanceRain}% chance of {typeOfPercip} • Temperatures between {lowestTemp}°C to {highestTemp}°C</MainText>
      <Subtitle>Recommendation</Subtitle>
      <Recommendation__text>Wear {genClothingMsg(lowestTemp, highestTemp)} and {genCoatMsg(chanceRain, typeOfPercip)}</Recommendation__text>
    </React.Fragment>
  );
};

export default Results;
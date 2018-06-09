import React from "react";
import getAPIData from "../utilities/getAPIData";
import Results from "./results";
import changeSpacesToPlus from "../utilities/changeSpacesToPlus";
import styled from "styled-components";
import { Button } from "./styled/button";
import locationIcon from "../../public/assets/arrow.svg";

const YourLocation__icon = styled.img`
  width: 1rem;
  display: inline-block;
`;
const YourLocationSection = styled.div`
  width: 100%;
`;
const Input__label = styled.label`
  font-weight: 300;
  width: 100%;
  display: block;
  font-size: .8rem;
`;

const YouLocation__text = styled.span`
  font-size: .8rem;
  width: 100%;
  text-decoration: underline;
  padding-left: .4rem;
`;

const Bold = styled.span`
  font-weight: 900;
`;

export default class Form extends React.Component {
  state = {
    address: "London",
    completeAddress: "",
    responseData: null,
    message: ""
  };
  defaultErrorMessage = "Oops, something went wrong on our end, try again later.";

  getWeather = (latitude, longitude) => {
    getAPIData(`http://localhost:3001/api/darksky/${latitude}/${longitude}`)
      .then(res => res.error ? this.addMessage(res.error) : this.setState({ responseData: res.daily.data[0], message: "" }))
      .catch(err => {
        console.log(`Error with the API request to back end server - ${err.message}`);
        this.addMessage(this.defaultErrorMessage);
      });
  }

  addMessage = (msg) => {
    this.setState({ message: msg, responseData: null });
  }

  onInputSubmit = () => {
    this.addMessage("Loading...");
    const formattedAddress = changeSpacesToPlus(this.state.address);
    getAPIData(`http://localhost:3001/api/geolocate/${formattedAddress}`)
      .then(res => {
        if (res.error) {
          this.addMessage(res.error);
        } else {
          const { lat: latitude, lng: longitude } = res.results[0].geometry.location;
          this.setState({ completeAddress: res.results[0].formatted_address });
          this.getWeather(latitude, longitude);
        }
      })
      .catch(err => {
        console.log(`Error with the API request to back end server - ${err.message}`);
        this.addMessage(this.defaultErrorMessage);
      });
  }

  onSubmit = () => {
    this.addMessage("Loading...");
    const useLocation = ({ coords: { latitude, longitude } }) => {
      this.setState({ completeAddress: `latitude: ${latitude}, longitude: ${longitude}` });
      this.getWeather(latitude, longitude);
    };
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(useLocation);
    } else {
      this.addMessage("Geolocation is not supported by this browser.");
    }
  }

  render() {
    const { responseData, message, address, completeAddress } = this.state;
    if (!responseData) {
      return (
        <React.Fragment>
          <label><Input__label>Enter a location:</Input__label>
            <input id="address-input" value={address} onChange={e => this.setState({ address: e.target.value })} />
          </label>
          <Button onClick={this.onInputSubmit}><Bold>⟶</Bold></Button>
          <YourLocationSection>
            <Button onClick={this.onSubmit}>
              <YourLocation__icon src={locationIcon} alt="Location icon" />
              <YouLocation__text>Use current location</YouLocation__text>
            </Button>
          </YourLocationSection>
          <p>{message}</p>
        </React.Fragment>
      );
    } else {
      return <Results address={completeAddress} responseData={responseData} />;
    }

  }
}

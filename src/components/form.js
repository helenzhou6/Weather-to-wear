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

const Message = styled.p`
  font-size: 1.2rem;
  margin-top: 1rem;
`;

const Input = styled.input`
  border: none;
  border-bottom: 3px solid grey;
  width: 80%;
  font-family: inherit;
  font-size: 1.5rem;
  font-weight: 700;
  margin: .2rem 0 .5rem;
  padding: .5rem;
  background-color: transparent;

  &:focus {
    outline: none;
    border: none;
    border-bottom: 3px solid orange;
  }
`;

const YourLocationSection = styled.div`
  width: 100%;
`;

const Input__text = styled.label`
  font-weight: 300;
  width: 100%;
  text-transform: uppercase;
  letter-spacing: .07rem;
  display: block;
  font-size: .8rem;
`;

const YouLocation__text = styled.span`
  font-size: .8rem;
  width: 100%;
  text-decoration: underline;
  padding-left: .4rem;
`;

const Input__arrow = styled.span`
  font-weight: 900;
  width: calc(5% - .5rem);
  color: orange;
  &:focus, &:hover {
    opacity: .8;
  }
`;

export default class Form extends React.Component {
  state = {
    address: "",
    completeAddress: "",
    responseData: null,
    message: ""
  };
  defaultErrorMessage = "Oops, something went wrong on our end, try again later.";

  getWeather = (latitude, longitude) => {
    getAPIData(`http://localhost:8000/api/darksky/${latitude}/${longitude}`)
      .then(res => {
        res.error ? this.addMessage(res.error) : this.setState({ responseData: res.daily.data[0], message: "" });
      })
      .catch(err => {
        console.log(`Error with the API request to back end server - ${err.message}`);
        this.addMessage(this.defaultErrorMessage);
      });
  }

  addMessage = (msg) => {
    this.setState({ message: msg, responseData: null });
  }

  onInputSubmit = (e) => {
    e.preventDefault();
    this.addMessage("Loading...");
    const formattedAddress = changeSpacesToPlus(this.state.address);
    getAPIData(`http://localhost:8000/api/geolocate/${formattedAddress}`)
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
      this.setState({ completeAddress: "your current location", address: "Current Location" });
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
    const result = responseData ? < Results address={completeAddress} responseData={responseData} /> : "";
    // if (!responseData) {
    return (
      <React.Fragment>
        <form>
          <label><Input__text>Enter a location:</Input__text>
            <Input type="text" autocomplete="off" id="address-input" value={address} onChange={e => this.setState({ address: e.target.value, responseData: null })} />
          </label>
          <Button onClick={(e) => this.onInputSubmit(e)} onKeyPress={(e) => e.key === "Enter" ? this.onInputSubmit(e) : null}><Input__arrow>⟶</Input__arrow></Button>
        </form>
        <YourLocationSection>
          <Button onClick={this.onSubmit}>
            <YourLocation__icon src={locationIcon} alt="Location icon" />
            <YouLocation__text>Use current location</YouLocation__text>
          </Button>
        </YourLocationSection>
        <Message>{message}</Message>
        {result}
      </React.Fragment >
    );
    // } else {
    // return;
    // }

  }
}

import React from "react";
import getAPIData from "../utilities/getAPIData";
import Results from "./results";
import changeSpacesToPlus from "../utilities/changeSpacesToPlus";

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
    const useLocation = ({ coords }) => {
      this.getWeather(coords.latitude, coords.longitude);
    };
    if (navigator.geolocation) {
      this.addMessage("Loading...");
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
          <label>Input address:
          <input id="address-input" value={address} onChange={e => this.setState({ address: e.target.value })} />
          </label>
          <button onClick={this.onInputSubmit}>Submit</button>
          <p>Or use current location</p>
          <button onClick={this.onSubmit}>Go</button>
          <p>{message}</p>
        </React.Fragment>
      );
    } else {
      return <Results address={completeAddress} responseData={responseData} />;
    }

  }
}

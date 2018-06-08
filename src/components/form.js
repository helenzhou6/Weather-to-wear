import React from "react";
import getAPIData from "../utilities/getAPIData";
import Results from "./results";

export default class Form extends React.Component {
  state = {
    address: "London",
    responseData: null,
    message: ""
  };

  getWeather = (latitude, longitude) => {
    getAPIData(`http://localhost:3001/api/darksky/${latitude}/${longitude}`)
      .then(res => res.error ? this.addMessage(res.error) : this.setState({ responseData: res.daily.data[0], message: "" }))
      .catch(err => {
        console.log(`Error with the API request to back end server - ${err.message}`);
        this.addMessage("Oops, an error on our end, try again later");
      });
  }

  addMessage = (msg) => {
    this.setState({ message: msg, responseData: null });
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
    const { responseData, message, address } = this.state;
    if (!responseData) {
      return (
        <React.Fragment>
          <input></input>
          <button >Submit</button>
          <p>Or use current location</p>
          <button onClick={this.onSubmit}>Go</button>
          <p>{message}</p>
        </React.Fragment>
      );
    } else {
      return <Results address={address} responseData={responseData} />;
    }

  }
}

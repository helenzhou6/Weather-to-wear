import React from "react";
import getAPIData from "../utilities/getAPIData";
import Results from "./results";

export default class Form extends React.Component {
  state = {
    location: {
      latitude: 37.8267,
      longitude: -122.4233
    },
    address: "London",
    responseData: null,
    error: false
  };

  onSubmit = () => {
    const { latitude, longitude } = this.state.location;
    getAPIData(`http://localhost:3001/api/darksky/${latitude}/${longitude}`)
      .then(res => res.error ? this.setState({ error: res.error, responseData: null }) : this.setState({ responseData: res.daily.data[0], error: "" }))
      .catch(err => {
        console.log(`Error with the API request to back end server - ${err.message}`);
        this.setState({ error: "Oops, an error on our end, try again later", responseData: null });
      });
  }

  render() {
    const { responseData, error, address } = this.state;
    if (!responseData) {
      return (
        <React.Fragment>
          <input></input>
          <button onClick={this.onSubmit}>Submit</button>
          <p>{error}</p>
        </React.Fragment>
      );
    } else {
      return <Results address={address} responseData={responseData} />;
    }

  }
}

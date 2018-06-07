import React from "react";
import getAPIData from "../utilities/getAPIData";

export default class Form extends React.Component {
  state = {
    location: {
      latitude: 37.8267,
      longitude: -122.4233
    },
    data: null,
    error: false
  };

  onSubmit = () => {
    const { latitude, longitude } = this.state.location;
    getAPIData(`http://localhost:3001/api/darksky/${latitude}/${longitude}`)
      .then(res => res === "error" ? this.setState({ error: true }) : this.setState({ data: res.daily, error: false }))
      .catch(err => {
        console.log(`Error with the API request ${err.message}`);
        this.setState({ error: true });
      });
  }

  render() {
    const { data, error } = this.state;
    if (!data) {
      return (
        <React.Fragment>
          <input></input>
          <button onClick={this.onSubmit}>Submit</button>
          <p>{error ? "There was an error with the request, try again later" : ""}</p>
        </React.Fragment>
      );
    } else {
      return <Result />;
    }

  }
}

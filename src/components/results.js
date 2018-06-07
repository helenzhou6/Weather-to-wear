import React from "react";

export default class Results extends React.Component {
  state = {

    location: {
      latitude: 42.3601,
      longitude: -71.0589
    }

  };

  componentDidMount() {
    // latitude = 37.8267, longitude = -122.4233
    fetch("http://localhost:3001/api/darksky/37.8267/-122.4233")
      .then(response => {
        if (response.status === 404) {
          return "not valid user";
        } else if (response.status !== 200) {
          console.log(`Error with the request! ${response.status}`);
          return "error";
        }
        return response.json();
      })
      .then(response => console.log(response));
  }

  render() {
    return (
      <p>Hello</p>
    );
  }
}

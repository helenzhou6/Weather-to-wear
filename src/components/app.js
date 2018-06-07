import React from "react";
import Results from "./results";

export default class App extends React.Component {
  state = {
    pageView: "landing",
  };

  render() {
    return (
      <Results />
    );
  }
}

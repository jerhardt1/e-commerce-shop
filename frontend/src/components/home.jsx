import React, { Component } from "react";
import Recommendations from "./recommendations";
import Promotion from "./promotion";

class Home extends Component {
  state = {};
  render() {
    return (
      <div>
        <Recommendations></Recommendations>
        <Promotion></Promotion>
      </div>
    );
  }
}

export default Home;

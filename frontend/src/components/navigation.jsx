import React, { Component } from "react";

class Navigation extends Component {
  render() {
    const { path } = this.props;

    return (
      <div>
        <ul className="navigation">
          {path.map((value, index) => {
            return <li key={index}> {value}</li>;
          })}
        </ul>
      </div>
    );
  }
}

export default Navigation;

import React, { Component } from "react";

class BubbleCounter extends Component {
  state = {};

  setClassName = (item, active) => {
    let className = "bubble-item";
    return item === active ? (className += "-active") : className;
  };

  render() {
    const { data: items, active, onChangeSlide } = this.props;

    return (
      <div className="bubble-container">
        {items.map((item) => (
          <div
            key={item.id}
            className={this.setClassName(item, active)}
            onClick={() => onChangeSlide(0, item)}
          ></div>
        ))}
      </div>
    );
  }
}

export default BubbleCounter;

import React, { Component } from "react";

class ColorSelection extends Component {
  state = {
    colors: [],
    activeColor: null,
  };

  constructor(props) {
    super(props);
    const { data } = props;
    const colors = data ? data : [];
    const activeColor = data ? data[0] : null;
    this.state = { colors, activeColor };
  }

  handleActiveColor = (color) => {
    this.setState({ activeColor: color });
  };

  getColorClassName = (color = null) => {
    const { activeColor } = this.state;
    let name = "color__block";
    name =
      activeColor === null || activeColor !== color
        ? name
        : name + " color__block--active";
    return name;
  };

  setColor = (value) => {
    let style = { backgroundColor: "rgb" + value };
    return style;
  };

  render() {
    const { colors, activeColor } = this.state;

    return (
      <React.Fragment>
        {!!colors.length && (
          <div className="prd_detailed__color">
            <span>
              Color: <strong>{activeColor.color}</strong>
            </span>
            <ul className="color">
              {colors.map((color) => (
                <li
                  className={this.getColorClassName(color)}
                  key={color.color}
                  style={{ backgroundColor: "rgb" + color.value }}
                  onClick={() => this.handleActiveColor(color)}
                ></li>
              ))}
            </ul>
          </div>
        )}
      </React.Fragment>
    );
  }
}

export default ColorSelection;

import React, { Component } from "react";

class SizeSelection extends Component {
  state = {
    sizes: [],
    activeSize: null,
  };

  constructor(props) {
    super(props);
    const { data } = props;
    const sizes = data ? data : [];
    const activeSize = null;
    this.state = { sizes, activeSize };
  }

  handleActiveSize = (event) => {
    this.setState({ activeSize: event.target.value });
  };

  render() {
    const { sizes, activeSize } = this.state;

    return (
      <React.Fragment>
        {!!sizes.length && (
          <div className="prd_size">
            <label htmlFor="Size">
              Size:{" "}
              {activeSize ? (
                <span className="font--bold">{activeSize}</span>
              ) : (
                <span className="font--important">Please select</span>
              )}
            </label>
            <select
              defaultValue=""
              className="prd_select"
              name="Size"
              onChange={this.handleActiveSize}
            >
              <option defaultValue disabled value="">
                Please select
              </option>
              {sizes.map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
          </div>
        )}
      </React.Fragment>
    );
  }
}

export default SizeSelection;

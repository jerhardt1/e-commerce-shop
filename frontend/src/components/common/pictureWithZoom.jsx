import React, { Component } from "react";

class PictureWithZoom extends Component {
  state = { hovering: false };

  handleHover = (e, value) => {
    this.setState({ hovering: value });
    console.log(this.state);
  };

  render() {
    const { image } = this.props;
    const { hovering } = this.state;

    this.lens = <div className="prd_detailed__images__main__zoom_lens"></div>;

    return (
      <div className="prd_detailed__images__main image-m">
        <img
          src={image}
          alt=""
          onMouseEnter={(e) => this.handleHover(e, true)}
          onMouseLeave={(e) => this.handleHover(e, false)}
        />
        {hovering && this.lens};
      </div>
    );
  }
}

export default PictureWithZoom;

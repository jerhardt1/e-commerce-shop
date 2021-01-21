import React, { Component } from "react";
import BubbleCounter from "./bubbleCounter";
import { Link } from "react-router-dom";

class SlideShow extends Component {
  state = {
    active: null,
  };

  componentDidMount = () => {
    this.getComponents(); // get some essential components for slideshow animation and layout
    this.setupLayout(); // reorder items to fit the animation process
    this.timeID = setInterval(() => this.handleNextSlide(1), 5000); // Start to animate the slides in a given Interval
    window.addEventListener("resize", this.handleResize);
  };

  componentDidUpdate = () => {
    clearInterval(this.timeID);
    this.timeID = setInterval(() => this.handleNextSlide(1), 5000); // Restart animation time when updated by e.g. active object
  };

  componentWillUnmount = () => {
    clearInterval(this.timeID); // Make sure to clear the timer before unmounting
    window.removeEventListener("resize", this.handleResize);
  };

  handleResize = () => {
    this.getComponents();
    this.setupLayout();
    this.handleNextSlide(1);
  };

  getComponents = () => {
    this.track = document.querySelector(".promo-track"); // use of class variables for reusability between functions
    this.trackWidth = this.track.getBoundingClientRect().width;
    this.setState({ active: this.props.data[0] }); // initialize by setting first data item to be the active item
  };

  setupLayout = () => {
    const trackItems = Array.from(this.track.children);

    trackItems.forEach((item, index) => {
      item.style.left = this.trackWidth * index + "px"; // align items one after each other in a row
    });
  };

  handleNextSlide = (value, item = null) => {
    const { data: items } = this.props;
    let { active } = this.state;

    if (item !== null) {
      active = item;
    }

    let index = items.indexOf(active);

    index += value;
    index = index >= items.length ? 0 : index;
    index = index < 0 ? items.length - 1 : index; // make sure the index restarts at 0 when out of range

    this.setState({ active: items[index] }); // set active item to the item with the new index

    this.track.style.transform =
      "translateX(-" + this.trackWidth * index + "px)";
  };

  setClassName = (item, active) => {
    let className = "promo-item";
    return item === active ? (className += "") : className;
  };

  render() {
    const { data: items, targets } = this.props;
    const { active } = this.state;

    return (
      <div className="promo">
        <div className="prev">
          <i
            className="fas fa-angle-left fa-3x"
            onClick={() => this.handleNextSlide(-1)}
          ></i>
        </div>
        <div className="next">
          <i
            className="fas fa-angle-right fa-3x"
            onClick={() => this.handleNextSlide(1)}
          ></i>
        </div>
        <div className="promo-container">
          <ul className="promo-track">
            {items.map((item, index) => (
              <li
                key={item.id}
                className={this.setClassName(item, active)}
                onClick={() => this.handleNextSlide(item)}
              >
                <Link className="link" to={`/${targets[index]}`}>
                  <img src={item.image} alt={item.title} />
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <BubbleCounter
          onChangeSlide={this.handleNextSlide}
          data={items}
          active={active}
        ></BubbleCounter>
      </div>
    );
  }
}

export default SlideShow;

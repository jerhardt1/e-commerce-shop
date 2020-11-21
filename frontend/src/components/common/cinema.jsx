import { indexOf } from "lodash";
import React, { Component } from "react";
import { paginate } from "./../../utils/paginate";
import { getTranslateX } from "./../../utils/style";
import { Link } from "react-router-dom";

class Cinema extends Component {
  state = {
    pages: 0,
    currentPage: 1,
  };

  componentDidMount = () => {
    this.setupLayout();
  };

  setupLayout = () => {
    // setup the layout of the items based on the given amount by props
    // also save some class variables for reusability later on
    const { data: items, amount: itemsPerPage } = this.props;
    this.track = document.querySelector(".cinema-track");
    this.trackWidth = this.track.getBoundingClientRect().width;
    this.trackItems = Array.from(this.track.children);
    const pages = Math.ceil(items.length / itemsPerPage);

    this.trackItems.forEach((item, index) => {
      item.style.width = this.trackWidth / itemsPerPage + "px";
      item.style.left = (this.trackWidth * index) / itemsPerPage + "px";
    });
    this.itemWidth = parseInt(this.trackItems[0].style.width);
    this.setState({ pages });
  };

  handleNextPage = (value) => {
    const { data: items, amount: itemsPerPage } = this.props;
    let { currentPage, pages } = this.state;

    const nextPage = currentPage + value; // set next page

    currentPage = nextPage > pages || nextPage <= 0 ? currentPage : nextPage; // check if out of limits

    let nextPageItems = paginate(items, currentPage, itemsPerPage); // get items for current page
    let objIndex = indexOf(items, nextPageItems[0]); // get first item out of page for transformation value

    let transformAmount = 0;
    if (nextPageItems.length === itemsPerPage) {
      // if page is full
      // multiply width of one item with the first element of a page to get right transform value
      transformAmount = this.itemWidth * objIndex;
    } else {
      // if next page is not full
      // add sum of next items' width to current transform so that there is no empty space at the end of the page
      transformAmount = Math.abs(
        getTranslateX(this.track) - this.itemWidth * nextPageItems.length
      );
    }

    this.track.style.transform = "translateX(-" + transformAmount + "px)";

    this.setState({ currentPage });
  };

  render() {
    const { title, data: items } = this.props;
    const { pages, currentPage } = this.state;

    return (
      <div className="cinema">
        {/* double check if there is content to display */}
        {items.length && (
          <React.Fragment>
            <h2 className="cinema-title">{title}</h2>

            {currentPage !== 1 && (
              <div className="prev" onClick={() => this.handleNextPage(-1)}>
                <i className="fas fa-angle-left fa-3x"></i>
              </div>
            )}

            {currentPage !== pages && (
              <div className="next" onClick={() => this.handleNextPage(1)}>
                <i className="fas fa-angle-right fa-3x"></i>
              </div>
            )}

            <div className="cinema__container">
              <ul className="cinema-track">
                {items.map((item) => (
                  <li className="cinema-item" key={item.id}>
                    <Link
                      className="cinema-item-content"
                      to={`/product/${item.id}`}
                    >
                      <div className="cinema-item-image">
                        <img src={item.image} alt={item.title} />
                      </div>
                      <div className="cinema-item-title">{item.title}</div>
                      <div className="cinema-item-price">€ {item.price}</div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </React.Fragment>
        )}
      </div>
    );
  }
}

export default Cinema;

import React, { Component } from "react";

class UserDropdown extends Component {
  state = {};

  constructor(props) {
    super(props);

    this.wrapperRef = React.createRef();
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  componentDidMount = () => {
    document.addEventListener("click", this.handleClickOutside);
  };

  componentWillUnmount = () => {
    document.removeEventListener("click", this.handleClickOutside);
  };

  handleClickOutside = (event) => {
    event.stopPropagation();
    if (this.wrapperRef && !this.wrapperRef.current.contains(event.target)) {
      this.closeDropdown(event);
    }
  };

  closeDropdown = (event) => {
    event.stopPropagation();

    this.props.handleUserClick(false);
  };

  render() {
    return (
      <div
        className="dropdown"
        ref={this.wrapperRef}
        onClick={(event) => event.stopPropagation()}
      >
        <i
          className="fas fa-times corner corner_right_top delete"
          onClick={(event) => this.closeDropdown(event)}
        ></i>
        <ul className="dropdown__items">
          <li>My account</li>
          <li>My orders</li>
          <li>My invoices</li>
          <li>more...</li>
        </ul>
        <hr />
        <button className="button button_secondary button--important">
          Log in
        </button>
        <span className="font font--highlight">
          New at buyshop? Register now
        </span>
      </div>
    );
  }
}

export default UserDropdown;

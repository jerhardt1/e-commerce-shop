import React, { Component } from "react";

class NavItem extends Component {
  state = {};
  render() {
    const { title, iconClass } = this.props;

    return (
      <React.Fragment>
        <span>
          <i className={iconClass}>
            <span className="icon icon__amount">1</span>
          </i>
        </span>
        <span>{title}</span>
      </React.Fragment>
    );
  }
}

export default NavItem;

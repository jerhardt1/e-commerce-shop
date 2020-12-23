import React, { Component } from "react";

class NavItem extends Component {
  state = {};
  render() {
    const { title, iconClass, counter } = this.props;

    return (
      <React.Fragment>
        <span>
          <i className={iconClass}>
            {!!counter && <span className="icon icon__amount">{counter}</span>}
          </i>
        </span>
        <span>{title}</span>
      </React.Fragment>
    );
  }
}

export default NavItem;

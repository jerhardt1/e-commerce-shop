import React, { Component } from "react";
import NavItem from "./common/navItem";
import { NavLink } from "react-router-dom";
import UserDropdown from "./userDropdown";

class NavbarItemList extends Component {
  state = {
    userClicked: false,
  };

  handleUserClick = (value) => {
    let { userClicked } = this.state;

    if (value) {
      userClicked = value;
    } else {
      userClicked = !userClicked;
    }

    this.setState({ userClicked });
  };

  render() {
    const { basket, wishlist } = this.props;
    const { userClicked } = this.state;

    return (
      <ul className="navbar__items">
        <li className="icon icon--labeled">
          <NavItem
            title="Service"
            iconClass="fas fa-exclamation-circle fa-3x"
          ></NavItem>
        </li>

        <li
          className="icon icon--labeled"
          onClick={() => this.handleUserClick()}
        >
          <NavItem
            title="My Account"
            iconClass="fas fa-user-circle fa-3x"
          ></NavItem>
          {userClicked && (
            <UserDropdown
              handleUserClick={(value) => this.handleUserClick(value)}
            />
          )}
        </li>
        <li className="icon icon--labeled">
          <NavLink className="icon link" to="/wishlist">
            <NavItem
              title="Wishlist"
              iconClass="far fa-heart fa-3x"
              counter={wishlist}
            ></NavItem>
          </NavLink>
        </li>
        <li className="icon icon--labeled">
          <NavLink className="icon link" to="/basket">
            <NavItem
              title="Basket"
              iconClass="fas fa-shopping-basket fa-3x"
              counter={basket}
            ></NavItem>
          </NavLink>
        </li>
      </ul>
    );
  }
}

export default NavbarItemList;

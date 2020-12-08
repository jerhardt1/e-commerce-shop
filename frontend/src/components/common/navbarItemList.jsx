import React, { Component } from "react";
import NavItem from "./navItem";

class NavbarItemList extends Component {
  state = {};
  render() {
    return (
      <ul className="navbar__items">
        <li className="icon icon--labeled">
          <NavItem
            title="Service"
            iconClass="fas fa-exclamation-circle fa-3x"
          ></NavItem>
        </li>
        <li className="icon icon--labeled">
          <NavItem
            title="My Account"
            iconClass="fas fa-user-circle fa-3x"
          ></NavItem>
        </li>
        <li className="icon icon--labeled">
          <NavItem title="Wishlist" iconClass="far fa-heart fa-3x"></NavItem>
        </li>
        <li className="icon icon--labeled">
          <NavItem
            title="Basket"
            iconClass="fas fa-shopping-basket fa-3x"
          ></NavItem>
        </li>
      </ul>
    );
  }
}

export default NavbarItemList;

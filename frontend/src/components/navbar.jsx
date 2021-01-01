import React, { Component } from "react";
import { Link } from "react-router-dom";
import NavbarItemList from "./navbarItemList";
import Searchbar from "./searchbar";

class Navbar extends Component {
  state = {};
  render() {
    const { basket, wishlist } = this.props;
    return (
      <nav className="navbar">
        <div className="navbar__logo">
          <Link to="/">
            <img
              src={require("../assets/logo.PNG")}
              alt="logo"
              className="logo"
            />
          </Link>
        </div>
        <div className="navbar__content">
          <Searchbar />
          <NavbarItemList basket={basket} wishlist={wishlist}></NavbarItemList>
        </div>
      </nav>
    );
  }
}

export default Navbar;

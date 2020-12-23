import React, { Component } from "react";
import { Link } from "react-router-dom";
import NavbarItemList from "./navbarItemList";

class Navbar extends Component {
  state = {};
  render() {
    const { basket } = this.props;
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
          <div className="search">
            <form className="form-inline my- my-lg-0">
              <input
                className="form-control mr-sm-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button
                className="btn btn-outline-success my-2 my-sm-0"
                type="submit"
              >
                Search
              </button>
            </form>
          </div>
          <NavbarItemList basket={basket}></NavbarItemList>
        </div>
      </nav>
    );
  }
}

export default Navbar;

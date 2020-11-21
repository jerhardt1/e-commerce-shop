import React, { Component } from "react";
import { Link } from "react-router-dom";

class Navbar extends Component {
  state = {};
  render() {
    return (
      <nav>
        <div className="navbar-logo-container">
          <Link to="/">
            <img
              src={require("../assets/logo.PNG")}
              alt="logo"
              className="navbar-logo"
            />
          </Link>
        </div>
        <div className="navbar-content">
          <div className="navbar-search">
            <form className="form-inline my-2 my-lg-0">
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
          <ul className="navbar-items">
            <li className="navbar-item">
              <button className="link-nav border-0 ">Products</button>
            </li>
            <li className="navbar-item">
              <button className="link-nav border-0 ">Products2</button>
            </li>
            <li className="navbar-item">
              <button className="link-nav border-0 ">Products3</button>
            </li>
            <li className="navbar-item">
              <button className="link-nav border-0 ">Products4</button>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default Navbar;

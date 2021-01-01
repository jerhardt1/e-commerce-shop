import React, { Component } from "react";
import Newsletter from "./newsletter";

class Footer extends Component {
  state = {};
  render() {
    return (
      <footer className="footer">
        <hr />
        <Newsletter />
        <hr />
        <div className="footer__misc">
          <div className="footer__misc__service">
            <h4>
              <i className="fas fa-exclamation-circle fa-1x"></i>Service
            </h4>
            <ul>
              <li>
                Questions?
                <br />
                040-3333 3333
              </li>
              <li>Free callback-service</li>
              <li>service@buyshop.de</li>
            </ul>
          </div>
          <div className="footer__misc__payments">
            <h4>Payment methods</h4>
            <ul>
              <li>PayPal</li>
              <li>paydirekt</li>
              <li>VISA</li>
              <li>On account</li>
              <li>Instalments*</li>
              <li>Payment break*</li>
              <li>Prepayment</li>
            </ul>
          </div>
          <div className="footer__misc__about">
            <h4>About us</h4>
            <ul>
              <li>Company</li>
              <li>Newsrooms</li>
              <li>Jobs</li>
              <li>AGB</li>
              <li>Data privacy</li>
              <li>Legal notice</li>
            </ul>
          </div>
        </div>
      </footer>
    );
  }
}

export default Footer;

import React, { Component } from "react";

class Newsletter extends Component {
  state = {
    expanded: false,
  };

  constructor(props) {
    super(props);
    this.ref = React.createRef();
  }

  componentDidMount = () => {};

  handleClick = () => {
    let { expanded } = this.state;

    expanded = !expanded;

    this.setState({ expanded });
  };

  getNewsletterClass = () => {
    const { expanded } = this.state;
    let name = "footer__newsletter";

    name = expanded ? name + " " + name + "--large" : name;

    return name;
  };

  getExpandText = () => {
    const { expanded } = this.state;
    let text = "...show ";

    text = expanded ? text + "less" : text + "more";
    return text;
  };

  render() {
    return (
      <div className={this.getNewsletterClass()}>
        <div className="footer__newsletter__image">
          <img src={require("../assets/newsletter.PNG")} alt="newsletter"></img>
        </div>
        <div className="footer__newsletter__content">
          <div className="footer__newsletter__caption">
            <h5>Subscribe to newsletter & secure benefits</h5>
          </div>
          <div className="footer__newsletter__email">
            <input
              type="text"
              className="input input_secondary"
              placeholder="E-Mail Adress"
            />
            <button className="button button_secondary button--thin button--m_left">
              Send
            </button>
          </div>
          <p className="text text_overflow font font--small font--thin">
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
            nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
            erat, sed diam voluptua. At vero eos et accusam et justo duo dolores
            et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est
            Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur
            sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore
            et dolore magna aliquyam erat, sed diam voluptua. At vero eos et
            accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren,
            no sea takimata sanctus est Lorem ipsum dolor sit amet.
          </p>
          <span
            onClick={() => this.handleClick()}
            className="font font--highlight font--thin font--small"
          >
            {this.getExpandText()}
          </span>
        </div>
      </div>
    );
  }
}

export default Newsletter;

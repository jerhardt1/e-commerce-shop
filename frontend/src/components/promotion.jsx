import React, { Component } from "react";
import SlideShow from "./common/slideShow";
import { getPromotions } from "./services/promotionService";

class Promotion extends Component {
  state = {
    promotions: [],
  };

  componentDidMount = async () => {
    const { data: promotions } = await getPromotions();

    this.setState({ promotions });
  };

  render() {
    const { promotions } = this.state;

    if (promotions.length === 0) {
      // Basically show nothing while data fetching is not finished
      return <div></div>;
    } else {
      return <SlideShow data={promotions}></SlideShow>;
    }
  }
}

export default Promotion;

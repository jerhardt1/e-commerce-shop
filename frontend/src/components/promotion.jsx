import React, { Component } from "react";
import SlideShow from "./common/slideShow";
import { getPromotions } from "./services/promotionService";
import Loader from "react-loader-spinner";

class Promotion extends Component {
  state = {
    promotions: [],
  };

  componentDidMount = async () => {
    const { data: promotions } = await getPromotions();

    this.setState({ promotions });
  };

  render() {
    const promotions = [...this.state.promotions];
    let targets = [];
    promotions.forEach((promotion) => targets.push(promotion.tag));

    if (promotions.length === 0) {
      return (
        <div className="loader">
          <Loader color="#848484" type={"TailSpin"} height={50} width={50} />
        </div>
      );
    } else {
      return <SlideShow data={promotions} targets={targets}></SlideShow>;
    }
  }
}

export default Promotion;

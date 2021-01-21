import React, { Component } from "react";
import { getProducts } from "./services/productService";
import Cinema from "./common/cinema";
import Loader from "react-loader-spinner";

class Recommendations extends Component {
  state = {
    products: [],
  };

  componentDidMount = async () => {
    const { data: products } = await getProducts();

    this.setState({ products });
  };

  render() {
    const { products } = this.state;
    return (
      <div>
        {!!products.length ? (
          <Cinema
            title="Recommendations for you"
            data={products}
            amount={5}
          ></Cinema>
        ) : (
          <div className="loader">
            <Loader color="#ffffff" type={"TailSpin"} height={30} width={30} />
          </div>
        )}
      </div>
    );
  }
}

export default Recommendations;

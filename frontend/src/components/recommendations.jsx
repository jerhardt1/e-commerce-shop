import React, { Component } from "react";
import { getProducts } from "./services/productService";
import Cinema from "./common/cinema";

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
        {/* only render if products stae has content */}
        {products.length && (
          <Cinema
            title="Recommendations for you"
            data={products}
            amount={5}
          ></Cinema>
        )}
      </div>
    );
  }
}

export default Recommendations;

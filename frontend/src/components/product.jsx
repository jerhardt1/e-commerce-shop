import React, { Component } from "react";
import { getProduct } from "./services/productService";

class Product extends Component {
  state = {
    product: [],
  };

  componentDidMount = async () => {
    const productId = this.props.match.params.id;
    const { data: product } = await getProduct(productId);
    this.setState({ product });
  };

  render() {
    const { product } = this.state;

    return (
      <div className="App container-lg">
        <div className="row"></div>
        <div className="col">
          <h5>{product.title}</h5>
          <img src={product.image} alt="" className="product-image" />
        </div>
        <div className="col">{product.price} €</div>
        <div className="row">
          <p>{product.description}</p>
        </div>
      </div>
    );
  }
}

export default Product;

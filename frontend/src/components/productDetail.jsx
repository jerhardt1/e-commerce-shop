import React, { Component } from "react";
import { getProduct } from "./services/productService";
import ColorSelection from "./common/colorSelection";
import SizeSelection from "./common/sizeSelection";

class Product extends Component {
  state = {
    product: [],
  };

  componentDidMount = async () => {
    const productId = this.props.match.params.id;
    const { data: product } = await getProduct(productId);

    this.setState({ product });
  };

  addToBasket = () => {
    const { product } = this.state;
    const content = { id: product.id, amount: 1 };
    let basket = JSON.parse(localStorage.getItem("basket"));

    function itemInBasket() {
      // check all items in basket if contain same id as product
      for (var i in basket) {
        if (basket[i].id === product.id) {
          // add 1 to prevent index of 0, allowing True/False check
          return parseInt(i) + 1;
        }
      }
      return 0;
    }

    const item = itemInBasket();

    if (item) {
      // increment amount in object
      basket[item - 1].amount = basket[item - 1].amount + 1;
    } else {
      if (basket) {
        // append new product at the end of array
        basket[basket.length] = content;
      } else {
        // create new array with product inside
        basket = [content];
      }
    }

    localStorage.setItem("basket", JSON.stringify(basket));
  };

  render() {
    const { product } = this.state;

    return (
      <div className="wrapper-full">
        <div className="wrapper-m">
          <h5>{product.title}</h5>
          <div className="prd_detailed">
            <div className="prd_detailed__images">
              <div className="image-scroll image-scroll--vertical">
                <img src={product.image} alt="" />
                <img src={product.image} alt="" />
                <img src={product.image} alt="" />
              </div>
              <div className="image-m">
                <img src={product.image} alt="" />
              </div>
            </div>
            <div className="prd_detailed__content">
              {product.colors && (
                <ColorSelection data={product.colors}></ColorSelection>
              )}
              {product.sizes && (
                <SizeSelection data={product.sizes}></SizeSelection>
              )}
              <div className="product-delivery">
                <span className="font--bold">delivery within 2-3 days</span>
              </div>
              <hr></hr>
              <div className="prd_price">
                <span className="prd_price__amount">€ {product.price}</span>
                <span className="prd_price__note">
                  including VAT and delivery
                </span>
              </div>
              <div className="button_group">
                <button
                  className="button button_primary button--important"
                  onClick={this.addToBasket}
                >
                  Add to Basket
                </button>
                <button className="button button_primary">
                  Add to Wishlist
                </button>
              </div>
            </div>
          </div>

          <hr></hr>

          <div className="product_description">
            <p>{product.description}</p>
          </div>
        </div>
      </div>
    );
  }
}

export default Product;

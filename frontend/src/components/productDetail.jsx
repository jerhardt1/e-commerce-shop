import React, { Component } from "react";
import { getProduct } from "./services/productService";
import ColorSelection from "./common/colorSelection";
import SizeSelection from "./common/sizeSelection";
import * as Storage from "../utils/localStorage";

class Product extends Component {
  state = {
    product: [],
    activeColor: null,
    activeSize: null,
  };

  componentDidMount = async () => {
    const productId = this.props.match.params.id;
    const { data: product } = await getProduct(productId);

    this.setState({ product });
  };

  setSize = (activeSize) => this.setState({ activeSize });

  setColor = (activeColor) => this.setState({ activeColor });

  itemInStorage = (object1, object2) => {
    // check all items in object1 if contain same attributes as object2
    for (var i in object1) {
      if (
        object1[i].id === object2.id &&
        // stringify for simple object comparison
        JSON.stringify(object1[i].color) === JSON.stringify(object2.color) &&
        object1[i].size === object2.size
      ) {
        // add 1 to prevent index of 0, allowing True/False check
        // index of actual item will be i-1
        return parseInt(i) + 1;
      }
    }
    return 0;
  };

  // this checks the local storage if an object/product is already inside or not
  // it also executes a callback function to update the state of an parent component
  // to update the amount display in the navbar
  handleStorageChange = (object1, object2, amount, callback) => {
    const item = this.itemInStorage(object1, object2);
    let output = object1;

    if (item) {
      // increment amount in object
      object1[item - 1].amount = object1[item - 1].amount + 1;
    } else {
      if (object1) {
        // append new product at the end of array
        object1[object1.length] = object2;
        // update navbar amount display
        callback(amount + 1);
      } else {
        // create new array with object/product inside
        output = [object2];
        // update navbar amount display
        callback(1);
      }
    }
    return output;
  };

  addToBasket = () => {
    const { product, activeColor, activeSize } = this.state;
    const { basket: basketAmount, setBasket } = this.props;
    const content = {
      id: product.id,
      amount: 1,
      color: activeColor,
      size: activeSize,
    };
    let basket = Storage.get("basket");

    // check if the product has sizes and if one is selected
    if (product.sizes.length && activeSize === null) {
      alert("Please select a size");
      return;
    }

    const newEntry = this.handleStorageChange(
      basket,
      content,
      basketAmount,
      setBasket
    );

    Storage.set("basket", newEntry);
  };

  addToWishlist = () => {
    const { product, activeColor, activeSize } = this.state;
    const { wishlist: wishlistAmount, setWishlist } = this.props;
    const content = {
      id: product.id,
      amount: 1,
      color: activeColor,
      size: activeSize,
    };
    let wishlist = Storage.get("wishlist");

    if (product.sizes.length && activeSize === null) {
      alert("Please select a size");
      return;
    }

    const newEntry = this.handleStorageChange(
      wishlist,
      content,
      wishlistAmount,
      setWishlist
    );

    Storage.set("wishlist", newEntry);
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
                <ColorSelection
                  data={product.colors}
                  onColorChange={(color) => this.setColor(color)}
                ></ColorSelection>
              )}
              {product.sizes && (
                <SizeSelection
                  data={product.sizes}
                  onSizeChange={(size) => this.setSize(size)}
                ></SizeSelection>
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
                <button
                  className="button button_primary"
                  onClick={this.addToWishlist}
                >
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

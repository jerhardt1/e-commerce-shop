import React, { Component } from "react";
import { getProduct } from "./services/productService";
import { Link } from "react-router-dom";
import * as Storage from "../utils/localStorage";

class Basket extends Component {
  state = {
    products: [],
    basket: [],
    subtotal: 0,
    shippingCost: 5.95,
  };

  constructor(props) {
    super(props);
    this.getBasket();
  }

  componentDidMount = () => {};

  getBasket = async () => {
    const basket = Storage.get("basket");
    if (!basket) return;
    let products = [];
    let basketInfo = [];
    await Promise.all(
      basket.map(async (item, index) => {
        try {
          let promise = await getProduct(item.id);
          products[index] = promise.data;
          basketInfo[index] = {
            id: item.id,
            amount: item.amount,
            color: item.color ? item.color : null,
            size: item.size ? item.size : null,
            itemPrice: parseFloat(products[index].price),
            totalPrice: item.amount * parseFloat(products[index].price),
          };
        } catch (error) {
          console.log("error" + error);
        }
      })
    );

    this.setState({ products, basket: basketInfo });
  };

  handleAmountChange = (event, index) => {
    // get new value/amount from event
    const value = parseInt(event.target.value);
    // get current state
    let basket = [...this.state.basket];
    // get the right object from the state
    let newBasketItem = { ...basket[index] };

    // update the values inside the object
    newBasketItem.amount = value;
    newBasketItem.totalPrice = parseFloat(
      (value * newBasketItem.itemPrice).toFixed(2)
    );
    // update the state/basket with new object
    basket[index] = newBasketItem;

    Storage.update("basket", basket);

    this.setState({ basket });
  };

  handleDelete = (index) => {
    const { products, basket } = this.state;
    products.splice(index, 1);
    basket.splice(index, 1);

    Storage.update("basket", basket);

    this.props.setBasket(this.getItemAmounts(basket));
    this.setState({ products, basket });
  };

  getOptions = () => {
    const options = [];

    // generate a bunch of <option> elements and set it's value to of i+1
    for (var i = 0; i <= 49; i++) {
      let optionsValue = i + 1;
      options[i] = (
        <option key={i} value={optionsValue}>
          {i + 1}
        </option>
      );
    }
    return options;
  };

  getItemAmounts = (basket = this.state.basket) => {
    let total = 0;

    basket.forEach(() => (total += 1));

    return total;
  };

  getSubTotal = () => {
    const { basket } = this.state;
    let total = 0;

    basket.forEach((item) => (total += item.totalPrice));

    return parseFloat(total.toFixed(2));
  };

  getGrandTotal = () => {
    const { basket, shippingCost } = this.state;
    let total = 0;

    basket.forEach((item) => (total += item.totalPrice));

    total += shippingCost;

    return parseFloat(total.toFixed(2));
  };

  handleCheckout = () => {
    alert(
      "Unfortunately, the current version of this demo does not allow to proceed to checkout yet. :)"
    );
  };

  getDetails = (index) => {
    const { basket } = this.state;

    const color = basket[index].color ? basket[index].color.color : null;
    const size = basket[index].size;

    if (color && size) {
      return color + ", " + size;
    } else if (color && !size) {
      return color;
    } else if (!color && size) {
      return size;
    } else {
      return;
    }
  };

  render() {
    const { products, basket, shippingCost } = this.state;

    return (
      <div className="wrapper-m">
        <div className="row">
          <ol className="process">
            <li>My Basket</li>
            <li>Log In</li>
            <li>Check & Send</li>
            <li>Thanks!</li>
          </ol>
          {!!products.length && (
            <button
              className="button button_secondary button--important"
              onClick={() => this.handleCheckout()}
            >
              Checkout &gt;
            </button>
          )}
        </div>
        <div className="basket">
          <div className="basket__header">
            <span className="basket__header__retailerName">buyshop</span>
            <span className="basket__header__quantity">Amount</span>
            <span className="basket__header__price">Total Price (€)</span>
            <span className="basket__header__delete">Delete</span>
          </div>
          <hr></hr>
          {products.length ? (
            <div className="basket__body">
              {products.map((product, index) => (
                <div key={index} className="basketItem">
                  <div className="basketItem__image">
                    <img src={product.image} alt={product.title}></img>
                  </div>
                  <div className="basketItem__info">
                    <h6 className="font font--bold">{product.title}</h6>
                    <h6>{this.getDetails(index)}</h6>
                    <h6>(€ {product.price})</h6>
                  </div>
                  <div className="basketItem__quantity">
                    {!!products.length && (
                      <select
                        //onChange pass event (and it's value) and the current index to update state
                        onChange={(e) => this.handleAmountChange(e, index)}
                        //default value equals to the basket's amount at given array index of the product
                        defaultValue={basket[index].amount}
                      >
                        {/* get a bunch of <option> elements and fill up with numbers*/}
                        {this.getOptions()}
                      </select>
                    )}
                  </div>
                  <div className="basketItem__price">
                    {/* item price = product's price *  amount in the basket */}
                    {parseFloat(basket[index].totalPrice.toFixed(2))}
                  </div>
                  <div className="basketItem__delete">
                    <button
                      className="delete"
                      onClick={() => this.handleDelete(index)}
                    >
                      X
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="basket__body">
              <p className="basketItem">There are no items in your basket.</p>
            </div>
          )}
          <hr></hr>
          {!!products.length && (
            <div className="basket__footer">
              <div className="subtotal">
                <div className="row">
                  <span className="font font--bold">Subtotal</span>
                  <span>{this.getSubTotal()}</span>
                </div>
                <div className="row">
                  <span>Shipping cost</span>
                  <span>{shippingCost}</span>
                </div>
              </div>
              <hr></hr>
              <div className="grandTotal">
                <div className="row">
                  <span className="font font--bold font--large">
                    Grand Total
                  </span>
                  <span className="font font--bold font--large">
                    {this.getGrandTotal()}
                  </span>
                </div>
                <div className="row">
                  <span className="font font--soft font--small">
                    all information in Euro, incl. VAT
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="row">
          <Link to="">
            <button className="button button_secondary">
              &lt; Continue shopping
            </button>
          </Link>
          <button
            className="button button_secondary button--important"
            onClick={() => this.handleCheckout()}
          >
            Checkout &gt;
          </button>
        </div>
      </div>
    );
  }
}

export default Basket;

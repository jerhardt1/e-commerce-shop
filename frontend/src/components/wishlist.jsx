import React, { Component } from "react";
import { toast } from "react-toastify";

import { getProduct } from "./services/productService";
import * as Storage from "../utils/localStorage";
import ViewModes from "../utils/viewModes.json";
import WishlistBodyDetailed from "./wishlistBodyDetailed";
import WishlistBodySimple from "./wishlistBodySimple";

class Wishlist extends Component {
  state = {
    products: [],
    wishlist: [],
    activeViewMode: null,
  };

  constructor(props) {
    super(props);
    this.getWishlist();
  }

  setViewmode = (mode) => this.setState({ activeViewMode: mode });

  getViewClass = (index) => {
    const { activeViewMode } = this.state;
    const viewModes = ViewModes.modes;
    const name = "viewSwitch__body__option";
    const active = name + " font--bold font--important";

    if (activeViewMode === null) {
      return index > 0 ? name : active;
    } else {
      return activeViewMode === viewModes[index] ? active : name;
    }
  };

  getWishlist = async () => {
    const wishlist = Storage.get("wishlist");
    if (!wishlist) return;
    let products = [];
    let wishlistInfo = [];
    await Promise.all(
      wishlist.map(async (item, index) => {
        try {
          let promise = await getProduct(item.id);
          products[index] = promise.data;
          wishlistInfo[index] = {
            id: item.id,
            amount: item.amount,
            color: item.color ? item.color : null,
            size: item.size ? item.size : null,
            itemPrice: parseFloat(products[index].price),
            totalPrice: item.amount * parseFloat(products[index].price),
          };
        } catch (error) {
          console.log("error " + error);
        }
      })
    );

    this.setState({ products, wishlist: wishlistInfo });
  };

  itemInBasket = (index) => {
    const basket = Storage.get("basket");
    const { wishlist } = this.state;
    const object = wishlist[index];

    for (var i in basket) {
      if (
        basket[i].id === object.id &&
        // stringify for simple object comparison
        JSON.stringify(basket[i].color) === JSON.stringify(object.color) &&
        basket[i].size === object.size
      ) {
        return true;
      }
    }
    return false;
  };

  handleBasket = (index) => {
    const { products, wishlist } = this.state;
    const item = wishlist[index];
    const newItem = {
      id: item.id,
      amount: item.amount,
      color: item.color,
      size: item.size,
    };
    const basket = Storage.get("basket");

    if (!basket) {
      Storage.set("basket", []);
    }

    function itemInStorage(storageArray, object) {
      // check all items in storageArray if contain same properties/keys as object
      for (var i in storageArray) {
        if (
          storageArray[i].id === object.id &&
          // stringify for simple object comparison
          JSON.stringify(storageArray[i].color) ===
            JSON.stringify(object.color) &&
          storageArray[i].size === object.size
        ) {
          // increment the amount in the basket if object exists already
          basket[i].amount = basket[i].amount + 1;
          Storage.update("basket", basket);
          return true;
        }
      }
      return false;
    }

    if (!itemInStorage(basket, newItem) || basket.length === 0) {
      Storage.insert("basket", newItem);
    }

    toast("Item added to basket!", {
      hideProgressBar: true,
      autoClose: 2000,
    });

    this.props.setBasket(Storage.getAmount("basket"));
    this.props.setWishlist(Storage.getAmount("wishlist"));
    this.setState({ products, wishlist });
  };

  handleDelete = (index) => {
    const { products, wishlist } = this.state;
    products.splice(index, 1);
    wishlist.splice(index, 1);

    Storage.update("wishlist", wishlist);

    this.props.setWishlist(Storage.getAmount("wishlist"));
    this.setState({ products, wishlist });
  };

  getDetails = (index) => {
    const { wishlist } = this.state;

    const color = wishlist[index].color ? wishlist[index].color.color : null;
    const size = wishlist[index].size;

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

  getCaption = () => {
    const itemAmount = Storage.getAmount("wishlist");
    let caption = itemAmount + " Item";

    caption = itemAmount === 1 ? caption : caption + "s";

    return caption;
  };

  render() {
    const { products, activeViewMode } = this.state;
    const viewModes = ViewModes.modes;
    const iconClasses = ViewModes.iconClasses;

    return (
      <div className="wrapper-m">
        <div className="grid">
          <div className="grid__sidebar">
            <div className="viewSwitch">
              <div className="viewSwitch__header">
                <span className="viewSwitch__header__title font font--bold">
                  View
                </span>
              </div>
              <hr />
              <ul className="viewSwitch__body">
                {viewModes.map((mode, index) => (
                  <li
                    key={index}
                    className={this.getViewClass(index)}
                    onClick={() => this.setViewmode(mode)}
                  >
                    {" "}
                    <span> </span>
                    <i className={iconClasses[index]}></i>
                    {mode}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="grid__header">
            <h2 className="font font--thin">My Wishlist</h2>
          </div>
          <div className="grid__main">
            <div className="wishlist">
              <div className="wishlist__header">
                <span className="wishlist__header__title">
                  {this.getCaption()}
                </span>
              </div>
              <hr></hr>
              {products.length ? (
                activeViewMode === "List" || activeViewMode === null ? (
                  <WishlistBodyDetailed
                    products={products}
                    getDetails={(index) => this.getDetails(index)}
                    itemInBasket={(index) => this.itemInBasket(index)}
                    handleBasket={(index) => this.handleBasket(index)}
                    handleDelete={(index) => this.handleDelete(index)}
                  />
                ) : (
                  <WishlistBodySimple products={products} />
                )
              ) : (
                <div className="wishlist__body">
                  <p className="wishlistItem">Your wishlist is empty.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Wishlist;

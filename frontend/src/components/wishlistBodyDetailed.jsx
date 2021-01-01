import React, { Component } from "react";
import { Link } from "react-router-dom";

class WishlistBodyDetailed extends Component {
  state = {};
  render() {
    const {
      handleBasket,
      handleDelete,
      itemInBasket,
      products,
      getDetails,
    } = this.props;

    return (
      <div className="wishlist__body">
        {products.map((product, index) => (
          <div key={index} className="wishlistItem">
            <div className="wishlistItem__image">
              <Link to={`/product/${product.id}`}>
                <img src={product.image} alt={product.title}></img>
              </Link>
            </div>
            <div className="wishlistItem__info">
              {itemInBasket(index) && (
                <span className="banner">Already in basket</span>
              )}
              <Link to={`/product/${product.id}`}>
                <h6 className="font font--bold">{product.title}</h6>
              </Link>
              <h6>{getDetails(index)}</h6>
              <div className="row row--start">
                <button
                  className="button button_fit"
                  onClick={() => handleBasket(index)}
                >
                  <i className="fas fa-shopping-basket fa-1x"></i>
                  <span> </span>
                  Add to basket
                </button>
                <button
                  className="button button_fit"
                  onClick={() => handleDelete(index)}
                >
                  X
                </button>
              </div>
            </div>
            <div className="wishlistItem__price">€ {product.price}</div>
          </div>
        ))}
      </div>
    );
  }
}

export default WishlistBodyDetailed;

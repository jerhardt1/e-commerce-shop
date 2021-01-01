import React, { Component } from "react";
import { Link } from "react-router-dom";

class WishlistBodySimple extends Component {
  state = {};
  render() {
    const { products } = this.props;

    return (
      <div className="wishlist__body--simple">
        {products.map((product, index) => (
          <div key={index} className="wishlistItem wishlistItem--large">
            <div className="wishlistItem__image">
              <Link to={`/product/${product.id}`}>
                <img src={product.image} alt={product.title}></img>
              </Link>
            </div>
          </div>
        ))}
      </div>
    );
  }
}

export default WishlistBodySimple;

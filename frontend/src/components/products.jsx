import React, { Component } from "react";
import { Link } from "react-router-dom";

class Products extends Component {
  render() {
    const { data: products } = this.props;

    return (
      <div className="products-grid">
        {products.map((product) => (
          <div key={product.id} className="prd_card">
            <Link className="link" to={`/product/${product.id}`}>
              <img src={product.image} alt="" className="card-img-top" />
            </Link>
            <div className="prd_card__content">
              <h5 key={product.id} className="card-title">
                <Link className="link" to={`product/${product.id}`}>
                  {product.title}
                </Link>
              </h5>
              <div className="card-text">{product.price} €</div>
            </div>
          </div>
        ))}
      </div>
    );
  }
}

export default Products;

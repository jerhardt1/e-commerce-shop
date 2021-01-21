import React, { Component } from "react";
import { Link } from "react-router-dom";
import Loader from "react-loader-spinner";

class Products extends Component {
  render() {
    const { data: products } = this.props;

    return (
      <div className="products-grid">
        {products.length ? (
          <React.Fragment>
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
          </React.Fragment>
        ) : (
          <div className="loader">
            <Loader color="#ffffff" type={"TailSpin"} height={30} width={30} />
          </div>
        )}
      </div>
    );
  }
}

export default Products;

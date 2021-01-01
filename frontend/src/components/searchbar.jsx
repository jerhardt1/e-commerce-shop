import React, { Component } from "react";
import { getProducts } from "./services/productService";

class Searchbar extends Component {
  state = {};

  handleQuery = async (event) => {
    let query = event.target.value;
    let results = await this.startQuery(query);
  };

  startQuery = async (query) => {
    let products = await getProducts();
    let filtered = products;
    let filteredBySubCategory = products;
    let filteredByCategory = products;

    // if products have been successfully fetched,
    // if it contains the substring/query,
    // filter the data by title, subCategory and Category
    // join results together in the respective order
    // products by title...by subCategory...by Category
    // only append if item not already inside array
    if (products) {
      filtered = products.data.filter((product) =>
        product.title.toUpperCase().includes(query.toUpperCase())
      );
      filteredBySubCategory = products.data.filter((product) =>
        product.subCategory.toUpperCase().includes(query.toUpperCase())
      );
      filteredByCategory = products.data.filter((product) =>
        product.category.toUpperCase().includes(query.toUpperCase())
      );
      filteredBySubCategory.forEach(
        (item) => !filtered.includes(item) && filtered.push(item)
      );
      filteredByCategory.forEach(
        (item) => !filtered.includes(item) && filtered.push(item)
      );
    }

    return filtered;
  };

  render() {
    return (
      <div className="search">
        <form className="form-inline my- my-lg-0">
          <input
            className="form-control mr-sm-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
            onChange={(event) => this.handleQuery(event)}
          />
          <button
            className="btn btn-outline-success my-2 my-sm-0"
            type="submit"
          >
            Search
          </button>
        </form>
      </div>
    );
  }
}

export default Searchbar;

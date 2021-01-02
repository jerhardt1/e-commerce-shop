import React, { Component } from "react";
import SearchResults from "./searchResults";
import { getProducts } from "./services/productService";

class Searchbar extends Component {
  state = {
    results: [],
    blur: true,
  };

  handleQuery = async (event) => {
    let query = event.target.value;
    let results = await this.startQuery(query);
    this.setState({ results, blur: false });
  };

  handleBlur = () => {
    window.setTimeout(() => {
      this.setState({ blur: true });
    }, 100);
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
    const { results, blur } = this.state;
    return (
      <div className="search">
        <form className="search__form">
          <input
            className="search__form__bar"
            type="search"
            placeholder="Search"
            aria-label="Search"
            onChange={(event) => this.handleQuery(event)}
            onBlur={() => this.handleBlur()}
          />
          <button
            className="button button_secondary button--important button--square"
            type="submit"
          >
            <i className="fas fa-search"></i>
          </button>
        </form>

        {!blur && <SearchResults results={results} />}
      </div>
    );
  }
}

export default Searchbar;

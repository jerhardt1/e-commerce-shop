import React, { Component } from "react";
import ProductGroup from "./productGroup";
import Articles from "./products";
import { getProducts } from "./services/productService";
import { getCategories } from "./services/categoryService";
import Navigation from "./navigation";

class MainPage extends Component {
  state = {
    products: [],
    categories: [],
    subCategories: [],
    selectedCategory: null,
    selectedTag: null,
    navigation: ["Products"],
  };

  componentDidMount = async () => {
    const { data: products } = await getProducts();
    const { data: categories } = await getCategories();
    this.setState({ products, categories }); // get data from api and save in state
    this.getSubCategories();
  };

  handlePathChange = (path) => {
    const navigation = ["Products"];
    navigation.push(path);
    console.log(navigation);
    return;
  };

  getSubCategories = () => {
    const { categories: allCategories } = this.state;

    let subCategories = allCategories;
    subCategories = allCategories.filter(
      (category) => category.category != null // if category has a parent object then it's subcategory
    );
    let categories = allCategories.filter(
      (category) => !subCategories.includes(category) // if the category is not in the subcategories array it's a main category
    );
    this.setState({ categories, subCategories });
  };

  getFilteredData = () => {
    const { products: allProducts, categories, selectedCategory } = this.state;

    let filtered = allProducts; // return all products, if nothing selected
    if (selectedCategory != null)
      if (
        categories.find(
          (category) => category["productType"] === selectedCategory // try to find the selected Category inside the main categories
        )
      ) {
        filtered = allProducts.filter(
          (product) => product.category === selectedCategory // return all items inside the main category
        );
      } else {
        filtered = allProducts.filter(
          (product) => product.subCategory === selectedCategory // otherwise return items belonging to the subcategory
        );
      }

    return { data: filtered };
  };

  handleTagSelect = (tag) => {
    this.setState({ selectedTag: tag });
    console.log(this.state.selectedTag);
  };

  handleCategorySelect = (category, event) => {
    event.stopPropagation();
    this.setState({ selectedCategory: category });
  };

  render() {
    const { products, categories, subCategories, navigation } = this.state;
    const { data: filteredProducts } = this.getFilteredData(); // return the right products on the selected filter

    return (
      <React.Fragment>
        <Navigation path={navigation}></Navigation>
        <div className="products-row">
          <div className="products-col">
            <ProductGroup
              onCategorySelect={this.handleCategorySelect}
              products={products}
              categories={categories}
              subCategories={subCategories}
            ></ProductGroup>
          </div>
          <div className="products-col">
            <Articles data={filteredProducts}></Articles>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default MainPage;

import React, { Component } from "react";
import ProductGroup from "./productGroup";
import Products from "./products";
import { getProducts } from "./services/productService";
import { getCategories, getTags } from "./services/categoryService";
import Navigation from "./navigation";

class MainPage extends Component {
  state = {
    products: [],
    categories: [],
    subCategories: [],
    selectedCategory: null,
    selectedTag: null,
    // navigation: ["Homepage"],
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.match.params.id !== prevState.selectedTag) {
      return {
        products: prevState.products,
        categories: prevState.categories,
        subCategories: prevState.subCategories,
        selectedCategory: null,
        selectedTag: nextProps.match.params.id,
      };
    }
    return null;
  }

  componentDidMount = async () => {
    const { data: products } = await getProducts();
    const { data: categories } = await getCategories();
    this.setState({ products, categories, selectedTag: this.getActiveTag() }); // get data from api and save in state
    this.getSubCategories();
    // this.getCurrentPath();
  };

  // componentDidUpdate = (prevProps) => {
  //   if (prevProps.match.params.id !== this.props.match.params.id){
  //     this.setState({selectedTag: prevProps.match.params.id})
  //   }
  // }

  // getCurrentPath = () => {
  //   const { navigation } = this.state;
  //   const location = this.props.match.params.id;

  //   navigation.push(location);
  //   this.setState(navigation);
  // };

  // handlePathChange = (path) => {
  //   const navigation = ["Products"];
  //   navigation.push(path);
  //   console.log(navigation);
  //   return;
  // };

  getActiveTag = () => {
    return this.props.match.params.id;
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

  getProductsByTag = () => {
    const { products, selectedTag } = this.state;
    let filtered = products;

    filtered = products.filter((item) =>
      item.tags.find((tag) => tag.name === selectedTag)
    );

    return filtered;
  };

  getFilteredData = () => {
    const {
      products: allProducts,
      categories,
      selectedCategory,
      selectedTag,
    } = this.state;

    let filtered = allProducts; // return all products, if nothing selected
    filtered = this.getProductsByTag();
    if (selectedCategory !== null)
      if (
        categories.find(
          (category) => category["productType"] === selectedCategory // try to find the selected Category inside the main categories
        )
      ) {
        filtered = filtered.filter(
          (product) => product.category === selectedCategory // return all items inside the main category
        );
      } else {
        filtered = filtered.filter(
          (product) => product.subCategory === selectedCategory // otherwise return items belonging to the subcategory
        );
      }

    return { data: filtered };
  };

  handleTagSelect = (tag) => {
    this.setState({ selectedTag: tag });
  };

  handleCategorySelect = (category, event) => {
    event.stopPropagation();
    this.setState({ selectedCategory: category });
  };

  render() {
    const { categories, subCategories } = this.state;
    const { data: filteredProducts } = this.getFilteredData(); // return the right products on the selected filter

    return (
      <React.Fragment>
        {/* <Navigation path={navigation}></Navigation> */}
        <div className="products-row">
          <div className="products-col">
            <ProductGroup
              onCategorySelect={this.handleCategorySelect}
              products={this.getProductsByTag()}
              categories={categories}
              subCategories={subCategories}
            ></ProductGroup>
          </div>
          <div className="products-col">
            <Products data={filteredProducts}></Products>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default MainPage;

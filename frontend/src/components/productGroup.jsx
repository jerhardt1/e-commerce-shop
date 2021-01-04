import React, { Component } from "react";

class ProductGroup extends Component {
  state = {
    selectedCategory: null,
  };

  getClassName = (category) => {
    let name = "list-group-item border-0 category-item";
    console.log(category, this.state.selectedCategory);

    name =
      category === this.state.selectedCategory
        ? name + " font--important"
        : name;

    return name;
  };

  setCategory = (category, event) => {
    const { onCategorySelect } = this.props;

    this.setState({ selectedCategory: category });
    onCategorySelect(category, event);
  };

  render() {
    const {
      products,
      categories,
      subCategories,
      onCategorySelect,
    } = this.props;

    return (
      <div>
        <ul className="list-group border-0">
          {categories.map((category) => (
            <li
              key={category.id}
              className="list-group-item border-0 category-item"
              onClick={(e) => this.setCategory(category.productType, e)} // pass this event for event.stopPropagation
            >
              <strong>{category.productType}</strong>
              <span className="amount-heavy">
                (
                {
                  products.filter(
                    (product) => product.category === category.productType // get total amount of items with this category
                  ).length
                }
                )
              </span>
              <hr></hr>
              <ul className="list-group">
                {subCategories
                  .filter(
                    (subCategory) =>
                      subCategory.category === category.productType
                  )
                  .map((subCategory) => (
                    <li
                      key={subCategory.id}
                      className="list-group-item border-0 category-item"
                      onClick={
                        (e) => this.setCategory(subCategory.productType, e) // pass this event for event.stopPropagation
                      }
                    >
                      {subCategory.productType}
                      <span className="amount">
                        (
                        {
                          products.filter(
                            (product) =>
                              product.subCategory === subCategory.productType // get total amount of items with this subcategory
                          ).length
                        }
                        )
                      </span>
                    </li>
                  ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default ProductGroup;

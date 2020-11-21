import React, { Component } from "react";

class ProductGroup extends Component {
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
              onClick={(e) => onCategorySelect(category.productType, e)} // pass this event for event.stopPropagation
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
                      className="list-group-item  border-0 category-item"
                      onClick={
                        (e) => onCategorySelect(subCategory.productType, e) // pass this event for event.stopPropagation
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

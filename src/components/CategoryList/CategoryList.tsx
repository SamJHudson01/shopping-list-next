import React from "react";
import { FixedCategories } from "../../utils/fixedCategories";
import Category from "../Category/Category";
import "./CategoryList.css";

const CategoryList = () => {
  return (
    <div className="category-list">
      <h4>Category List</h4>
      {FixedCategories.map((category) => (
        <Category
          key={category.id}
          name={category.name}
          color={category.color}
          id={category.id}
        />
      ))}
    </div>
  );
};

export default CategoryList;

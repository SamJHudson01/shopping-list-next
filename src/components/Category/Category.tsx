import React from "react";
import "./Category.css";

const Category = ({ id, name, color }) => {
  return (
    <div className="category">
      <p className="category-name">{name}</p>
    </div>
  );
};

export default Category;

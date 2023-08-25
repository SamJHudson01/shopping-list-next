import React from "react";
import "./Category.css";

const Category = ({ id, name, color }) => {
  return (
    <div className="category" style={{ borderBottom: `3px solid ${color}` }}>
      <p className="category-name">{name}</p>
    </div>
  );
};

export default Category;

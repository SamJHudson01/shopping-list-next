import React, { useState, useEffect, use } from "react";
import "./AddItemModal.css";
import { FixedCategories } from "../../utils/fixedCategories";

const AddItemModal = ({ onCloseModal, onUpdate }) => {
  const [itemName, setItemName] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [categoryValue, setCategoryValue] = useState(null);

  const handleItemNameChange = (e) => {
    setItemName(e.target.value);
  };

  const handleQuantityChange = (e) => {
    setQuantity(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setCategoryValue(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const input = e.target.querySelector("input");
    const quantityValue = Number(
      e.target.querySelector("input[type=number]").value
    );
    const inputValue = input.value;
    if (!inputValue) {
      return;
    }
    const categoryValue = e.target.querySelector("select").value;
    const data = {
      name: inputValue,
      quantity: quantityValue,
      category_id: categoryValue,
    };
    const response = await fetch("/api/items", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const result = await response.json();
    input.value = "";
    onUpdate();
    onCloseModal();
  };

  // useEffect(() => {
  //   setItemName("");
  //   setQuantity(1);
  //   setCategoryValue(null);
  // }, [categoryValue]);

  return (
    <div className="modal">
      <div className="modal__overlay" onClick={onCloseModal}>
        <div className="modal__container" onClick={(e) => e.stopPropagation()}>
          <button
            className="modal__close-button"
            type="button"
            onClick={onCloseModal}
          ></button>
          <form className="modal__form" onSubmit={handleSubmit}>
            <h2 className="modal__form-title">Add Item</h2>
            <label className="modal__input-label" htmlFor="name">
              Item name
            </label>
            <input
              className="modal__input"
              id="name"
              name="name"
              type="text"
              required
              value={itemName}
              onChange={handleItemNameChange}
            />
            <label className="modal__input-label" htmlFor="quantity">
              Quantity
            </label>
            <input
              className="modal__input"
              id="quantity"
              name="quantity"
              type="number"
              value={quantity}
              onChange={handleQuantityChange}
            />
            <label className="modal__input-label" htmlFor="category">
              Category
            </label>
            <select
              className="modal__input"
              id="category"
              name="category"
              onChange={handleCategoryChange}
            >
              {FixedCategories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
            <button
              className={
                itemName === ""
                  ? "modal__submit-button modal__submit-button_disabled"
                  : "modal__submit-button"
              }
              type="submit"
              disabled={itemName === ""}
            >
              {" "}
              Add Item{" "}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddItemModal;

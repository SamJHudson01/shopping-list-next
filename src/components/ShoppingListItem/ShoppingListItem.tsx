import React, { useEffect } from "react";
import "./ShoppingListItem.css";
import { ShoppingListItem as ShoppingListItemProps } from "../../interfaces/ShoppingListItemInterface";
import { RiDeleteBinFill } from "react-icons/ri";
import { useLongPress } from "@uidotdev/usehooks";
import { FixedCategories } from "../../utils/fixedCategories";

interface ShoppingListItemPropsWithDelete extends ShoppingListItemProps {
  onDelete: (id: number) => void;
  onUpdate: () => void;
  onEdit: (item: ShoppingListItemProps) => void;
}

function ShoppingListItem({
  id,
  name,
  quantity,
  completedat,
  createdat,
  updatedat,
  onDelete,
  onUpdate,
  onEdit,
  category_id,
}: ShoppingListItemPropsWithDelete) {
  async function handleToggleCompleted(id, toggleCompleted = true) {
    const response = await fetch(`/api/items/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        toggleCompleted,
      }),
    });

    if (!response.ok) {
      console.error("An error occurred:", response.statusText);
      return;
    }

    try {
      const data = await response.json();
      onUpdate();
      return data;
    } catch (err) {
      console.error("Failed to parse JSON:", err);
    }
  }

  const attrs = useLongPress(
    () => {
      onEdit({
        id,
        name,
        quantity,
        completedat,
        createdat,
        updatedat,
        category_id,
      });
    },
    {
      threshold: 500,
    }
  );

  const categoryColor = FixedCategories.find(
    (category) => category_id === category.id
  )?.color;

  return (
    <div
      {...attrs}
      className={`shopping-list-item ${
        completedat ? "shopping-list-item_completed" : ""
      }`}
      onClick={() => handleToggleCompleted(id)}
    >
      <div
        className="shopping-list-item__category-circle"
        style={{ backgroundColor: categoryColor }}
      ></div>
      <p className="shopping-list-item__quantity">
        {quantity ? quantity.toString() : "0"}
      </p>
      <p className="shopping-list-item__name">{name}</p>
      <button
        className="shopping-list-item__delete-button"
        onClick={() => onDelete(id)}
      >
        <RiDeleteBinFill className="shopping-list-item__delete-icon" />
      </button>
    </div>
  );
}

export default ShoppingListItem;

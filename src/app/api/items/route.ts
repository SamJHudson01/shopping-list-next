import { NextResponse } from "next/server";
import {
  getItems,
  addItem,
  deleteItem,
  updateItemCompletion,
} from "../../../models/shoppingListItemDAO";
import { ShoppingListItem } from "../../../interfaces/ShoppingListItemInterface";

type NewShoppingListItem = Omit<ShoppingListItem, "id" | "completedat">;

export const GET = async () => {
  const allItems = await getItems();
  return new NextResponse(JSON.stringify(allItems));
};

export const POST = async (request) => {
  const {
    name: itemName,
    quantity: itemQuantity,
    category_id: itemCategory,
  } = await request.json();
  console.log("itemName:", itemName);
  console.log("itemQuantity:", itemQuantity);
  console.log("itemCategory:", itemCategory);
  const newItem: NewShoppingListItem = {
    name: itemName,
    quantity: itemQuantity,
    createdat: new Date(),
    updatedat: new Date(),
    category_id: itemCategory,
  };

  const addedItem = await addItem(newItem);

  return new NextResponse(JSON.stringify(addedItem));
};

export const PUT = async (request) => {
  const { id } = await request.json();
  const updatedItem = await updateItemCompletion(id);
  return new NextResponse(JSON.stringify(updatedItem));
};

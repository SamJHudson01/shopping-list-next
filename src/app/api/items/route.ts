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

import { addItem } from "../../models/shoppingListItemDAO";

import { GET } from "../../app/api/items/route";

describe("/api/items", () => {
  test("returns a list of items please", async () => {
    const newItem1 = {
      name: "Apples",
      quantity: 3,
      createdat: new Date(),
      updatedat: new Date(),
      category_id: "Q7R8",
    };

    const newItem2 = {
      name: "Pears",
      quantity: 5,
      createdat: new Date(),
      updatedat: new Date(),
      category_id: "Q7R8",
    };
    await addItem(newItem1);
    await addItem(newItem2);

    const expectedItem1 = {
      name: "Apples",
      quantity: 3,
      category_id: "Q7R8",
    };

    const expectedItem2 = {
      name: "Pears",
      quantity: 5,
      category_id: "Q7R8",
    };

    const response = await GET();

    const data = await response.json();
    expect(data).toEqual(
      expect.arrayContaining([
        expect.objectContaining(expectedItem1),
        expect.objectContaining(expectedItem2),
      ])
    );
  });
});

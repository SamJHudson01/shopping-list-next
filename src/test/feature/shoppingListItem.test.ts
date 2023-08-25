import { addItem } from "../../models/shoppingListItemDAO";

import { GET } from "../../app/api/items/route";

describe("/api/items", () => {
  test("returns a list of items please", async () => {
    const newItem1 = {
      name: "Apples",
      quantity: 3,
      createdat: new Date(),
      updatedat: new Date(),
    };

    const newItem2 = {
      name: "Pears",
      quantity: 5,
      createdat: new Date(),
      updatedat: new Date(),
    };
    await addItem(newItem1);
    await addItem(newItem2);

    const expectedItem1 = {
      name: "Apples",
      quantity: 3,
    };

    const expectedItem2 = {
      name: "Pears",
      quantity: 5,
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

export const up = `
ALTER TABLE shopping_list_items
DROP CONSTRAINT IF EXISTS shopping_list_items_category_id_fkey;
ALTER TABLE shopping_list_items
ALTER COLUMN category_id TYPE VARCHAR(255);
`;

export const down = `
ALTER TABLE shopping_list_items
ALTER COLUMN category_id TYPE INTEGER;
ALTER TABLE shopping_list_items
ADD CONSTRAINT shopping_list_items_category_id_fkey FOREIGN KEY (category_id) REFERENCES categories(id);
`;

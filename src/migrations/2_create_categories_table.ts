export const up = `
CREATE TABLE IF NOT EXISTS categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);


`;

export const down = `

DROP TABLE categories;
`;

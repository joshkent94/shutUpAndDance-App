CREATE EXTENSION citext;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    email citext UNIQUE,
    salt VARCHAR(255),
    password VARCHAR(255)
);

CREATE TABLE genres (
    user_id INTEGER NOT NULL REFERENCES users ON DELETE CASCADE,
    genres VARCHAR(255) ARRAY
);
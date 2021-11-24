CREATE EXTENSION citext;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE users (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  first_name VARCHAR(255) NOT NULL,
  last_name VARCHAR(255) NOT NULL,
  email citext UNIQUE,
  salt VARCHAR(255),
  password VARCHAR(255)
);

CREATE TABLE genres (
  user_id uuid NOT NULL REFERENCES users ON DELETE CASCADE,
  genres VARCHAR(255) ARRAY
);

CREATE TABLE "session" (
  "sid" varchar NOT NULL COLLATE "default",
	"sess" json NOT NULL,
	"expire" timestamp(6) NOT NULL
)
WITH (OIDS=FALSE);

ALTER TABLE "session" ADD CONSTRAINT "session_pkey" PRIMARY KEY ("sid") NOT DEFERRABLE INITIALLY IMMEDIATE;

CREATE INDEX "IDX_session_expire" ON "session" ("expire");

CREATE TABLE threads (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  creator_user_id uuid NOT NULL REFERENCES users,
  title VARCHAR(255) NOT NULL,
  initial_comment TEXT NOT NULL,
  likes INTEGER NOT NULL
);

CREATE TABLE comments (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  thread_id uuid NOT NULL REFERENCES threads,
  comment TEXT NOT NULL,
  user_id uuid NOT NULL REFERENCES users
);
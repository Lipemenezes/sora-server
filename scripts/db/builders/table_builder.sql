DROP SCHEMA public CASCADE;
CREATE SCHEMA public;


DO $$ BEGIN
    CREATE TYPE user_roles AS ENUM('student', 'faculty_member');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

CREATE TABLE IF NOT EXISTS users (
    id serial PRIMARY KEY,
    email VARCHAR ( 255 ) UNIQUE NOT NULL,
    password VARCHAR ( 100 ) NOT NULL,
    type user_roles NOT NULL,
    name VARCHAR ( 150 ),
    created_on TIMESTAMP NOT NULL,
    last_login TIMESTAMP 
);

CREATE TABLE IF NOT EXISTS skills (
    id serial PRIMARY KEY,
    name VARCHAR ( 70 ) UNIQUE NOT NULL,
    description VARCHAR ( 255 ) NULL
);

CREATE TABLE IF NOT EXISTS student_skill_level (
  user_id INT NOT NULL,
  skill_id INT NOT NULL,
  skill_level INT NOT NULL,
  PRIMARY KEY (user_id, skill_id),
  FOREIGN KEY (skill_id)
      REFERENCES skills (id),
  FOREIGN KEY (user_id)
      REFERENCES users (id)
);

CREATE TABLE IF NOT EXISTS faculty_member_skills (
  user_id INT NOT NULL,
  skill_id INT NOT NULL,
  PRIMARY KEY (user_id, skill_id),
  FOREIGN KEY (skill_id)
      REFERENCES skills (id),
  FOREIGN KEY (user_id)
      REFERENCES users (id)
);

CREATE TABLE IF NOT EXISTS houses (
    id serial PRIMARY KEY,
    name VARCHAR ( 70 ) UNIQUE NOT NULL
);

CREATE TABLE IF NOT EXISTS student_house (
    user_id INT NOT NULL,
    house_id INT NOT NULL,
    PRIMARY KEY (user_id),
    FOREIGN KEY (user_id)
        REFERENCES users (id),
    FOREIGN KEY (house_id)
        REFERENCES houses (id)
);
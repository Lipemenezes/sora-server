'use strict';

const db = require('../config/db');

const rebuildTablesOperation = `
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
        role user_roles NOT NULL,
        first_name VARCHAR ( 100 ),
        last_name VARCHAR ( 100 ),
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
`;

const populateOperation = `
    -- users - default pass = 123456
    INSERT INTO users (email, first_name, last_name, role, password, created_on)
    VALUES('lipe.menezes@live.com', 'Felipe', 'Menezes', 'student', '$2b$10$iuzlSmlzwsl7XLI5PCUMdeRAL3k0UJYVVJHoowvyqQgOZyCMQorPi', NOW());

    INSERT INTO users (email, first_name, last_name, role, password, created_on)
    VALUES('garrett@soraschools.com', 'Garret', 'Smiley', 'student', '$2b$10$iuzlSmlzwsl7XLI5PCUMdeRAL3k0UJYVVJHoowvyqQgOZyCMQorPi', NOW());

    INSERT INTO users (email, first_name, last_name, role, password, created_on)
    VALUES('tiago@soraschools.com', 'Tiago', 'Peixoto', 'student', '$2b$10$iuzlSmlzwsl7XLI5PCUMdeRAL3k0UJYVVJHoowvyqQgOZyCMQorPi', NOW());

    INSERT INTO users (email, first_name, last_name, role, password, created_on)
    VALUES('garret_faculty@soraschools.com', 'Garret', 'Smiley', 'faculty_member', '$2b$10$iuzlSmlzwsl7XLI5PCUMdeRAL3k0UJYVVJHoowvyqQgOZyCMQorPi', NOW());


    -- skills
    INSERT INTO skills (name, description)
    VALUES('Software Engineering', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit');

    INSERT INTO skills (name, description)
    VALUES('Product Management', 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem');

    INSERT INTO skills (name, description)
    VALUES('UX Design', 'Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam');


    -- skill level
    INSERT INTO student_skill_level (user_id, skill_id, skill_level)
    VALUES(1, 1, 1);

    INSERT INTO student_skill_level (user_id, skill_id, skill_level)
    VALUES(1, 2, 1);

    INSERT INTO student_skill_level (user_id, skill_id, skill_level)
    VALUES(2, 1, 3);

    INSERT INTO student_skill_level (user_id, skill_id, skill_level)
    VALUES(2, 2, 2);

    INSERT INTO student_skill_level (user_id, skill_id, skill_level)
    VALUES(3, 1, 4);

    INSERT INTO student_skill_level (user_id, skill_id, skill_level)
    VALUES(3, 2, 3);


    -- faculty member skills
    INSERT INTO faculty_member_skills (user_id, skill_id)
    VALUES(4, 3);


    -- houses
    INSERT INTO houses (name)
    VALUES('Engineering Crew');

    INSERT INTO houses (name)
    VALUES('Product Crew');


    -- students in houses
    INSERT INTO student_house (user_id, house_id)
    VALUES(1, 1);

    INSERT INTO student_house (user_id, house_id)
    VALUES(2, 1);
`;


const createDbOperation = `CREATE DATABASE ${process.env.PGDATABASE}`;

const create = async () => await db.execute(createDbOperation, []);
const rebuild = async () => await db.execute(rebuildTablesOperation, []);
const populate = async () => await db.execute(populateOperation, []);

module.exports = {
    fromScratch: async () => {
        try {
            await create();
        } catch (e) {
            console.info(e.message);
        }

        try {
            await rebuild();
        } catch (e) {
            console.info(e.message);
        }

        try {
            await populate();
        } catch (e) {
            console.info(e.message);
        }

        return;
    },
};

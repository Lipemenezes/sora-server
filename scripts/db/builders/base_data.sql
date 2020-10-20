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

INSERT INTO faculty_member_skills (user_id, skill_id)
VALUES(4, 1);


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

INSERT INTO student_house (user_id, house_id)
VALUES(3, 2);

-- users
INSERT INTO users (id, email, type, password, created_on)
VALUES(1, 'lipe.menezes@live.com', 'student', '123456', NOW());

INSERT INTO users (id, email, type, password, created_on)
VALUES(2, 'garrett@soraschools.com', 'student', '123456', NOW());

INSERT INTO users (id, email, type, password, created_on)
VALUES(3, 'tiago@soraschools.com', 'student', '123456', NOW());

INSERT INTO users (id, email, type, password, created_on)
VALUES(4, 'garret_faculty@soraschools.com', 'faculty_member', '123456', NOW());


-- skills
INSERT INTO skills (id, name, description)
VALUES(1, 'Software Engineering', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit');

INSERT INTO skills (id, name, description)
VALUES(2, 'Product Management', 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem');

INSERT INTO skills (id, name, description)
VALUES(3, 'UX Design', 'Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam');


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
INSERT INTO houses (id, name)
VALUES(1, 'Engineering Crew');

INSERT INTO houses (id, name)
VALUES(2, 'Product Crew');


-- students in houses
INSERT INTO students_in_houses (user_id, house_id)
VALUES(1, 1);

INSERT INTO students_in_houses (user_id, house_id)
VALUES(2, 1);
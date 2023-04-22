INSERT INTO users (username, password) VALUES ('jsmith', '$2b$10$3fsLDDl.R.vRDeEUnH0g0OTJ.a8i44oDM.VNgS4yqdqwRLtA4B1qS'); /*password: password123*/
INSERT INTO general (firstname, lastname, dob, email, linkedin, github, username) VALUES ('John', 'Smith', '01/01/1990', 'john.smith@gmail.com', 'https://www.linkedin.com/in/john-smith/', 'https://github.com/JohnSmith', 'jsmith');
INSERT INTO educations (school, degree, focus, startDate, endDate, description, username) VALUES ('University of Somewhere', 'BA', 'Cartography Major', '08/01/2018', '05/01/2022', 'Learned stuff', 'jsmith');
INSERT INTO educations (school, degree, focus, startDate, endDate, description, username) VALUES ('University of Elsewhere', 'MA', 'Cartography Major', '08/01/2022', '05/01/2024', 'Learned more stuff', 'jsmith');
INSERT INTO experiences (organization, title, startDate, endDate, description, username) VALUES ('Boring Job', 'Worker', '01/01/2020', '08/01/2022', 'Did boring stuff','jsmith');
INSERT INTO experiences (organization, title, startDate, endDate, description, username) VALUES ('Better Job', 'Boss', '06/01/2024', '01/01/2023', 'Did less boring stuff','jsmith');
INSERT INTO skills (skill, username) VALUES ('Cartography', 'jsmith');
INSERT INTO skills (skill, username) VALUES ('Navigation', 'jsmith');
INSERT INTO skills (skill, username) VALUES ('Piloting', 'jsmith');
INSERT INTO languages (language, proficiency, username) VALUES ('English', 'Native', 'jsmith');
INSERT INTO languages (language, proficiency, username) VALUES ('Spanish', 'Beginner', 'jsmith');
INSERT INTO locations (country, city, username) VALUES ('USA', 'San Diego', 'jsmith');
INSERT INTO locations (country, city, username) VALUES ('USA', 'San Francisco', 'jsmith');

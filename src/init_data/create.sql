DROP TABLE IF EXISTS users CASCADE;
CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    firstname VARCHAR(50) NOT NULL,
    lastname VARCHAR(50) NOT NULL,
    password VARCHAR(50) NOT NULL,
    dob DATE NOT NULL,
    email VARCHAR(50) NOT NULL
);

DROP TABLE IF EXISTS educations CASCADE;
CREATE TABLE education(
    id SERIAL PRIMARY KEY,
    school VARCHAR(50) NOT NULL,
    degree VARCHAR(50) NOT NULL,
    focus VARCHAR(50),
    startdate DATE NOT NULL,
    endDate DATE NOT NULL
);

DROP TABLE IF EXISTS users_to_educations CASCADE;
CREATE TABLE users_to_educations(
    user_id INT NOT NULL,
    education_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users (id),
    FOREIGN KEY (education_id) REFERENCES educations (id)
);

DROP TABLE IF EXISTS experiences CASCADE;
CREATE TABLE education(
    id SERIAL PRIMARY KEY,
    organization VARCHAR(50) NOT NULL,
    startdate DATE NOT NULL,
    endDate DATE NOT NULL
);

DROP TABLE IF EXISTS descriptions CASCADE;
CREATE TABLE descriptions(
    id SERIAL PRIMARY KEY,
    description VARCHAR(1000)
);

DROP TABLE IF EXISTS description_to_experience CASCADE;
CREATE TABLE description_to_experience(
    experience_id INT NOT NULL,
    description_id INT NOT NULL,
    FOREIGN KEY (experience_id) REFERENCES experiences (id),
    FOREIGN KEY (description_id) REFERENCES descriptions (id)
);

DROP TABLE IF EXISTS user_to_experience CASCADE;
CREATE TABLE user_to_experience(
    user_id INT NOT NULL,
    experience_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users (id),
    FOREIGN KEY (experience_id) REFERENCES experiences (id)
);

DROP TABLE IF EXISTS skills CASCADE;
CREATE TABLE skills(
    id SERIAL PRIMARY KEY,
    skill VARCHAR(50)
);

DROP TABLE IF EXISTS user_to_skill CASCADE;
CREATE TABLE user_to_skill(
    user_id INT NOT NULL,
    skill_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users (id),
    FOREIGN KEY (skill_id) REFERENCES skills (id)
);

DROP TABLE IF EXISTS languages CASCADE;
CREATE TABLE languages(
    id SERIAL PRIMARY KEY,
    language VARCHAR(50)
);

DROP TABLE IF EXISTS user_to_language CASCADE;
CREATE TABLE user_to_language(
    user_id INT NOT NULL,
    language_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users (id),
    FOREIGN KEY (language_id) REFERENCES languages (id)
);

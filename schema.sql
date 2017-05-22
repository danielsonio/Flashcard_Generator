CREATE DATABASE cloze_cards;

USE cloze_cards;

CREATE TABLE basic (
	position INT NOT NULL AUTO_INCREMENT,
	answer VARCHAR(50) NULL,
	question VARCHAR(255) NULL,
	PRIMARY KEY (position)
);

SELECT * FROM basic;

INSERT INTO basic (answer, question) VALUES ("Thomas Jefferson","Who wrote the Declaration of Independence?");
INSERT INTO basic (answer, question) VALUES ("George Washington","Who was the first president?");

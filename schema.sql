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


CREATE TABLE cloze (
	position INT NOT NULL AUTO_INCREMENT,
	cloze VARCHAR(50) NULL,
	partial VARCHAR(255) NULL,
	full VARCHAR(255) NULL,
	choices VARCHAR(255) NULL,
	PRIMARY KEY (position)
);

INSERT INTO cloze (cloze, partial, full, choices) VALUES ("George Washington","____________ was the first president of the United States.", "George Washington was the first president of the United States.", "Diplo,George Washington,Thomas Edison");

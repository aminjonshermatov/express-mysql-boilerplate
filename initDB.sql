ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'pass';

flush privileges;

CREATE DATABASE test CHARACTER SET utf8 COLLATE utf8_general_ci;

use test;

CREATE TABLE test.users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    firstname TEXT NOT NULL,
    lastname TEXT NOT NULL,
    username TEXT NOT NULL,
    password TEXT NOT NULL,
    created TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);
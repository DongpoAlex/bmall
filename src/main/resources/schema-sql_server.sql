DROP TABLE if EXISTS authorities;
DROP TABLE if EXISTS users;
CREATE TABLE users (
  username VARCHAR(255) NOT NULL PRIMARY KEY,
  password VARCHAR(255) NOT NULL,
  enabled  BIT          NOT NULL
);
CREATE TABLE authorities (
  username  VARCHAR(255) NOT NULL,
  authority VARCHAR(255) NOT NULL,
  CONSTRAINT fk_authorities_users FOREIGN KEY (username) REFERENCES users (username)
);
CREATE UNIQUE INDEX ix_auth_username ON authorities (username, authority);
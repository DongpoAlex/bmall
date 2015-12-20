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

CREATE TABLE authorities (
  username  VARCHAR(255) NOT NULL,
  authority VARCHAR(255) NOT NULL,
  CONSTRAINT fk_authorities_users FOREIGN KEY (username) REFERENCES users (username)
);
CREATE TABLE GoodsExtend (
  id      INT PRIMARY KEY IDENTITY,
  imgid   INT           NOT NULL,
  url     VARCHAR(1000) NOT NULL,
  goodsid INT           NOT NULL
);

ALTER view [dbo].[v_SGroup] as
SELECT id,name,id/100 prantid FROM mySHOPDCStock..SGroup where id<>0;

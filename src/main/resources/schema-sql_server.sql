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

CREATE TABLE Customer (
  id      INT PRIMARY KEY  IDENTITY,
  name    VARCHAR(64)  NOT NULL,
  phone   VARCHAR(32)  NOT NULL,
  email   VARCHAR(64)  NOT NULL,
  address VARCHAR(255) NOT NULL
);


CREATE TABLE favorites_Goods (
  id        INT PRIMARY KEY IDENTITY,
  goodsId   INT          NOT NULL,
  name      VARCHAR(128) NOT NULL,
  unitName  VARCHAR(64),
  guestId   VARCHAR(255),
  price     dec(12, 4),
  deptId    INT,
  twoDeptId INT,
  spec      VARCHAR(64),
  qty       INT             DEFAULT 0,
  oPKNum    INT,
  oPKName   VARCHAR(64),
  oPKSpec   VARCHAR(64)
);


ALTER VIEW [dbo].[v_SGroup] AS
SELECT
  id,
  name,
  id / 100 prantid
FROM mySHOPDCStock..SGroup
WHERE id <> 0;

CREATE VIEW GuestGoodsCart
AS
  SELECT
    row_number()
    OVER (
      ORDER BY GuestID) AS id,
    GuestID,
    goodsid
  FROM MHWholePurchaseitem
  GROUP BY GuestID, goodsid

CREATE VIEW [dbo].[WholeGoods]
AS
  SELECT
    ROW_NUMBER()
    OVER (
      ORDER BY g.goodsid) AS id,
    g.*,
    w.guestid,
    w.price
  FROM mySHOPDCStock..goods g, WholePrice w
  WHERE g.goodsid = w.goodsid


CREATE TRIGGER [dbo].[trg_MHWholePurchase0]
ON [dbo].[MHWholePurchase0]
FOR INSERT
AS
  DECLARE @flag INT;
DECLARE @sheetid CHAR(16);
SELECT
    @sheetid = inserted.sheetid,
    @flag = inserted.flag
FROM inserted;
IF @flag = 1
  BEGIN
    EXEC ST_MHWholePurchase @sheetid, '平台下单';
  END

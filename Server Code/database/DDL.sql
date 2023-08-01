SET FOREIGN_KEY_CHECKS=0;
SET AUTOCOMMIT = 0;
-- Creating Customers table; Details of the customers that use our website.
DROP TABLE IF EXISTS Customers;
CREATE TABLE Customers(
	customerID int not null auto_increment,
	customerName varchar(255) not null,
	customerEmail varchar(255) not null,
	customerGender varchar(50) not null,
	PRIMARY KEY (customerID)
);

-- Creating Merchandise table; Details of merchandise on our website.
DROP TABLE IF EXISTS Merchandise;
CREATE TABLE Merchandise (
	merchandiseID int not null auto_increment unique,
	merchandiseName varchar(255) not null,
	merchandiseCategory varchar(255) not null, -- Hat, Shirt, Jacket, Shoes, Pants, etc
	merchandisePrice decimal(18,2) not null,
	merchandiseCondition varchar(255) not null, -- New/Used
	size varchar(50) not null,
	PRIMARY KEY (merchandiseID)
);


-- Creating Transactions table; Details of the transactions done on our website.
DROP TABLE IF EXISTS Transactions;
CREATE TABLE Transactions (
	transactionID int not null auto_increment unique,
	customerID int not null,
	transactionDate date not null,
	PRIMARY KEY (transactionID),
	FOREIGN KEY (customerID) REFERENCES Customers(customerID)
	ON DELETE CASCADE
);


-- Creating TransactionDetails table; intersection table between transactions and merchandise; details of each transaction.
DROP TABLE IF EXISTS TransactionDetails;
CREATE TABLE TransactionDetails (
	transactionDetailsID int not null auto_increment unique,
	transactionID int not null,
	merchandiseID int not null,
	PRIMARY KEY (transactionDetailsID),
	FOREIGN KEY (transactionID) REFERENCES Transactions(transactionID)
	ON DELETE CASCADE,
	FOREIGN KEY (merchandiseID) REFERENCES Merchandise(merchandiseID)
	ON DELETE CASCADE
);

-- Creating Favorites table; Details about clothing items favorited by our customers.
DROP TABLE IF EXISTS Favorites;
CREATE TABLE Favorites (
	favoriteID int not null auto_increment unique,
	customerID int not null unique,
	merchandiseID int,
	PRIMARY KEY (favoriteID),
	FOREIGN KEY (merchandiseID) REFERENCES Merchandise(merchandiseID),
	FOREIGN KEY (customerID) REFERENCES Customers(customerID)
	ON DELETE CASCADE
);


-- Adding customers to the Customer table.
INSERT INTO Customers (customerName, customerEmail, customerGender)
VALUES ('Kyle Leuzinger', 'kluuz@gmail.com', 'Male'),
('Sebastian Gaddis', 'gaddiss@gmail.com', 'Male'),
('Aleta Mundell', 'mundellA@gmail.com', 'Female'),
('Sabeth Kennedy', 'kennsab@gmail.com', 'Female');

-- Adding merchandise to the Merchandise table.
INSERT INTO Merchandise (merchandiseName, merchandiseCategory, merchandisePrice, merchandiseCondition, size)
VALUES ("Levi's darkwash Jeans", 'Pants', 25.99, 'Used', 'M'),
('Nike Dunk Panda', 'Shoes', 249.99, 'New', '9'),
('Vintage Budweiser Shirt', 'Shirt', 10.99, 'Used', 'M'),
('The North Face Puffer Jacket', 'Jacket', 59.99, 'Used', 'XL'),
('Patagonia Trucker Hat', 'Hat', 15.99, 'Used', 'M'),
('Pink Willie Nelson Tee', 'Shirt', 18.5, 'New', 'L'),
('Travis Scott Playstation Pants', 'Pants', 90.99, 'Used', 'M'),
('Club C Reebok', 'Shoes', 15.99, 'Used', '10'),
('Nike Elite Socks', 'Socks', 9.99, 'New', 'S');

-- Adding transactions to the Transactions table.
INSERT INTO Transactions (customerID, transactionDate)
VALUES (3, '2022-12-08'),
(2, '2020-11-19'),
(2, '2021-11-20'),
(1, '2023-01-15');

-- Adding elements to the Favorites table.
INSERT INTO Favorites(merchandiseID, customerID)
VALUES (4, 1), (3, 3), (1, 2), (2, 4);

-- Adding transaction details to the transactionDetails table.
INSERT INTO TransactionDetails(transactionID, merchandiseID)
VALUES (1, 6), (2, 7), (3, 5), (4, 9);

SET FOREIGN_KEY_CHECKS=1;
COMMIT;
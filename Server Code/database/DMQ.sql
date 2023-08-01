-- Query for add a new customer functionality with '$()' character being used to 
-- denote the variables that will have data from the backend programming language
INSERT INTO Customers (customerName, customerEmail, customerGender ) 
VALUES('${data.customerName}', '${data.customerEmail}', '${data.customerGender}');
-- Query for add a new merchandise functionality with colon '$()' character being used to 
-- denote the variables that will have data from the backend programming language
INSERT INTO Merchandise (merchandiseName, merchandiseCategory, merchandisePrice, merchandiseCondition, size) 
VALUES('${data.merchandiseName}', '${data.merchandiseCategory}', '${data.merchandisePrice}', '${data.merchandiseCondition}', '${data.size}');
-- Query for add a new transactions functionality with colon '$()' character being used to 
-- denote the variables that will have data from the backend programming language
INSERT INTO Transactions (customerID, transactionDate) 
VALUES('${data.customerID}', '${data.transactionDate}');
-- Query for add a new favorites functionality with colon '$()' character being used to 
-- denote the variables that will have data from the backend programming language
INSERT INTO Favorites (customerID, merchandiseID) 
VALUES('${data.customerID}', '${data.merchandiseID}');
-- Query for add a new transactionDetails functionality with colon '$()' character being used to 
-- denote the variables that will have data from the backend programming language
INSERT INTO TransactionDetails (transactionID, merchandiseID) 
VALUES('${data.transactionID}', '${data.merchandiseID}');

-- QUERY TO SELECT ALL COLUMNS FROM Customers
SELECT * FROM Customers;
-- QUERY TO SELECT ALL COLUMNS FROM Merchandise
SELECT * FROM Merchandise;
-- QUERY TO SELECT Columns with easy-to-read names
SELECT transactionID, Customers.customerName, transactionDate
    FROM Transactions
    INNER JOIN Customers ON Transactions.customerID = Customers.customerID
    ORDER BY transactionID ASC;
-- QUERY TO SELECT Columns with easy-to-read names
SELECT favoriteID, Customers.customerName, Merchandise.merchandiseName
    FROM Favorites
    INNER JOIN Customers ON Favorites.customerID = Customers.customerID
    LEFT JOIN Merchandise ON Favorites.merchandiseID = Merchandise.merchandiseID
    ORDER BY favoriteID ASC;
-- QUERY TO SELECT Columns with easy-to-read names
SELECT transactionDetailsID, Merchandise.merchandiseName,
    Customers.customerName, Transactions.transactionDate, Transactions.transactionID
    FROM TransactionDetails
    INNER JOIN Merchandise ON TransactionDetails.merchandiseID = Merchandise.merchandiseID
    INNER JOIN Transactions ON TransactionDetails.transactionID = Transactions.transactionID
    INNER JOIN Customers ON Transactions.customerID = Customers.customerID
    ORDER BY transactionDetailsID ASC;

-- QUERIES TO POPULATE DROPDOWNS
SELECT transactionID, Customers.customerName, transactionDate
    FROM Transactions
    INNER JOIN Customers ON Transactions.customerID = Customers.customerID
    ORDER BY transactionID ASC;
SELECT Customers.customerName, Transactions.transactionID
    FROM Transactions
    INNER JOIN Customers ON Transactions.customerID = Customers.customerID;
SELECT Transactions.transactionDate, Transactions.transactionID 
    FROM TransactionDetails
    INNER JOIN Transactions ON TransactionDetails.transactionID = Transactions.transactionID;
SELECT merchandiseName, merchandiseID FROM Merchandise;
SELECT favoriteID, Customers.customerName, Merchandise.merchandiseName
    FROM Favorites
    INNER JOIN Customers ON Favorites.customerID = Customers.customerID
    LEFT JOIN Merchandise ON Favorites.merchandiseID = Merchandise.merchandiseID
    ORDER BY favoriteID ASC;

-- Query for update Customers functionality with '$()' character being used to 
-- denote the variables that will have data from the backend programming language
UPDATE Customers SET customerEmail = '${data.customerEmail}', customerGender = '${data.customerGender}' 
    WHERE customerName = '${data.customerName}';
-- Query for update a merchandise functionality with '$()' character being used to 
-- denote the variables that will have data from the backend programming language
UPDATE Merchandise SET merchandiseCategory = '${data.merchandiseCategory}', merchandisePrice = '${data.merchandisePrice}', 
    merchandiseCondition = '${data.merchandiseCondition}', size = '${data.size}' 
    WHERE merchandiseName = "${data.merchandiseName}";
-- Query for update a favorites functionality with '$()' character being used to 
-- denote the variables that will have data from the backend programming language
UPDATE Favorites SET merchandiseID = '${data.merchandiseID}' WHERE favoriteID = "${data.favoriteID}";
-- Query for update a transactions functionality with '$()' character being used to 
-- denote the variables that will have data from the backend programming language
UPDATE Transactions SET customerID = '${data.customerID}', transactionDate = '${data.transactionDate}' 
    WHERE transactionID = "${data.transactionID}";
-- DELETE
DELETE FROM Customers WHERE customerId = :customerID;
DELETE FROM Transactions WHERE transactionID = :transactionID;
DELETE FROM Merchandise WHERE merchandisePrice = :clothingPrice;
DELETE FROM TransactionDetails WHERE transactionID = :idOfTransaction AND merchandiseID = :idOfMerchandise;
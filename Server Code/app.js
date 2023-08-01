/*
The functionality for the select and delete requirements were used 
with a very minor adaptation from the NODE JS STARTER APP provided
The functinoality for the insert and update requirements were created
originally with some direction from the TA Jame Cole. 

This app.js was copied and initially and adapted to fit my teams 
needs for this project.
3/20/2023
*/


var express = require('express');   // We are using the express library for the web server
var app     = express();            // We need to instantiate an express object to interact with the server in our code
var db = require('./database/db-connector')
app.use(express.json())
app.use(express.urlencoded({extended: true}))

PORT        = 5928;                 // Set a port number at the top so it's easy to change in the future

const { engine } = require('express-handlebars');
var exphbs = require('express-handlebars');     // Import express-handlebars
const { query } = require('express');
app.engine('.hbs', engine({extname: ".hbs"}));  // Create an instance of the handlebars engine to process templates
app.set('view engine', '.hbs');                 // Tell express to use the handlebars engine whenever it encounters a *.hbs file.

app.use(express.static('public'))

/*
    ROUTES
*/

app.get('/', function(req, res)
    {  
            res.render('index');                  // Render the index.hbs file, and also send the renderer                                                    // an object where 'data' is equal to the 'rows' we
    });   
                                                          // received back from the query
    app.get('/customers', function(req, res){
      
        let query1 = "SELECT * FROM Customers;";               // Define our query

        db.pool.query(query1, function(error, rows, fields){    // Execute the query

            let customers = rows;

            db.pool.query(query1, (error, rows, fields) => {
                let customer2 = rows;
                return res.render('customers', {data: customers, dropdown: customer2})
            })

                             // Render the index.hbs file, and also send the renderer
        })                                                      // an object where 'data' is equal to the 'rows' we
    });

    app.get('/merchandise', function(req, res)
    {  
        let query1 = "SELECT * FROM Merchandise;";               // Define our query

        db.pool.query(query1, function(error, rows, fields){    // Execute the query

            
            res.render('merchandise', {data: rows});                  // Render the index.hbs file, and also send the renderer
        })                                                      // an object where 'data' is equal to the 'rows' we
    });

    app.get('/favorites', function(req, res)
    {  
        // define query to use to populate table with easy-to-read names
        let query1 = "SELECT favoriteID, Customers.customerName, Merchandise.merchandiseName\
                      FROM Favorites\
                      INNER JOIN Customers ON Favorites.customerID = Customers.customerID\
                      LEFT JOIN Merchandise ON Favorites.merchandiseID = Merchandise.merchandiseID\
                      ORDER BY favoriteID ASC;";               // Define our query
        //define queries for dropdowns
        let query2 = `SELECT * FROM Customers;`;
        let query3 = `SELECT * FROM Merchandise;`;
        db.pool.query(query1, function(error, rows, fields){    // Execute the query
            let favorites = rows;

            db.pool.query(query2, (error, rows, fields) => {
                let customers = rows;
                
                db.pool.query(query3, (error, rows, fields) => {
                    let merchandise = rows;
                    return res.render('favorites', {data: favorites, dropdown1: customers, dropdown2: merchandise})
                })
            })
            
                   
        })                                                      
    });

    app.get('/transactions', function(req, res)
    {  
        // define query to use to populate table with easy-to-read names
        let query1 = "SELECT transactionID, Customers.customerName, transactionDate\
                     FROM Transactions\
                     INNER JOIN Customers ON Transactions.customerID = Customers.customerID\
                     ORDER BY transactionID ASC;"               // Define our query
        //define queries for dropdowns
        let query2 = `SELECT * From Customers;`
        let query3 = `SELECT * FROM Merchandise;`
        db.pool.query(query1, function(error, rows, fields){    // Execute the query

            let transactions = rows;

            db.pool.query(query2, (error, rows, fields) => {

                let customers = rows;

                db.pool.query(query3, (error, rows, fields) => {

                    let merchandise = rows;

                    res.render('transactions', {data: transactions, dropdown1: customers, dropdown2: merchandise});
                })
            })
                              
        })                                                      
    });

    app.get('/transactionDetails', function(req, res)
    {  
        // define query to use to populate table with easy-to-read names
        let query1 = "SELECT transactionDetailsID, Merchandise.merchandiseName, \
                     Customers.customerName, Transactions.transactionDate, Transactions.transactionID \
                     FROM TransactionDetails \
                     INNER JOIN Merchandise ON TransactionDetails.merchandiseID = Merchandise.merchandiseID \
                     INNER JOIN Transactions ON TransactionDetails.transactionID = Transactions.transactionID \
                     INNER JOIN Customers ON Transactions.customerID = Customers.customerID \
                     ORDER BY transactionDetailsID ASC;";
        //define queries for dropdowns
        let query2 = "SELECT Customers.customerName, Transactions.transactionID \
                      FROM Transactions \
                      INNER JOIN Customers ON Transactions.customerID = Customers.customerID;"
        let query3 = "SELECT Transactions.transactionDate, Transactions.transactionID \
                      FROM TransactionDetails \
                      INNER JOIN Transactions ON TransactionDetails.transactionID = Transactions.transactionID;"
        let query4 = "SELECT merchandiseName, merchandiseID FROM Merchandise;"
            db.pool.query(query1, function(error, rows, fields){    // Execute the query

                let transDet = rows;
                db.pool.query(query2, (error, rows, fields) => {

                    let customers = rows;
                    db.pool.query(query3, (error ,rows, fields) => {

                        let dates = rows;
                        db.pool.query(query4, (error, rows, fields) => {

                            let merch = rows;
                            res.render('transactionDetails', {data: transDet, dropdown1: customers, dropdown2: dates, dropdown3: merch});
                        })
                        
                    })
                     
                })

                             
        })                                                      
    });




    /*INSERT ROUTES*/
    app.post('/add-customer', function(req, res){
        let data = req.body;
        //define insert query
        let query1 = `INSERT INTO Customers (customerName, customerEmail, customerGender ) VALUES('${data.customerName}', '${data.customerEmail}', '${data.customerGender}');`; 
        
        db.pool.query(query1, function(error, rows, fields){
            if(error){
                console.log(error)
                res.sendStatus(400);
            }
            else{
                res.redirect('/customers')
            }
        })
    });

    app.post('/add-merchandise', function(req, res){
        let data = req.body;
        //define insert query
        let query1 = `INSERT INTO Merchandise (merchandiseName, merchandiseCategory, merchandisePrice, merchandiseCondition, size) VALUES('${data.merchandiseName}', '${data.merchandiseCategory}', '${data.merchandisePrice}', '${data.merchandiseCondition}', '${data.size}');`; 
        
        db.pool.query(query1, function(error, rows, fields){
            if(error){
                console.log(error)
                res.sendStatus(400);
            }
            else{
                res.redirect('merchandise')
            }
        })
    });

    app.post('/add-favorite', function(req, res){
        let data = req.body;
        //define insert query
        let query1 = `INSERT INTO Favorites (customerID, merchandiseID) VALUES('${data.customerID}', '${data.merchandiseID}');` 

        db.pool.query(query1, function(error, rows, fields){
            if(error){
                console.log(error)
                res.sendStatus(400);
            }
            else{
                res.redirect('favorites')
            }
        })
    });

    app.post('/add-transaction', function(req, res){
        let data = req.body;
        //define insert query
        let query1 = `INSERT INTO Transactions (customerID, transactionDate) VALUES('${data.customerID}', '${data.transactionDate}');` 

        db.pool.query(query1, function(error, rows, fields){
            if(error){
                console.log(error)
                res.sendStatus(400);
            }
            else{
                res.redirect('transactions')
            }
        })
    });

    app.post('/add-trans-details', function(req, res){
        let data = req.body;
        //define insert query
        let query1 = `INSERT INTO TransactionDetails (transactionID, merchandiseID) VALUES('${data.transactionID}', '${data.merchandiseID}');` 
        db.pool.query(query1, function(error, rows, fields){
            if(error){
                console.log(error)
                res.sendStatus(400);
            }
            else{
                res.redirect('transactionDetails')
            }
        })
    });
    /*END OF INSERT ROUTES*/




    /*UPDATE ROUTES*/
    app.post('/update-customer', function(req, res){
        let data = req.body;
        //define update query
        let query1 = `UPDATE Customers SET customerEmail = '${data.customerEmail}', customerGender = '${data.customerGender}' WHERE customerName = '${data.customerName}';`;
        db.pool.query(query1, function(error, rows, fields){
        if(error){
            console.log(error)
            res.sendStatus(400);
        }
        else{
            res.redirect('/customers')
        }
    })});

    app.post('/update-merchandise', function(req, res){
        let data = req.body;
        //define update query
        let query1 = `UPDATE Merchandise SET merchandiseCategory = '${data.merchandiseCategory}', merchandisePrice = '${data.merchandisePrice}', merchandiseCondition = '${data.merchandiseCondition}', size = '${data.size}' WHERE merchandiseName = "${data.merchandiseName}";`;
        db.pool.query(query1, function(error, rows, fields){
        if(error){
            console.log(error)
            res.sendStatus(400);
        }
        else{
            console.log("redirecting")
            res.redirect('/merchandise')
        }
    })});

    app.post('/update-transaction', function(req, res){
        let data = req.body;
        //define update query
        let query1 = `UPDATE Transactions SET customerID = '${data.customerID}', transactionDate = '${data.transactionDate}' WHERE transactionID = "${data.transactionID}"`;
        db.pool.query(query1, function(error, rows, fields){
        if(error){
            console.log(error)
            res.sendStatus(400);
        }
        else{
            console.log("redirecting")
            res.redirect('transactions')
        }
    })});

    app.post('/update-favorite', function(req, res){
        let data = req.body;
        var query1 = null;
        //define update queries
        if (data.merchandiseID === 'NULL'){
            query1 = `UPDATE Favorites SET merchandiseID = ${data.merchandiseID} WHERE favoriteID = "${data.favoriteID}";`;
        }else {
            query1 = `UPDATE Favorites SET merchandiseID = '${data.merchandiseID}' WHERE favoriteID = "${data.favoriteID}";`;
        }
        
        db.pool.query(query1, function(error, rows, fields){
        if(error){
            console.log(error)
            res.sendStatus(400);
        }
        else{
            res.redirect('/favorites')
        }
    })});
    /*END OF UPDATE ROUTES*/




    /*DELETE ROUTES*/
    app.delete('/delete-person-ajax/', function(req,res,next){
        let data = req.body;
        let customerID = parseInt(data.id);
        //define delete query
        let deleteCustomer = `DELETE FROM Customers WHERE customerID = ?`;
      
      
              // Run the 1st query
              db.pool.query(deleteCustomer, [customerID], function(error, rows, fields){
                  if (error) {
      
                  // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                  console.log(error);
                  res.sendStatus(400);
                  }
                  else
                  {
                      res.sendStatus(204);
                  }
      })});

    app.delete('/delete-merch-ajax/', function(req,res,next){
        let data = req.body;
        let merchandiseID = parseInt(data.id);
        //define delete query
        let deleteMerch = `DELETE FROM Merchandise WHERE merchandiseID = ?`;
      
      
              // Run the 1st query
              db.pool.query(deleteMerch, [merchandiseID], function(error, rows, fields){
                console.log(error, data)  
                if (error) {
      
                  // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                  console.log(error);
                  res.sendStatus(400);
                  }
                  else
                  {
                      res.sendStatus(204);
                  }
      })});

      app.delete('/delete-favorite-ajax/', function(req,res,next){
        let data = req.body;
        let favoriteID = parseInt(data.id);
        //define delete query
        let deleteFavorite = `DELETE FROM Favorites WHERE favoriteID = ?;`


              // Run the 1st query
              db.pool.query(deleteFavorite, [favoriteID], function(error, rows, fields){
                  if (error) {

                  // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                  console.log(error);
                  res.sendStatus(400);
                  }
                  else
                  {
                      res.sendStatus(204);
                  }
      })});

      app.delete('/delete-trans-ajax/', function(req,res,next){
        let data = req.body;
        let transactionID = parseInt(data.id);
        //define delete query
        let deleteTransaction = `DELETE FROM Transactions WHERE transactionID = ?;`


              // Run the 1st query
              db.pool.query(deleteTransaction, [transactionID], function(error, rows, fields){
                  if (error) {

                  // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                  console.log(error);
                  res.sendStatus(400);
                  }
                  else
                  {
                      res.sendStatus(204);
                  }
      })});
      /*END OF DELETE ROUTES*/
   


/*
    LISTENER
*/
app.listen(PORT, function(){            // This is the basic syntax for what is called the 'listener' which receives incoming requests on the specified PORT.
    console.log('Express started on http://flip1.engr.oregonstate.edu:' + PORT + '/ press Ctrl-C to terminate.')
});
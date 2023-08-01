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
        let query1 = "SELECT * FROM Customers;";               // Define our query

        db.pool.query(query1, function(error, rows, fields){    // Execute the query

            

            res.render('customers', {data: rows});                  // Render the index.hbs file, and also send the renderer
        })                                                      // an object where 'data' is equal to the 'rows' we
    });   
                                                          // received back from the query
    app.get('/customers', function(req, res){
      
        let query1 = "SELECT * FROM Customers;";               // Define our query

        db.pool.query(query1, function(error, rows, fields){    // Execute the query

            

            res.render('customers', {data: rows});                  // Render the index.hbs file, and also send the renderer
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
        let query1 = "SELECT * FROM Favorites;";               // Define our query

        db.pool.query(query1, function(error, rows, fields){    // Execute the query

            console.log(rows)
            res.render('favorites', {data: rows});                  // Render the index.hbs file, and also send the renderer
        })                                                      // an object where 'data' is equal to the 'rows' we
    });

    app.get('/transactions', function(req, res)
    {  
        let query1 = "SELECT * FROM Transactions;";               // Define our query

        db.pool.query(query1, function(error, rows, fields){    // Execute the query

            res.render('transactions', {data: rows});                  // Render the index.hbs file, and also send the renderer
        })                                                      // an object where 'data' is equal to the 'rows' we
    });

    app.get('/transactionDetails', function(req, res)
    {  
        let query1 = "SELECT * FROM transactionDetails;";               // Define our query

        db.pool.query(query1, function(error, rows, fields){    // Execute the query

            res.render('transactionDetails', {data: rows});                  // Render the index.hbs file, and also send the renderer
        })                                                      // an object where 'data' is equal to the 'rows' we
    });

    app.post('/add-customer-ajax', function(req, res){
        let data = req.body;
        console.log(data)
        query1 = `INSERT INTO Customers (customerName, customerGender, customerEmail) VALUES('${data.customerName}', '${data.customerEmail}', '${data.customerGender}')`; 
        db.pool.query(query1, function(error, rows, fields){
            if(error){
                console.log(error)
                res.sendStatus(400);
            }
            else{
                res.send(rows);
            }
        })
    });
/*
    LISTENER
*/
app.listen(PORT, function(){            // This is the basic syntax for what is called the 'listener' which receives incoming requests on the specified PORT.
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
});
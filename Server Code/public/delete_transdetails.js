// THIS CODE IS BASED UPON THE STARTER NODE.JS APP PROVIDED BY THE COURSE MATERIALS
// WITH SMALL MODIFICATIONS MADE TO SUIT OUR DATABASE
// 3/20/2023

function deleteTransactionDetails(transactionDetailsID) {
    // Put our data we want to send in a javascript object
    let data = {
        id: transactionDetailsID
    };

    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("DELETE", "/delete-trans-detail-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 204) {

            // Add the new data to the table
            deleteRow(transactionDetailsID);

        }
        else if (xhttp.readyState == 4 && xhttp.status != 204) {
            console.log("There was an error with the input.")
        }
    }
    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));
}


function deleteRow(transactionDetailsID){

    let table = document.getElementById("trans-details-table");
    for (let i = 0, row; row = table.rows[i]; i++) {
       //iterate through rows
       //rows would be accessed using the "row" variable assigned in the for loop
       if (table.rows[i].getAttribute("data-value") == transactionDetailsID) {
            table.deleteRow(i);
            break;
       }
    }
}
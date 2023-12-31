

function insertButtonClickHandler(event){
    var insert = document.getElementById("insert")
    // var update = document.getElementById("update")
    // var remove = document.getElementById("delete")
    insert.classList.toggle("hidden")
    // update.classList.toggle("hidden")
    // remove.classList.toggle("hidden")
}

var addRecordButton = document.getElementById("new-record-button")
addRecordButton.addEventListener("click", insertButtonClickHandler)

function updateButtonClickHandler(event){
    // var insert = document.getElementById("insert")
    var update = document.getElementById("update")
    // var remove = document.getElementById("delete")
    // insert.classList.toggle("hidden")
    update.classList.toggle("hidden")
    // remove.classList.toggle("hidden")
}

var updateRecordButton = document.getElementById("toggle-edit")
updateRecordButton.addEventListener("click", updateButtonClickHandler)

function deleteButtonClickHandler(event){
    console.log("DELETE CLICK HANDLER TOGGLED")
    // var insert = document.getElementById("insert")
    // var update = document.getElementById("update")
    var remove = document.getElementById("delete")
    // insert.classList.toggle("hidden")
    // update.classList.toggle("hidden")
    remove.classList.toggle("hidden")
}

var deleteRecordButton = document.getElementById("toggle-delete")
deleteRecordButton.addEventListener("click", deleteButtonClickHandler)


function createRow(ID, Name, Email, Gender){

    var row = Handlebars.templates.row({
        customerID: ID,
        customerName: Name,
        customerEmail: Email,
        customerGender: Gender
    })

    console.log(row)
    return(row);
}



function closeInputForm(){
    var insert = document.getElementById("insert")
    insert.classList.toggle("hidden")
    var cust_name = document.getElementById("input-customer-name")
    var email = document.getElementById("input-email")
    var gender = document.getElementById("input-gender")
    var merch_name = document.getElementById("input-merch-name")
    var category = document.getElementById("input-category")
    var price = document.getElementById("input-price")
    var condition = document.getElementById("input-condition")
    var size = document.getElementById("input-size")
    var tran_details_id = document.getElementById("input-transaction-id")
    var trans_cust_id = document.getElementById("input-trans-cust-id")
    var trans_merch_id = document.getElementById("input-trans-merch-id")
    var trans_amount = document.getElementById("input-trans-amount")
    var trans_date = document.getElementById("input-trans-date")
    var fav_id = document.getElementById("input-fav-id")
    var fav_cust_id = document.getElementById("input-fav-cust-id")
    var fav_merch_id = document.getElementById("input-fav-merch-id")
    
    
    input = [cust_name, email, gender, merch_name, category,
             price, condition, size, tran_details_id, trans_cust_id,
             trans_merch_id, trans_amount, trans_date, fav_id,
             fav_cust_id, fav_merch_id]
    for (var i = 0; i < input.length; i++){
        if (input[i] != null){
            input[i].value = ""
        }
    }
    for (var i = 0; i < input.length; i++){
        console.log(input[i] + "\n")
    }
}


var cancelInsert = document.getElementById("Cancel")
cancelInsert.addEventListener("click", closeInputForm)
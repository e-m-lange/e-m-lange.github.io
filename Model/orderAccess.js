// Return the object referenced by the id from the orders database
function getOrderfromOrders(order_id){
    var i=0;
    // Search for the corresponding id in the database
    while(order_id != orders[i].transaction_id) i++;
    
    return orders[i];
}

// Return the id of the order
function getIdOrder(order){
    return order.transaction_id;
}

// Return the names of the customers
function getCustomersOrder(order){
    return order.customers;
}

// Return the beverages of the order
function getBeveragesOrder(order){
    return order.beverages_id;
}

// Return the amount of each beverages of the order
function getAmountOrder(order){
    return order.amount;
}

// Return the price of the order
function getPriceOrder(order){
    return order.price;
}

// Return the fridgecode of the order
function getCodeOrder(order){
    return order.fridgecode;
}

// Return the time of the order
function getTimeOrder(order){
    return new Date(order.timestamp);
}

// Return the status of the order
function getStatusOrder(order){
    return order.served;
}

// Return all informations relative to the order
// Used once to generate a proper order object, then use the object
function createInfoOrder(order_id){
    var order = getOrderfromOrders(order_id);

    return { "transaction_id" : getIdOrder(order),
        "customers" : getCustomersOrder(order),
        "beverages_id" : getBeveragesOrder(order),
        "amount" : getAmountOrder(order),
        "price" : getPriceOrder(order),
        "fridgecode" : getCodeOrder(order),
        "timestamp" : getTimeOrder(order),
        "served" : getStatusOrder(order)
        } ;
}

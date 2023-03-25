// Return the object referenced by the id from the orders database
function getOrderfromOrders(order_id){
    var i=0;
    // Search for the corresponding id in the database
    while(order_id != orders[i].transaction_id) i++;
    
    return orders[i];
}

// Return the index of the order in the orders database from an object or an id
function getIndexfromOrders(order){
    // If the parameter is an object, use it to find the ID
    if (typeof order === "object" ) order = getIdOrder(order);
    return orders.findIndex(x => x.transaction_id == order);
}

// Return the id of the order from an ID or object
function getIdOrder(order){
    // If the parameter is a number, use it to find the order object by ID
    if (typeof order === 'number') order = getOrderfromOrders(order);
    
    // Check if the parameter is a valid object with a transaction_id property
    if (typeof order !== 'object' || !order.hasOwnProperty('transaction_id')) {
        throw new Error('Invalid order object. Missing transaction_id property.');
    }

    //return Number(order.transaction_id);
    return order.transaction_id; //Since hash is invalid for Number...
}

// Return the names of the customers from an ID or object
function getCustomersOrder(order){
    // If the parameter is a number, use it to find the order object by ID
    if (typeof order === 'number') order = getOrderfromOrders(order);
    
    // Check if the parameter is a valid object with a customers property
    if (typeof order !== 'object' || !order.hasOwnProperty('customers')) {
        throw new Error('Invalid order object. Missing customers property.');
    }
    return order.customers;
}

// Return the beverages of the order from an ID or object
function getBeveragesOrder(order){
    // If the parameter is a number, use it to find the order object by ID
    if (typeof order === 'number') order = getOrderfromOrders(order);
    
    // Check if the parameter is a valid object with a beverage_id property
    if (typeof order !== 'object' || !order.hasOwnProperty('beverages_id')) {
        throw new Error('Invalid order object. Missing beverages_id property.');
    }
    return order.beverages_id;
}

// Return the amount of each beverages of the order from an ID or object
function getAmountOrder(order){
    // If the parameter is a number, use it to find the order object by ID
    if (typeof order === 'number') order = getOrderfromOrders(order);
    
    // Check if the parameter is a valid object with a amount property
    if (typeof order !== 'object' || !order.hasOwnProperty('amount')) {
        throw new Error('Invalid order object. Missing amount property.');
    }

    console.log(order.amount);

    return order.amount;
}

// Return the fridgecode of the order from an ID or object
function getCodeOrder(order){
    // If the parameter is a number, use it to find the order object by ID
    if (typeof order === 'number') order = getOrderfromOrders(order);
    
    // Check if the parameter is a valid object with a fridgecode property
    if (typeof order !== 'object' || !order.hasOwnProperty('fridgecode')) {
        throw new Error('Invalid order object. Missing fridgecode property.');
    }
    return Number(order.fridgecode);
}

// Return the time of the order from an ID or object
function getTimeOrder(order){
    // If the parameter is a number, use it to find the order object by ID
    if (typeof order === 'number') order = getOrderfromOrders(order);
    
    // Check if the parameter is a valid object with a timestamp property
    if (typeof order !== 'object' || !order.hasOwnProperty('timestamp')) {
        throw new Error('Invalid order object. Missing timestamp property.');
    }

    return new Date(order.timestamp);
}

// Return the status of the order from ID or object
function getStatusOrder(order){
    // If the parameter is a number, use it to find the order object by ID
    if (typeof order === 'number') order = getOrderfromOrders(order);
    
    // Check if the parameter is a valid object with a served property
    if (typeof order !== 'object' || !order.hasOwnProperty('served')) {
        throw new Error('Invalid order object. Missing served property.');
    }

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
        "fridgecode" : getCodeOrder(order),
        "timestamp" : getTimeOrder(order),
        "served" : getStatusOrder(order)
        } ;
}

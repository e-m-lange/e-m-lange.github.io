// Create an order with an array of customer names or ID and 
// Used when a customer confirms their order
function CreateOrder(customers, beverages){
    var order = { "transaction_id" :  (+new Date).toString(36) + Math.random().toString(36), //https://stackoverflow.com/questions/32649704/how-to-generate-hash-from-timestamp
        "customers" : customers,
        "beverages_id" : beverages,
        "amount" : getAmountOrder(order),
        "fridgecode" : Math.floor(Math.random() * 900) + 100, //by ChatGPT
        "timestamp" : Date.now(),
        "served" : false
        };   
}

// Turn a multiple order into multiple single ones
// Used by the bartender
function MultipletoSingleOrder(order){
    for(i = 0; i < getCustomersOrder(order).length; i++){
        orders.push({"transaction_id" :  (+new Date).toString(36) + Math.random().toString(36), //https://stackoverflow.com/questions/32649704/how-to-generate-hash-from-timestamp
        "customers" : [getCustomersOrder(order)[i]],
        "beverages_id" : [getBeveragesOrder(order)[i]],
        "amount" : [getAmountOrder(order)[i]],
        "fridgecode" : undefined,
        "timestamp" : new Date,
        "served" : false
        });
    }

    orders.splice(getIndexfromOrders(order),1);
}

// Turn a single orders into one
// Used by the bartender
function SingletoMultipleOrder(orders_list){
    var customers_list = [];
    var beverages_list = [];
    var amounts_list = [];

    for(i = 0; i < orders_list.length; i++){
        customers_list.push(getCustomersOrder(orders_list[i])[0]);
        beverages_list.push(getBeveragesOrder(orders_list[i])[0]);
        amounts_list.push(getAmountOrder(orders_list[i])[0]);
    }

    orders.push({"transaction_id" :  (+new Date).toString(36) + Math.random().toString(36), //https://stackoverflow.com/questions/32649704/how-to-generate-hash-from-timestamp
        "customers" : customers_list,
        "beverages_id" : beverages_list,
        "amount" : amounts_list,
        "fridgecode" : undefined,
        "timestamp" : new Date,
        "served" : false
        });
    
    for(i = 0; i < orders_list.length; i++){
        orders.splice(getIndexfromOrders(orders_list[i]),1);
    } 
}

// Update the status of the order to served
// Used when the bartender do serve the order or when a VIP order
function UpdateOrderStatus(order){   
    // Find the order in the database
    const index = getIndexfromOrders(order);
    
    if (index === -1) {
        console.log("Error: Order ID not found");
        return;
    }
    
    // Update the order status
    orders[index].served = true;

    console.log("Updated status:", orders[index]);
}

// Delete the orders that are older than 24h ago by ChatGPT
function CleanOldOrders() {
    const now = Date.now(); // get the current time only once
    const time24hAgo = now - 24 * 60 * 60 * 1000; // calculate time 24 hours ago
    const indicesToDelete = []; // keep track of indices to delete

    for (let i = 0; i < orders.length; i++) {
        const orderTime = getTimeOrder(orders[i]); // get the time of the order
        if (orderTime < time24hAgo) {
        indicesToDelete.push(i); // add index to delete
        }
    }

    // remove orders from array using splice from the end of the array so it won't change the index of the objects before
    for (let i = indicesToDelete.length - 1; i >= 0; i--) {
        orders.splice(indicesToDelete[i], 1);
    }
}

// Return the total price of an order from an object or ID
function TotalPriceOrder(order){
   var amount = getAmountOrder(order);
   var beverages = getBeveragesOrder(order);
   var total = 0;

   for(var i = 0; i < amount.length; i++){
    for (var j = 0; j < amount[i].length; j++) {
        total += amount[i][j] * getPriceBeverage(beverages[i][j]);
    }
   }

   return total;
}
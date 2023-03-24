// Create an order with an array of customer names or one ID (for VIP) and a matrix of beverages
// Used when a customer confirms their order
// fix the amount calcul
function CreateOrder(customers_list, beverages_matrix){
    var amounts = []; 

    // Calcul the amount of each beverage for each customer
    for (var i = 0; i < customers_list.length; i++) {
        // Get the list of beverages for the current customer
        var customer_beverages = beverages_matrix[i];
        var customer_amounts = [];
        
        // Create an object to store the beverage counts for the current customer
        var beverage_counts = {};

        // Loop over the list of beverages for the current customer
        for (var j = 0; j < customer_beverages.length; j++) {
            // Get the ID of the current beverage
            var beverage_id = customer_beverages[j];
            
            // If the beverage count has not been initialized, set it to 0
            if (!beverage_counts[beverage_id]) beverage_counts[beverage_id] = 0;

            // Increment the beverage count for the current beverage
            beverage_counts[beverage_id]++;
        }
        
        // Loop over the keys in the beverage_counts object to create an array of beverage amounts for the current customer
        for (var beverage_id in beverage_counts) customer_amounts.push(beverage_counts[beverage_id]);
  
        // Add the customer's beverage amounts to the amounts array
        amounts.push(customer_amounts);
    }
    
    orders.push({ "transaction_id" :  (+new Date).toString(36) + Math.random().toString(36), //https://stackoverflow.com/questions/32649704/how-to-generate-hash-from-timestamp
        "customers" : customers_list,
        "beverages_id" : beverages_matrix,
        "amount" : amounts,
        "fridgecode" : Math.floor(Math.random() * 900) + 100, //by ChatGPT
        "timestamp" : Date.now(),
        "served" : false
        });   
}

console.log(orders);
CreateOrder(["Soyeon","Taeyang"],[[25053, 190719, 51029],[25053, 190719, 190719, 190719, 190719, 51029]]);
console.log(orders);


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
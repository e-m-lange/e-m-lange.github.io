// Create an order
// Used when a customer confirms their order
function CreateOrder(){

}

function UpdateOrderStatus(order){
    // If the parameter is an object, use it to find the ID
    if (typeof user === "object" ) order = getIdOrder(order);
    
    // Find the order in the database
    const orderIndex = iorders.findIndex(u => u.id == user);
    
    if (userIndex === -1) {
        console.log("Error: User ID not found");
        return;
    }

    // Validate the credit number
    if (typeof number !== "number") {
        console.log("Error: Invalid number");
        return;
    }

    // Convert creditSEK to a number
    let credits = parseFloat(accounts[userIndex].creditSEK);
    
    // Update the user's credits
    credits += number;
    accounts[userIndex].creditSEK = credits.toString();

    console.log("Updated credits:", accounts[userIndex].creditSEK);
}

// TO DO single order

// TO DO multiple orders

// TO DO delete order older that 24h

// TO DO get total price
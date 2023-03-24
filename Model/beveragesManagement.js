// Modify the stock of a beverage either with a id or an object
// Used when confirm order and adding stocks
function UpdateBeverageStock(beverage, number){  
    // Find the beverage in the database
    const index = getIndexfromDrinksInformation(beverage);
    
    if (index === -1) {
        console.log("Error: Beverage ID not found");
        return;
    }

    // Validate the amount
    if (typeof number !== "number") {
        console.log("Error: Invalid number");
        return;
    }

    // Modify the stock number
    drinks_information[index].stock += number;
    
    console.log("Updated stock:", drinks_information[index].stock);   
}

// pb : the changes are not persistant in the database -> use JSON
// Modify the stock of a beverage either with a id or an object
function updateBeverageStock(beverage, number){
    // If the parameter is an object, use it to find the ID
    if(typeof beverage === "object") beverage = getIdBeverage(beverage);
    
    var i = 0;

    // Search for the corresponding object in the database using the id
    while(i < parameters.menu_size && beverage != drinks_information[i].articleid) i++;

    if (i == parameters.menu_size) {
        console.log("Error: Beverage ID not found");
        return;
    }

    if (typeof number !== "number") {
        console.log("Error: Invalid number");
        return;
    }

    // Modify the stock number
    drinks_information[i].stock += number;
}

console.log(allBeverages()[0]);

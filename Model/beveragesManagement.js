// Modify the stock of beverage
function UpdateBeverageStock(beverage_id, number){
    var i=0;
    // Search for the corresponding id in the database
    while(beverage_id != drinks_information[i].articleid && i < parameters.menu_size) i++;
    
    // modify the stock number
    drink_information[i].stock = drink_information[i].stock + number;
}
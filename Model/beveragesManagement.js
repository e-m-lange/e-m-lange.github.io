// Returns all the beverages information
function allBeverages(){
    var collector = [];

    for (i = 0 ; i < parameters.menu_size ; i++){
        collector.push(getInfoBeverage(drinks[i]));
    }

    return collector;
}

//Return all the beverages alphabetically sorted by category and alcohol strength
function sortBeverage(){
    
}

// Returns the beverage information within a category from a list of beverages
function filterBeverageCategory(beverages, category) {
    var collector = [];

    for (i = 0; i < beverages.length; i++) {
        //We check if the beverage is from the selected category
        if (getCategoryBeverage(beverages[i]) == category){
            collector.push(getInfoBeverage(beverages[i]));
        }
    };
    
    return collector;
}

// Returns the beverage infomation that contain a percentage of alcohol within the strength range given in percent from a list of beverages
function filterBeverageStrength(beverages, strength_min, strength_max) {
    var collector = [];

    for (i = 0; i < beverages.length; i++) {
        // We check if the percentage alcohol strength within the given strength range
        if (getAlcoholBeverage(beverages[i]) > strength_min && getAlcoholBeverage(beverages[i]) < strength_max) {
            collector.push(getInfoBeverage(beverages[i]));
        };
    };

    return collector;
}

//TO DO allergies


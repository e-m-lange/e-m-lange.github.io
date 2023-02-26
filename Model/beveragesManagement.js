// Returns all the beverages information
function allBeverages(){
    var collector = [];

    for (i = 0 ; i < parameters.menu_size ; i++){
        collector.push(getInfoBeverage(drinks[i]));
    }

    return sortBeverages(collector);
}

//Return all the beverages sorted by category and alcohol strength by ChatGPT
function sortBeverages(beverages) {  
    return beverages.sort(compareBeverage);
}

// Custom sorting function by ChatGPT
function compareBeverages(a, b) {
    // Sort by category first
    if (a.category < b.category) return -1;
    if (a.category > b.category) return 1;

    // If in the same category, sort by alcohol strength
    if (getAlcoholBeverage(a) < getAlcoholBeverage(b)) return -1;
    if (getAlcoholBeverage(a) > getAlcoholBeverage(b)) return 1;

    // If in the same category and same alcohol strength, sort by price
    if (a.price < b.price) return -1;
    if (a.price > b.price) return 1;

    return 0;
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


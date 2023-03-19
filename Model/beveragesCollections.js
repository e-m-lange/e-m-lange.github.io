// Returns all the beverages information in a array sorted by category and alcohol strength
function allBeverages(){
    var collector = [];

    for (i = 0 ; i < parameters.menu_size ; i++){
        collector.push(getInfoBeverage(drinks[i].articleid));
    }

    return sortBeverages(collector);
}

// Custom sorting function by ChatGPT
function compareBeverages(a, b) {
    // Sort by category first
    if (getCategoryBeverage(a) < getCategoryBeverage(b)) return -1;
    if (getCategoryBeverage(a) > getCategoryBeverage(b)) return 1;

    // If in the same category, sort by alcohol strength
    if (getAlcoholBeverage(a) < getAlcoholBeverage(b)) return -1;
    if (getAlcoholBeverage(a) > getAlcoholBeverage(b)) return 1;

    // If in the same category and same alcohol strength, sort by price
    if (getPriceBeverage(a) < getPriceBeverage(b)) return -1;
    if (getPriceBeverage(a) > getPriceBeverage(b)) return 1;

    return 0;
}

//Return all the beverages sorted by category and alcohol strength by ChatGPT
function sortBeverages(beverages) {  
    return beverages.sort(compareBeverages);
}

// Returns the beverages on the menu from all the available drinks
function BeveragesOnMenu() {
    var collector = [];
    var beverages = allBeverages(); // all the drinks available

    for (i = 0; i < beverages.length; i++) {
        // We check if the drink is not hidden
        if (!getHiddenBeverage(beverages[i])) collector.push(beverages[i]);
    };

    return collector;
}

// Returns the beverages hidden from all the available drinks
function BeveragesHidden() {
    var collector = [];
    var beverages = allBeverages();

    for (i = 0; i < beverages.length; i++) {
        // We check if the drink is hidden
        if (getHiddenBeverage(beverages[i])) collector.push(beverages[i]);
    };

    return collector;
}

// Returns the beverage information within a category from a list of beverages
function filterBeverageCategory(category, beverages) {
    var collector = [];

    // if there is no list specified get all the drinks
    if(typeof beverages === "undefined") beverages = allBeverages();

    for (i = 0; i < beverages.length; i++) {
        //We check if the beverage is from the selected category
        if (getCategoryBeverage(beverages[i]) == category){
            collector.push(beverages[i]);
        }
    };
    
    return collector;
}

// Returns the beverage infomation that contain a percentage of alcohol within the strength range given in percent from a list of beverages
function filterBeverageStrength(strength_min, strength_max, beverages) {
    var collector = [];

    // if there is no list specified get all the drinks
    if(typeof beverages === "undefined") beverages = allBeverages();

    for (i = 0; i < beverages.length; i++) {
        // We check if the percentage alcohol strength within the given strength range
        if (getAlcoholBeverage(beverages[i]) > strength_min && getAlcoholBeverage(beverages[i]) < strength_max) {
            collector.push(beverages[i]);
        };
    };

    return collector;
}

// Returns the beverage infomation that does not contain the allergies from a list of beverages
function filterBeverageAllergies(allergies, beverages) {
    var collector = [];
    
    // if there is no list specified get all the drinks
    if(typeof beverages === "undefined") beverages = allBeverages();

    for (i = 0; i < beverages.length; i++) {
        var checkmark = 0; // Check the number of allergies the drink pass

        // We check if the drink contains gluten and one allergy is gluten
        if (!getGlutenBeverage(beverages[i]) && allergies.includes("gluten")) checkmark++;

        // We check if the drink contains nuts and one allergy is nuts
        if (!getNutsBeverage(beverages[i]) && allergies.includes("nuts")) checkmark++;

        // We check if the drink contains lactose and one allergy is lactose
        if (!getLactoseBeverage(beverages[i]) && allergies.includes("lactose")) checkmark++;

        if (checkmark == allergies.length) collector.push(beverages[i]);
    };

    return collector;
}

// Returns the beverages with less that 5 items left from a list of beverages
function BeveragesToRestock(beverages) {
    var collector = [];
    
    // if there is no list specified get all the drinks
    if(typeof beverages === "undefined") beverages = allBeverages();
    
    for (i = 0; i < beverages.length; i++) {

        // We check if the drink has less that 5 items in stock
        if (getStockBeverage(beverages[i]) <= 5) collector.push(beverages[i]);
    };

    return collector;
}

//console.log(allBeverages());
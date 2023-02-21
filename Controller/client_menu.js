// Returns a list of all the names of the beverages in the database.
function allBeverages() {

    // Using a local variable to collect the items
    var collector = [];

    // The beverages are stored in the variable drinks
    for (i = 0; i < drinks.lenght; i++) {
        collector.push(drinks[i].name);
    };
    
    return collector;
}

// Returns the names of beverages within a category.
function categoryBeverages(category) {

    // Using a local variable to collect the items
    var collector = [];

    // The beverages are stored in the variable drinks
    for (i = 0; i < 100; i++) {

        //We check if the beverage is from the selected category
        if (drinks[i].catgegory == category){
            collector.push(drinks[i].name);
        }
    };
    
    return collector;
}

// This function returns the names of all beverages that contain a percentage of alcohol
// within than the strength given in percent.
function alcoolicBeverages(strength_min, strength_max) {

    // Using a local variable to collect the items
    var collector = [];

    for (i = 0; i < 100; i++) {

        // We check if the percentage alcohol strength stored in the data base is within the given strength
        if (percentToNumber(drinks[i].alcoholstrength) > strength_min && percentToNumber(drinks[i].alcoholstrength) < strength_max) {
            collector.push(drinks[i].name);
        };
    };

    return collector;
}

//TO DO allergies

// Lists all beverage types in the database.
function beverageTypes() {
    var types = [];
    for (i = 0; i < 100; i++) {
        addToSet(types, drinks[i].catgegory);
    };
    return types;
}

// Adds an item to a set, only if the item is not already there.
function addToSet(set, item) {
    if (!set.includes(item)) {
        set.push(item);
    }
    return set;
}

// Convenience function to change "xx%" into the percentage in whole numbers.
function percentToNumber(percentStr) {
    return Number(percentStr.slice(0,-1));
}
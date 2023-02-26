// Return the name of the beverage
function getNameBeverage(beverage){
    if (beverage.name2) return beverage.name + ", " + beverage.name2;
    return beverage.name;
}

// Return the price of the beverage
function getPriceBeverage(beverage){
    return Number(beverage.priceinclvat) || beverage.price;
}

// Return the category of the beverage
function getCategoryBeverage(beverage){
    return beverage.catgegory || beverage.category;
}

// Return the producer of the beverage
function getProducerBeverage(beverage){
    return beverage.producer;
}

// Return the country of the beverage
function getCountryBeverage(beverage){
    return beverage.countryoforiginlandname || beverage.country;
}

// Convenience function to change "xx%" into the percentage in whole numbers.
function percentToNumber(percentStr) {
    return Number(percentStr.slice(0,-1));
}

// Return the alcohol strength of the beverage
function getAlcoholBeverage(beverage){
    if (beverage.alcoholstrength) return percentToNumber(beverage.alcoholstrength);

    return beverage.strength;
}

// Return the production year of the beverage
function getYearBeverage(beverage){
    return Number(beverage.productionyear) || beverage.year;
}

// Return all informations relative to the beverage
function getInfoBeverage(beverage){
    return { "name" : getNameBeverage(beverage),
        "category" : getCategoryBeverage(beverage),
        "strength" : getAlcoholBeverage(beverage),
        "producer" : getProducerBeverage(beverage),
        "country" : getCountryBeverage(beverage),
        "year" : getYearBeverage(beverage),
        "price" : getPriceBeverage(beverage)} || beverage;
}

// Return the list of all beverage types in the database
function getTypesBeverage() {
    // Using a set to collect the category name
    var types = new Set([]);
    
    for (i = 0; i < parameters.menu_size; i++){
        types.add(getCategoryBeverage(drinks[i]));
    };
    
    return Array.from(types.values());
}
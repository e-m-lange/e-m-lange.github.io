// Return the object referenced by the id from the drinks database
function getBeveragefromDrinks(beverage_id){
    var i=0;
    // Search for the corresponding id in the database
    while(beverage_id != drinks[i].articleid && i < parameters.menu_size) i++;
    
    return drinks[i];
}

// Return the object referenced by the id from the drinks_information database
function getBeveragefromDrinksInformation(beverage_id){
    var i=0;
    // Search for the corresponding id in the database
    while(beverage_id != drinks_information[i].articleid && i < parameters.menu_size) i++;
    
    return drinks_information[i];
}

// Return the id of the beverage
function getIdBeverage(beverage){
    return beverage.articleid;
}

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

// Return the stock size of the beverage
function getStockBeverage(beverage){
    return Number(beverage.stock);
}

// Return true if the beverage is hidden and false if not
function getHiddenBeverage(beverage){
    return beverage.hiddeninmenu;
}

// Return true if the beverage is for VIP and false if not
function getVIPBeverage(beverage){
    return beverage.specialvip;
}

// Return the serving size of the beverage
function getServingBeverage(beverage){
    return beverage.servingsize;
}

// Return the tannin of the beverage
function getTanninBeverage(beverage){
    return beverage.tannin;
}

// Return true if the beverage contains gluten and fasle if not
function getGlutenBeverage(beverage){
    return beverage.gluten;
}

// Return true if the beverage contains lactose and fasle if not
function getLactoseBeverage(beverage){
    return beverage.lactose;
}

// Return true if the beverage contains nuts and fasle if not
function getNutsBeverage(beverage){
    return beverage.nuts;
}

// Return all informations relative to the beverage
// Used once to generate a proper beverage object, then use the object
function createInfoBeverage(beverage_id){
    var beverage = getBeveragefromDrinks(beverage_id);
    var info = getBeveragefromDrinksInformation(beverage_id);

    return { "articleid" : getIdBeverage(beverage),
        "name" : getNameBeverage(beverage),
        "category" : getCategoryBeverage(beverage),
        "strength" : getAlcoholBeverage(beverage),
        "producer" : getProducerBeverage(beverage),
        "country" : getCountryBeverage(beverage),
        "year" : getYearBeverage(beverage),
        "price" : getPriceBeverage(beverage),
        "stock": getStockBeverage(info),
        "hiddeninmenu": getHiddenBeverage(info),
        "specialvip": getVIPBeverage(info),
        "servingsize": getServingBeverage(info),
        "tannin": getTanninBeverage(info),
        "gluten": getGlutenBeverage(info),
        "lactose": getLactoseBeverage(info),
        "nuts": getNutsBeverage(info)} ;
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
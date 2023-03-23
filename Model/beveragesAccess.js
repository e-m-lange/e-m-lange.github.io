// Return the object referenced by the id from the drinks database
function getBeveragefromDrinks(beverage_id){
    // Search for the corresponding id in the database by ChatGPT
    const beverage = drinks.find(beverage => beverage.articleid == beverage_id);

    // If a match is found, return the beverage object; otherwise, return undefined
    return beverage;
}

// Return the object referenced by the id from the drinks_information database
function getBeveragefromDrinksInformation(beverage_id){
    // Search for the corresponding id in the database by ChatGPT
    const beverage = drinks_information.find(beverage => beverage.articleid == beverage_id);
    
    // If a match is found, return the beverage object; otherwise, return undefined
    return beverage;
}

// Return the id of the beverage from an object or an ID proof checked by ChatGPT
function getIdBeverage(beverage){
    // If the parameter is a number, use it to find the beverage object by ID
    if (typeof beverage === 'number') beverage = getBeveragefromDrinks(beverage);
    
    // Check if the parameter is a valid object with a articleid property
    if (typeof beverage !== 'object' || !beverage.hasOwnProperty('articleid')) {
        throw new Error('Invalid beverage object. Missing articleid property.');
    }
    
    return Number(beverage.articleid);
}

// Return the name of the beverage from an object or an ID
function getNameBeverage(beverage){
    // If the parameter is a number, use it to find the beverage object by ID
    if (typeof beverage === 'number') {
        beverage = getBeveragefromDrinks(beverage);
    }
    
    // Check if the parameter is a valid object with a name property
    if (typeof beverage !== 'object' || !beverage.hasOwnProperty('name')) {
        throw new Error('Invalid beverage object. Missing name property.');
    }
    
    // If the name2 property is present, append it with a comma separator
    return beverage.name2 ? `${beverage.name}, ${beverage.name2}` : beverage.name;
}

// Return the price of the beverage from an object or an ID
function getPriceBeverage(beverage){
    // If the parameter is a number, use it to find the beverage object by ID
    if (typeof beverage === 'number') beverage = getBeveragefromDrinks(beverage);
    
    // Check if the parameter is a valid object with a price property
    if (typeof beverage !== 'object' || (!beverage.hasOwnProperty('price') && !beverage.hasOwnProperty('priceinclvat'))) {
        throw new Error('Invalid beverage object. Missing price property.');
    }

    return Number(beverage.priceinclvat) || beverage.price;
}

// Return the category of the beverage from an object or an ID
function getCategoryBeverage(beverage){
    // If the parameter is a number, use it to find the beverage object by ID
    if (typeof beverage === 'number') beverage = getBeveragefromDrinks(beverage);
    
    // Check if the parameter is a valid object with a category property
    if (typeof beverage !== 'object' || !beverage.hasOwnProperty('category')) {
        throw new Error('Invalid beverage object. Missing category property.');
    }

    return beverage.category;
}

// Return the producer of the beverage from an object or an ID
function getProducerBeverage(beverage){
    // If the parameter is a number, use it to find the beverage object by ID
    if (typeof beverage === 'number') beverage = getBeveragefromDrinks(beverage);
    
    // Check if the parameter is a valid object with a producer property
    if (typeof beverage !== 'object' || !beverage.hasOwnProperty('producer')) {
        throw new Error('Invalid beverage object. Missing producer property.');
    }

    return beverage.producer;
}

// Return the country of the beverage from an object or an ID
function getCountryBeverage(beverage){
    // If the parameter is a number, use it to find the beverage object by ID
    if (typeof beverage === 'number') beverage = getBeveragefromDrinks(beverage);
    
    // Check if the parameter is a valid object with a country property
    if (typeof beverage !== 'object' || (!beverage.hasOwnProperty('country') && !beverage.hasOwnProperty('countryoforiginlandname'))) {
        throw new Error('Invalid beverage object. Missing country property.');
    }

    return beverage.countryoforiginlandname || beverage.country;
}

// Convenience function to change "xx%" into the percentage in whole numbers.
function percentToNumber(percentStr) {
    return Number(percentStr.slice(0,-1));
}

// Return the alcohol strength of the beverage from an object or an ID
function getAlcoholBeverage(beverage){
    // If the parameter is a number, use it to find the beverage object by ID
    if (typeof beverage === 'number') beverage = getBeveragefromDrinks(beverage);
    
    // Check if the parameter is a valid object with a strength property
    if (typeof beverage !== 'object' || (!beverage.hasOwnProperty('strength') && !beverage.hasOwnProperty('alcoholstrength'))) {
        throw new Error('Invalid beverage object. Missing strength property.');
    }
    
    return beverage.strength || percentToNumber(beverage.alcoholstrength);
}

// Return the production year of the beverage from an object or an ID
function getYearBeverage(beverage){
    // If the parameter is a number, use it to find the beverage object by ID
    if (typeof beverage === 'number') beverage = getBeveragefromDrinks(beverage);
    
    // Check if the parameter is a valid object with a productionyear property
    if (typeof beverage !== 'object' ||  !beverage.hasOwnProperty('productionyear')) {
        throw new Error('Invalid beverage object. Missing productionyear property.');
    }

    return Number(beverage.productionyear);
}

// Return the stock size of the beverage from an object or an ID
function getStockBeverage(beverage){
    // If the parameter is a number, use it to find the beverage object by ID
    if (typeof beverage === 'number') beverage = getBeveragefromDrinksInformation(beverage);
    
    // Check if the parameter is a valid object with a stock property
    if (typeof beverage !== 'object' ||  !beverage.hasOwnProperty('stock')) {
        throw new Error('Invalid beverage object. Missing stock property.');
    }

    return Number(beverage.stock);
}

// Return true if the beverage is hidden and false if not from an object or an ID
function getHiddenBeverage(beverage){
    // If the parameter is a number, use it to find the beverage object by ID
    if (typeof beverage === 'number') beverage = getBeveragefromDrinksInformation(beverage);
    
    // Check if the parameter is a valid object with a hiddeninmenu property
    if (typeof beverage !== 'object' ||  !beverage.hasOwnProperty('hiddeninmenu')) {
        throw new Error('Invalid beverage object. Missing hiddeninmenu property.');
    }

    return beverage.hiddeninmenu;
}

// Return true if the beverage is for VIP and false if not from an object or an ID
function getVIPBeverage(beverage){
    // If the parameter is a number, use it to find the beverage object by ID
    if (typeof beverage === 'number') beverage = getBeveragefromDrinksInformation(beverage);
    
    // Check if the parameter is a valid object with a specialvip property
    if (typeof beverage !== 'object' ||  !beverage.hasOwnProperty('specialvip')) {
        throw new Error('Invalid beverage object. Missing specialvip property.');
    }

    return beverage.specialvip;
}

// Return the serving size of the beverage from an object or an ID
function getServingBeverage(beverage){
    // If the parameter is a number, use it to find the beverage object by ID
    if (typeof beverage === 'number') beverage = getBeveragefromDrinksInformation(beverage);
    
    // Check if the parameter is a valid object with a servingsize property
    if (typeof beverage !== 'object' ||  !beverage.hasOwnProperty('servingsize')) {
        throw new Error('Invalid beverage object. Missing servingsize property.');
    }

    return beverage.servingsize;
}

// Return the tannin of the beverage from an object or an ID
function getTanninBeverage(beverage){
    // If the parameter is a number, use it to find the beverage object by ID
    if (typeof beverage === 'number') beverage = getBeveragefromDrinksInformation(beverage);
    
    // Check if the parameter is a valid object with a tannin property
    if (typeof beverage !== 'object' ||  !beverage.hasOwnProperty('tannin')) {
        throw new Error('Invalid beverage object. Missing tannin property.');
    }

    return beverage.tannin;
}

// Return true if the beverage contains gluten and fasle if not from an object or an ID
function getGlutenBeverage(beverage){
    // If the parameter is a number, use it to find the beverage object by ID
    if (typeof beverage === 'number') beverage = getBeveragefromDrinksInformation(beverage);
    
    // Check if the parameter is a valid object with a gluten property
    if (typeof beverage !== 'object' ||  !beverage.hasOwnProperty('gluten')) {
        throw new Error('Invalid beverage object. Missing gluten property.');
    }

    return beverage.gluten;
}

// Return true if the beverage contains lactose and fasle if not from an object or an ID
function getLactoseBeverage(beverage){
    // If the parameter is a number, use it to find the beverage object by ID
    if (typeof beverage === 'number') beverage = getBeveragefromDrinksInformation(beverage);
    
    // Check if the parameter is a valid object with a lactose property
    if (typeof beverage !== 'object' ||  !beverage.hasOwnProperty('lactose')) {
        throw new Error('Invalid beverage object. Missing lactose property.');
    }

    return beverage.lactose;
}

// Return true if the beverage contains nuts and fasle if not from an object or an ID
function getNutsBeverage(beverage){
    // If the parameter is a number, use it to find the beverage object by ID
    if (typeof beverage === 'number') beverage = getBeveragefromDrinksInformation(beverage);
    
    // Check if the parameter is a valid object with a nuts property
    if (typeof beverage !== 'object' ||  !beverage.hasOwnProperty('nuts')) {
        throw new Error('Invalid beverage object. Missing nuts property.');
    }

    return beverage.nuts;
}

// Return all informations relative to the beverage from an ID
// Used to generate a proper beverage object
function getInfoBeverage(beverage_id){
    var beverage = getBeveragefromDrinks(beverage_id);
    var info = getBeveragefromDrinksInformation(beverage_id);

    return { "articleid" : getIdBeverage(beverage),
        "name" : getNameBeverage(beverage),
        "category" : getCategoryBeverage(beverage),
        "strength" : getAlcoholBeverage(beverage),
        "producer" : getProducerBeverage(beverage),
        "country" : getCountryBeverage(beverage),
        "productionyear" : getYearBeverage(beverage),
        "price" : getPriceBeverage(beverage),
        "stock": getStockBeverage(info),
        "hiddeninmenu": getHiddenBeverage(info),
        "specialvip": getVIPBeverage(info),
        "servingsize": getServingBeverage(info),
        "tannin": getTanninBeverage(info),
        "gluten": getGlutenBeverage(info),
        "lactose": getLactoseBeverage(info),
        "nuts": getNutsBeverage(info)
    } ;
}

// Return the list of all beverage types in the database
function getTypesBeverage() {
    // Using a set to collect the category name
    var types = new Set([]);
    
    // Add all the categories from the database, will only be added once since it's a set
    for (i = 0; i < parameters.menu_size; i++){
        types.add(getCategoryBeverage(drinks[i]));
    };
    
    return Array.from(types.values());
}

// Return the list of allergies in the database
function getAllerigesBeverage() {
    return ["lactose", "gluten", "nuts"];
}
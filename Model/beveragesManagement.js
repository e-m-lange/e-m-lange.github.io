//Create a card for the beverage
function elementBeverage(contact){
    var name = create_element('div',{'class':'name'},[contact.firstname+" "+contact.lastname]);
    var email = create_element('div',{'class':'email'},['email : '+contact.email]);
    var phone = create_element('div',{'class':'phone'},['telephone : '+contact.phone]);
    var address = create_element('div',{'class':'address'},['adresse : '+contact.address]);
    var birthday = create_element('div',{'class':'birthday'},['anniversaire : '+contact.birthday]);
    var link = create_element('a',{'href': 'contact.picture'},[contact.web]);
    var web = create_element('div',{'class':'web'},[link]);
  
    // les fonctions modify_contact et remove_contact prennent en argument l'indice du contact dans la liste contacts
    var modifier = create_element('a',{'href':'#','onclick':'modify_contact('+contacts.indexOf(contact)+')'},['Modifier']);
    var supprimer = create_element('a',{'href':'#','onclick':'remove_contact('+contacts.indexOf(contact)+')'},['Supprimer']);
    var div_action = create_element('div',{'class':'actions mt-3'},[modifier," ",supprimer]);
  
    var div_flex = create_element('div',{'class':'flex-fill'},[name,email,phone,address,birthday,web,div_action]);
    var img = create_element('img',{'class':'rounded-circle float-start flex-shrink-0','src':contact.picture,'width':'96','height':'96'});
    var div_list = create_element('div',{'class':'list-group-item list-group-item-action d-flex gap-3 py-3'},[img,div_flex]);
    return div_list;
  }

//Display the list of beverages
function sallBeverages(){
    var liste = document.getElementById('contact-list'); //menu display zone
    for (i = 0 ; i < 100 ; i++){
      liste.appendChild(contact_as_element(contacts[i])); // ajoute chaque contact de contacts à la div contact-list
    }
}

// Returns a list of all the names of the beverages in the database.
function allBeverages() {

    // Using a local variable to collect the items
    var collector = [];

    // The beverages are stored in the variable drinks
    for (i = 0; i < drinks.lenght; i++) {
        collector.push(drinks[i].name); //instead show the drink card
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

function getString(id){
    var lang = parameters.lang;
    return languages.lang.id;
}

console.log(getString("language"));
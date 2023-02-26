//Create a card for the beverage
function elementBeverage(beverage){
    var name = create_element('div',{'class':'bev_name'},[beverage.name]);
    var price = create_element('div',{'class':'bev_price'},[beverage.priceinclvat]);
    var category = create_element('div',{'class':'bev_category'},[beverage.category]);
    
    var div_list = create_element('div',{'class':'bev_card'},[name, price, category]);
    return div_list;
}

// Display all the beverage cards
function displayBeverages(){
    //Select the menu display zone
    var menu = document.getElementById('');

    //Add each beverage to the menu
    for (i = 0 ; i < 100 ; i++){
      menu.appendChild(elementBeverage(drinks[i]));
    }
}
//Create a card for the beverage
function CreateItem(beverage){
  var name = createElement('div',{'class':'bev_name'},[getNameBeverage(beverage)]);
  var price = createElement('div',{'class':'bev_price'},[getPriceBeverage(beverage)]);
  var category = createElement('div',{'class':'bev_category'},[getCategoryBeverage(beverage)]);
  var country = createElement('div', {"class": "bev_country"}, [getCountryBeverage(beverage)]);
  
  var icon = createElement("img", {"href": "./jpg/DrinksIcon.jpg", "height": "20px", "width" : "10px", "class": "img_card"});
  var text = createElement("div", {"class": "text_card"}, [name,category,country,price]);

  var info_popup = createElement("p", {"class": "info_popup_card"}, [beverage]);
  var info = createElement("div", {"class":"info_card"}, [getString("button info"), info_popup]);
  
  var card = createElement("div", {"class": "item", "id": getIdBeverage(beverage)}, [info, icon, text]); //ID required for access later

  card.draggable = true;
  card.ondragstart = CstmrDrag;
  
  return card;
}
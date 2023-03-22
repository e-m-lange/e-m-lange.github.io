//Create a card for the beverage
function CreateItem(beverage){
  var name = createElement('div',{'class':'bev_name'},[getNameBeverage(beverage)]);
  var price = createElement('div',{'class':'bev_price'},[getPriceBeverage(beverage), "kr"]);
  var category = createElement('div',{'class':'bev_category'},[getCategoryBeverage(beverage)]);
  var country = createElement('div', {"class": "bev_country"}, [getCountryBeverage(beverage)]);
  
  var icon = createElement("img", {"src": "./jpg/DrinksIcon.jpg", "height": "20px", "width" : "10px", "class": "img_card"});
  var text = createElement("div", {"class": "text_card"}, [name,category,country,price]);
  var textIconGroup = createElement("div", {"class": "textIconGroup"}, [text, icon]); //Appears better in the view.

  var info_popup = createElement("p", {"class": "info_popup_card"}, [beverage]);
  var info = createElement("div", {"class":"info_card"}, [getString("button info"), info_popup]);

  var card = createElement("div", {"class": "item", "id": getIdBeverage(beverage)}, [textIconGroup, info]); //Reordered for better display. ID required for access later.

  card.draggable = true;
  card.ondragstart = CstmrDrag;
  
  return card;
}
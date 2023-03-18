//Create a card for the beverage
function CreateItem(beverage){
  var name = createElement('div',{'class':'bev_name'},[getNameBeverage(beverage)]);
  var price = createElement('div',{'class':'bev_price'},[getPriceBeverage(beverage)]);
  var category = createElement('div',{'class':'bev_category'},[getCategoryBeverage(beverage)]);
  var country = createElement('div', {"class": "bev_country"}, [getCountryBeverage(beverage)]);
  
  var icon = document.createElement("img", {"href": "./jpg/DrinksIcon.jpg", "height": "20px", "width" : "10px", "class": "img_card"});
  var text = document.createElement("div", {"class": "text_card"}, [name,category,country,price]);
  
  var info_popup = document.createElement("p", {"class": "info_popup_card"}, [/*getInfoBeverage(beverage)*/]);
  var info = document.createElement("div", {"class":"info_card"}, [getString("button info"), info_popup]);
  
  var card = document.createElement("div", {"class": "item"}, [info, icon, text]);

  card.draggable = true;
  card.ondragstart = CstmrDrag;
  
  return card;
}
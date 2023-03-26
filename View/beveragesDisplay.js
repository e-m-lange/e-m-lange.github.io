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



//Purpose: Serves as the base of any card, specific changes are made in the other functions.
function PopUpCardBase(beverage) {
  if (document.getElementsByClassName("popUpCard").length > 0) { //Get rid of the old popup cards first.
    document.getElementsByClassName("popUpCard")[0].remove();
  }

  var name = createElement('div',{"class": "popUpLabel"},["Name: ", getNameBeverage(beverage)]);
  var price = createElement('div',{"class": "popUpLabel"},["Price: ", getPriceBeverage(beverage), "kr"]);
  var category = createElement('div',{"class": "popUpLabel"},["Category: ", getCategoryBeverage(beverage)]);
  var country = createElement('div', {"class": "popUpLabel"}, ["Country: ", getCountryBeverage(beverage)]);
  var producer = createElement('div', {"class": "popUpLabel"}, ["Producer: ", getProducerBeverage(beverage)]);
  var year = createElement('div', {"class": "popUpLabel"}, ["Year: ", getYearBeverage(beverage)]);
  var infoDiv = createElement("div", {"class": "popUpLabelContainer"}, [name, price, category, country, producer, year]);

  var crossBtn = createElement("button", {"class": "crossBtn"}, ["X"]); //X button to close.
  crossBtn.addEventListener("click", ClickCrossBtn);

  var baseCard = createElement("div", {"class": "popUpCard"}, [crossBtn, infoDiv]);

  return baseCard;
}

function PopUpCardDefault() {
}

//Purpose: Used when the item is selected when adding an item to the order by a staff member.
function PopUpAddToOrder(beverage, addToOrderFunc) {
  var card = PopUpCardBase(beverage);
  card.lastChild.appendChild(createElement("div", {"class": "popUpLabel", "style": "height: 15px"})); //Empty space.
  card.lastChild.appendChild(createElement("div", {"class": "popUpLabel"}, ["Quantity: ", getStockBeverage(beverage)]));
  card.lastChild.appendChild(createElement("div", {"class": "popUpLabel", "style": "height: 15px"})); //Empty space.
  var addToOrderBtn = createElement("button", {"bevId": beverage, "class": "popupAddToOrderBtn", "onClick": "AddItemToUnassigned(this.getAttribute('bevId'))"}, ["Add To Order"]);
  addToOrderBtn.addEventListener("click", AddedToOrderNotification);
  card.lastChild.appendChild(addToOrderBtn);

  return card;
}

//Purpose: show a notification that an item has been added.
function AddedToOrderNotification() {
  var notification = createElement("div", {"id": "addToOrderNotif"}, ["Added item to order (unassigned)!"]);
  document.body.getElementsByClassName("mainContent")[0].appendChild(notification);
  //Remove the notification after 2 seconds delay.
  setTimeout(function () {
    document.getElementById("addToOrderNotif").style.opacity = 0;
  }, 1300);
  setTimeout(function () {
    document.getElementById("addToOrderNotif").remove();
  }, 1500);
}

//Purpose: Used to display on staff page. Difference it that is shows quantity as well & ability to hide the beverage.
function PopUpStaff(beverage) {
  var card = PopUpCardBase(beverage);
  card.lastChild.appendChild(createElement("div", {"class": "popUpLabel", "style": "height: 15px"})); //Empty space.
  card.lastChild.appendChild(createElement("div", {"class": "popUpLabel"}, ["Quantity: ", getStockBeverage(beverage)]));

  return card;
}

//Purpose: Used when the item is selected in the inventory and the current user is the manager/owner.
function PopUpManager(beverage) {
  var card = PopUpCardBase(beverage);
  card.lastChild.appendChild(createElement("div", {"class": "popUpLabel", "style": "height: 15px"})); //Empty space.
  card.lastChild.appendChild(createElement("div", {"class": "popUpLabel"}, ["Quantity: ", getStockBeverage(beverage)]));
  var addToStockBtn = createElement("button", {"id": "addStockBtn", "bevId": beverage, "class": "popUpStockManager", "onClick": "MessageBoxAddStock()"}, [getString("button add stock")]);
  card.lastChild.appendChild(addToStockBtn);

  return card;
}

//Purpose: Called when adding stock. Only manager / owner has access. Message box waiting for input pops up, can enter input to add new stock.
function MessageBoxAddStock() {
  document.body.appendChild(CreateMessageBox(getString("message enter stock"), true)); //Open a messagebox to get how many items to add to stock.
  document.getElementById("defMessBox").addEventListener("MessageClosedEv", function(ev) { //Call this when the messagebox is closed.
    var bevId = document.getElementById("addStockBtn").getAttribute("bevId");
    try {
      UpdateBeverageStock(parseInt(bevId), parseInt(ev.input)); //Change stock.
      ClearAllInventoryItems();
      LoadRunningOutSoon();
      LoadInventoryItems();
      ManageStaffInventoryListeners();
      document.body.getElementsByClassName("mainContent")[0].appendChild(PopUpStaff(parseInt(bevId))); //To easily see the changes.
    }
    catch (error) {
      console.log("Invalid new stock number");
    }
  }, false);
}

//Purpose: When X button is clicked, remove the popup.
function ClickCrossBtn(ev) {
  ev.target.parentElement.remove();
}
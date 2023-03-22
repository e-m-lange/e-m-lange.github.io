function CreateStaffInventoryPage() {
    var viewHiddenBtnEl = createElement("div", {"id": "viewHiddenBtn"});
    //-----------------------------------------------------------------------//
    var allInventoryEl = createElement("div", {"id": "allInventory"});
    var allInventoryLabelEl = createElement("div", {"id": "allInventoryLabel"});
    var separatorEl = createElement("div", {"id": "separator"}); //White line separating the running out section from the rest of the inventory
    var runningOutEl = createElement("div", {"id": "runningOut"});
    var runningOutLabelEl = createElement("label", {"id": "runningOutLabel"});
    //-----------------------------------------------------------------------//
    var menuZoneEl = createElement("div", {"id": "menuZone"}, [runningOutLabelEl, runningOutEl, separatorEl, allInventoryLabelEl, allInventoryEl]);
    var optionZoneEl = createElement("div", {"id": "actionZone"}, [viewHiddenBtnEl]); //Will hold the search filters
    //-----------------------------------------------------------------------//
    var navBarEl = CreateNavBar();
    //-----------------------------------------------------------------------//
    SetChangeLangAfterFunc( function() { parameters.lang = this.getAttribute("langType"); },)
    var staffInvPageEl = createElement("div", {"class": "mainContent"}, [optionZoneEl, navBarEl, CreateMenuBar(), menuZoneEl]);

    document.body.appendChild(staffInvPageEl);
    SetStaffInventoryLabels();
    LoadInventoryItems();
}

function SetStaffInventoryLabels() {
    $("#viewHiddenBtn").text("View hidden items");
    $("#runningOutLabel").text(getString("string all inventory"));
    $("#allInventoryLabel").text(getString("string all inventory"));
}

function LoadInventoryItems() {
    //Load the menu items.
    var beverages = allBeverages();
    for (i = 0; i < beverages.length; i++) {
        const element = document.getElementById("menuZone");
        element.appendChild(CreateItem(beverages[i]));
    }
}

//When adding an item to the order on the staff order page, load this page but with the circular button having a different functionality.
function SetStaffInventoryAddToOrder() {

}
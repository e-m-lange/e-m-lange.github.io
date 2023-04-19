function CreateStaffInventoryPage(addFromMenuPage = false) { //If true, it will load this page for the StaffOrderPage when adding item from the menu.
    if (!addFromMenuPage) { //If just loading the page as the normal Inventory page.
        var viewHiddenBtnEl = createElement("div", {"id": "viewHiddenBtn"});
    }
    //-----------------------------------------------------------------------//
    var allInventoryEl = createElement("div", {"id": "allInventory"});
    var allInventoryLabelEl = createElement("label", {"id": "allInventoryLabel"});
    var separatorEl = createElement("div", {"id": "separator"}); //White line separating the running out section from the rest of the inventory
    if (!addFromMenuPage) { //If just loading the page as the normal Inventory page.
        var runningOutEl = createElement("div", {"id": "runningOut"});
        var runningOutLabelEl = createElement("label", {"id": "runningOutLabel"});
    }
    //-----------------------------------------------------------------------//
    var menuZoneEl;
    var optionZoneEl;
    if (!addFromMenuPage) { //If just loading the page as the normal Inventory page.
        menuZoneEl = createElement("div", {"id": "menuZone"}, [runningOutLabelEl, runningOutEl, separatorEl, allInventoryLabelEl, allInventoryEl]);
        optionZoneEl = createElement("div", {"id": "actionZone"}, [viewHiddenBtnEl]); //Will hold the search filters
    }
    else { //Else if loading the page for staff order page when adding item from menu to the order.
        menuZoneEl = createElement("div", {"id": "menuZone"}, [allInventoryLabelEl, allInventoryEl]);
        optionZoneEl = createElement("div", {"id": "actionZone"});
    }
    //-----------------------------------------------------------------------//
    var navBarEl = CreateNavBar();
    var goBackBtn = createElement("button", {"id": "goBackBtn"});
    goBackBtn.addEventListener("click", function() { ChangePage(3); }); //Go back to the staff order page.
    //-----------------------------------------------------------------------//
    SetChangeLangAfterFunc( function() { parameters.lang = this.getAttribute("langType"); SetStaffInventoryLabels(); UpdateNavigationLabels(); },)
    if (!addFromMenuPage) {
        var staffInvPageEl = createElement("div", {"class": "mainContent"}, [optionZoneEl, navBarEl, CreateMenuBar(), menuZoneEl]);
    }
    else {
        var staffInvPageEl = createElement("div", {"class": "mainContent"}, [optionZoneEl, navBarEl, CreateMenuBar(), menuZoneEl, goBackBtn]);
    }

    document.body.appendChild(staffInvPageEl);
    SetStaffInventoryLabels();
    if (!addFromMenuPage) {     //If just loading the page as the normal Inventory page...
        LoadRunningOutSoon();   //show the items that will run out soon.
    }
    LoadInventoryItems();
    ManageStaffInventoryListeners(addFromMenuPage); //E.g. adding the popup for each item.
}

function SetStaffInventoryLabels() {
    document.getElementById("loginButton").textContent = getString("button login");
    $("#viewHiddenBtn").text(getString("button view hidden"));
    $("#runningOutLabel").text(getString("string running out"));
    $("#allInventoryLabel").text(getString("string all inventory"));
    $("#goBackBtn").text(getString("button back"));
    if (document.getElementById("goBackBtn")) {
        document.getElementById("goBackBtn").textContent = getString("button back");
    }
}

function ClearAllInventoryItems() {
    var allItems = document.getElementsByClassName("item");
    while (allItems.length > 0) {
        allItems[allItems.length - 1].remove();
    }
}

//Load the items that are running out.
function LoadRunningOutSoon() {
    var beverages = BeveragesToRestock();
    for (let i = 0; i < beverages.length; i++) {
        const element = document.getElementById("runningOut");
        var item = CreateItem(beverages[i]);
        var itemID = item.id;
        item.draggable = false; //Decided not to implement Drag and Drop!
        item.id = "RO_" + itemID; //"Running Out" + the item's id. Prevents duplicated IDs.
        item.classList.add("runningOutItem"); //If needed later to differentiate from normal inventory item.
        element.appendChild(item);
    }
}

//Load the inventory items.
function LoadInventoryItems() {
    var beverages = allBeverages();
    for (i = 0; i < beverages.length; i++) {
        const element = document.getElementById("allInventory");
        var item = CreateItem(beverages[i]);
        item.draggable = false; //Decided not to implement Drag and Drop!
        element.appendChild(item);
    }
}
var selectedCustomer; //Used to save the currently selected customer tab if there are multiple customers.
var modifyOrderOn;

function CreateStaffOrderPage() {
    selectedCustomer = null;
    modifyOrderOn = false;

    var tabItem1El = createElement("div", {"id": "unassigned", "class": "tabItem"});
    tabItem1El.textContent = "Unassigned";
    var defTabContainerEl = createElement("div", {"id": "defCustTabContainer"}, [tabItem1El]);
    //This div holds the multiple customer divs.
    var splitCustTabContainerEl = createElement("div", {"id": "splitCustTabContainer"});
    //-----------------------------------------------------------------------//
    var horizLineOrderEl = createElement("div", {"class": "horizLineOrder"});
    var mainTabEl = createElement("div", {"id": "mainTab"});
    mainTabEl.addEventListener("dragover", (event) => {event.preventDefault();} );
    mainTabEl.addEventListener("drop", StaffDrop);
    var orderZoneEl = createElement("div", {"id": "orderZone"}, [mainTabEl]); //Area under the action.
    var allTabsEl = createElement("div", {"id": "allTabs"}, [defTabContainerEl, splitCustTabContainerEl]);
    var custTabZoneEl = createElement("div", {"id": "custTabZone"}, [allTabsEl, horizLineOrderEl]);
    //-----------------------------------------------------------------------//
    var custOrderZoneEl = createElement("div", {"id": "custOrderZone"}, [custTabZoneEl, orderZoneEl]);
    //-----------------------------------------------------------------------//
    var undoRedoBtnEl = CreateUndoRedoBtn();
    var emptyGapEl = createElement("div", {"style": "width: 2%"});
    var singleOrderBtnEl = createElement("button", {"id": "singleOrderBtn", "class": "orderActionBtn", "onClick": "StaffDoAction('SingleOrder')"});
    var modifyOrderBtnEl = createElement("button", {"id": "splitOrderBtn", "class": "orderActionBtn", "onClick": "LoadModifyOrder(), LoadUnassigned()"});
    var addFromMenuBtnEl = createElement("button", {"id": "addFromMenuBtn", "class": "orderActionBtn"});
    var actionZoneEl = createElement("div", {"id": "actionZone"}, [undoRedoBtnEl, emptyGapEl, singleOrderBtnEl, modifyOrderBtnEl, addFromMenuBtnEl]);
    //-----------------------------------------------------------------------//
    var navBarEl = CreateNavBar();
    //-----------------------------------------------------------------------//
    SetChangeLangAfterFunc(function() { parameters.lang = this.getAttribute("langType"); StaffOrderSetTextLabels(); } );
    var staffOrderPageEl = createElement("div", {"class": "mainContent"}, [actionZoneEl, navBarEl, CreateMenuBar(), custOrderZoneEl]);

    document.body.appendChild(staffOrderPageEl);

    StaffOrderSetTextLabels();
    LoadStaffOrderView();
}

//Purpose: Create the staff order item.
function CreateStaffOrderItem(itemName = "", itemPrice = "0kr", itemId) {
    var bevPrice = getPriceBeverage(parseInt(itemName));
    var bevName = getNameBeverage(parseInt(itemName));

    var orderInfoEl = createElement("label", {"class": "staffOrderInfo"});
    orderInfoEl.textContent = bevName;
    var priceEl = createElement("label", {"class": "staffOrderPrice"});
    priceEl.textContent = bevPrice + "kr";
    var orderOptionEl = createElement("div", {"class": "staffOrderOption"});
    var optionBtnContainerEl = createElement("div", {"class": "optionBtnContainer"}, [orderInfoEl, priceEl, orderOptionEl]);
    var orderContainerEl = createElement("div", {"id": itemId, "class": "staffOrderContainer"}, [optionBtnContainerEl]);
    orderContainerEl.draggable = true;
    orderContainerEl.ondragstart = StaffDrag;

    return orderContainerEl;
}

function ManageListenersOrders(orderItem) {
    orderItem.addEventListener("click", ExpandOrderItemOption);
}

function ExpandOrderItemOption(ev) {
    //Close the other expanded items.
    var expandOptionContainer = document.querySelectorAll(".expandOptionContainer");
    for (let i = 0; i < expandOptionContainer.length; i++) {
        expandOptionContainer[i].parentElement.querySelector(".staffOrderOption").click();
    }

    var parent = ev.target.parentElement.parentElement; //should be staffOrderContainer
    var target = ev.target; //should be staffOrderItem

    //Create the buttons.
    var duplicateEl = createElement("div", {"class": "duplicateOption"});
    duplicateEl.textContent = getString("button duplicate");
    duplicateEl.addEventListener("click", function() { StaffDoAction("DuplicateItem", null, null,
        getNameBeverage(RetrieveCstmrSingleItem(ev.target.parentElement.parentElement.id, GetParentIDOfItem(ev.target.parentElement.parentElement.id)),
        ev.target.parentElement.parentElement.id)); LoadOrder(); } );
    var freeEl = createElement("div", {"class": "freeOption"});
    freeEl.textContent = getString("button free");
    var discountEl = createElement("div", {"class": "discountOption"});
    discountEl.textContent = getString("button discount");
    var removeEl = createElement("div", {"class": "removeOption"});
    removeEl.textContent = getString("button remove");
    removeEl.addEventListener("click", function() { StaffDoAction("RemoveItem", selectedCustomer, null, null, ev.target.parentElement.parentElement.id); } );

    var vertiLineOpt1El = createElement("div", {"class": "vertiLineOpt"});
    var vertiLineOpt2El = createElement("div", {"class": "vertiLineOpt"});
    var vertiLineOpt3El = createElement("div", {"class": "vertiLineOpt"});
    target.parentElement.style.boxShadow = "0px 2px 2px 0.5px rgba(0, 0, 0, 0)";

    //This is used to move objects down so options isn't covered.
    var gap = createElement("div", {"class": "expandedGap"});
    parent.parentElement.insertBefore(gap, parent.nextSibling);

    var expandedOptionEL = createElement("div", {"class": "expandOptionContainer"}, [duplicateEl, vertiLineOpt1El, freeEl, vertiLineOpt2El, discountEl, vertiLineOpt3El, removeEl]);

    parent.style.backgroundColor = "#E4E4E4";
    parent.style.borderBottomRightRadius = "0px";
    parent.style.borderBottomLeftRadius = "0px";

    parent.appendChild(expandedOptionEL);
    target.removeEventListener("click", ExpandOrderItemOption); //Temporarily remove the event...
    target.addEventListener("click", CloseOrderItemOption); //so when clicked again, it will close the option bar.
}

function CloseOrderItemOption(ev) {
    console.log(ev.target);
    var parent = ev.target.parentElement.parentElement;;

    parent.style.backgroundColor = "white";
    parent.style.borderRadius = "15px";
    ev.target.parentElement.style.boxShadow = "0px 2px 2px 0.5px rgba(0, 0, 0, 0.25)";

    //Remove the gaps.
    var expandOptionContainer = document.querySelectorAll(".expandedGap");
    for (let i = 0; i < expandOptionContainer.length; i++) {
        expandOptionContainer[i].remove();
    }

    console.log(parent.parentElement.childNodes);
    parent.removeChild(parent.parentElement.querySelectorAll(".expandOptionContainer")[0]);
    ev.target.removeEventListener("click", CloseOrderItemOption);
    ev.target.addEventListener("click", ExpandOrderItemOption);
}

//Purpose: Create a basic customer item.
function CreateCustomerTabItem(custText, custID) {
    var customerItem = createElement("div", {"id": custID, "class": "tabItem cstmrTab"});
    customerItem.textContent = custText;
    customerItem.addEventListener( "click", SelectCustomerTab );

    return customerItem;
}

//Purpose: Add an edit button next to the customer tab.
function AddEditCustomerTabItem(custID) {
    var editCustTabEl = createElement("button", {"class": "editCustomerOption", "id": custID});
    editCustTabEl.addEventListener("click", function() { StaffEditCustomerNameCtrl(custID); });

    return editCustTabEl;
}

//Purpose: When user selects a customer tab.
function SelectCustomerTab(ev) {
    var allCustTab = document.getElementsByClassName("cstmrTab");
    for (let i = 0; i < allCustTab.length; i++) {
        allCustTab[i].style.backgroundColor = "#FFFFFF";
    }

    SetSelectedCustomer(ev.target.id);
    LoadOrder();
}

//Purpose: When user selects another customer, set the new selected customer.
function SetSelectedCustomer(newID) {
    selectedCustomer = newID;
    if (newID) {
        var custTabChildren = document.getElementById("splitCustTabContainer").children;
        for (let i = 0; i < custTabChildren.length; i++) {
            if (custTabChildren[i].classList.contains("cstmrTab")) {
                if (custTabChildren[i].id == selectedCustomer) {
                    custTabChildren[i].style.backgroundColor = "#EFB93C";
                }
            }
        }
    }
}

//Purpose: Upon splitting, need to add new elements and functionality.
function LoadModifyOrder() {
    if (!modifyOrderOn){ //If it hasn't been split yet.
        if (TotalCstmrCount() > 1) {
            document.getElementById("unassigned").textContent = getString("string unassigned");
        }
        else {
            document.getElementsByClassName("tabItem")[0].textContent = getString("string unassigned");
        }

        document.getElementById("splitOrderBtn").textContent = getString("button finished modify");
        var unassignedTabEl = createElement("div", {"id": "unassignedTab"});
        document.getElementById("orderZone").insertBefore(unassignedTabEl, document.getElementById("orderZone").lastChild);
        unassignedTabEl.addEventListener("dragover", (event) => {event.preventDefault();} );
        unassignedTabEl.addEventListener("drop", StaffDrop, false);

        //New customer doesn't fall under te basic customer tab (don't want to apply those eventlisteners etc.).
        var newCustTabItemEl = createElement("div", {"id": "newCustomerTab", "class": "tabItem"});
        newCustTabItemEl.textContent = getString("string add customer allcaps");
        newCustTabItemEl.style.background = "#B3D0AE";
        newCustTabItemEl.addEventListener("click", function() { StaffDoAction("AddCustomer")} );
        var removeCustTabItemEl = createElement("div", {"id": "removeCustomerTab", "class": "tabItem"});
        removeCustTabItemEl.textContent = getString("string remove customer allcaps");
        removeCustTabItemEl.style.background = "#B3D0AE";
        removeCustTabItemEl.addEventListener("click", function() { StaffDoAction("RemoveCustomer")} );
        document.getElementById("defCustTabContainer").appendChild(newCustTabItemEl);
        document.getElementById("defCustTabContainer").appendChild(removeCustTabItemEl);

        modifyOrderOn = true;
    }
    else { //If modify order is already on.
        document.getElementById("splitOrderBtn").textContent = getString("button modify order");
        document.getElementById("newCustomerTab").remove();
        document.getElementById("removeCustomerTab").remove();
        document.getElementById("unassignedTab").remove();
        if (TotalCstmrCount() > 1) {
            document.getElementById("unassigned").textContent = getString("string multiple customers");
        }
        else {
            document.getElementsByClassName("tabItem")[0].textContent = getString("string order menu");
        }

        modifyOrderOn = false;
    }
}

//Purpose: Remove some elements and functionality when going to single order.
function LoadSingleOrder() {
    if ($("#unassignedTab")) {
        $("#unassignedTab").remove();
    }

    for (let i = 0; i < document.getElementsByClassName("tabItem").length; i++) {
        if (document.getElementById("splitCustTabContainer").childNodes.length > 0) {
            document.getElementById("splitCustTabContainer").lastChild.remove();
        }
    }
}

function LoadSingleCstmrTab() {
    document.getElementsByClassName("tabItem")[0].textContent = "Order";
    document.getElementById("defCustTabContainer").getElementsByClassName("tabItem")[0].id = RetrieveAllCustomers()[0].ID;
    SetSelectedCustomer(RetrieveAllCustomers()[0].ID);
}

//Purpose: Append every customer as a tab.
function LoadMultipleCstmrTabs() {
    if (!document.getElementById("unassignedTab")) {
        if (!document.getElementById("unassigned")) { //Need to change order 1 to unassigned if multiple customers.
            document.getElementsByClassName("tabItem")[0].id = "unassigned";
        }
        document.getElementById("unassigned").textContent = getString("string multiple customers");
    }

    var splitCustTabContainer = document.getElementById("splitCustTabContainer");
    while (splitCustTabContainer.childNodes.length > 0) { //Reset by removing all the children in the splitCustTabContainer.
        splitCustTabContainer.lastChild.remove();
    }
    //Add each customer as a tab.
    RetrieveAllCustomers().forEach(x => splitCustTabContainer.appendChild(CreateCustomerTabItem(x.cstmrName, x.ID)).append(AddEditCustomerTabItem(x.ID)));
}

//Purpose: Load the order of a selected customer.
function LoadOrder(appendToID = "mainTab", customer = selectedCustomer) {
    while(document.getElementById(appendToID).children.length > 0) {
        document.getElementById(appendToID).lastChild.remove();
    }

    if (customer) {
        if (RetrieveCstmrAllItems().length > 0){
            var customerOrders = RetrieveCstmrItems(customer);
            for(j = 0; j < customerOrders.length; j++) {
                var newItem = document.getElementById(appendToID).appendChild(CreateStaffOrderItem(customerOrders[j].name, "200kr", customerOrders[j].ID));
                ManageListenersOrders(document.getElementById(newItem.id).querySelectorAll(".staffOrderOption")[0]);
            }
        }
    }
}

function LoadUnassigned() {
    //Loading the unassigned.
    if (document.getElementById("unassignedTab")) {
        while (document.getElementById("unassignedTab").childNodes.length > 0) { //Empty out the unassigned list.
            document.getElementById("unassignedTab").lastChild.remove();
        }

        unassignedOrderModel.orders.forEach(x => document.getElementById("unassignedTab").appendChild(CreateStaffOrderItem(x.name, "200kr", x.id)));
    }
}

function LoadStaffOrderView() {
    if (TotalCstmrCount() > 1) {
        LoadMultipleCstmrTabs();
        if (selectedCustomer != null) {
            LoadOrder();
        }
    }
    else {
        LoadSingleCstmrTab();
        LoadOrder();
    }
    LoadUnassigned();
}

//Purpose: Set the text in all the labels, getting the strings from the language database.
function StaffOrderSetTextLabels() {
    document.getElementById("loginButton").textContent = getString("button login");
    document.getElementById("singleOrderBtn").textContent = getString("button single order");
    if (!modifyOrderOn) { //If not currently modifying.
        document.getElementById("splitOrderBtn").textContent = getString("button modify order");
        document.getElementById("splitOrderBtn").textContent = getString("button modify order");
        if (TotalCstmrCount() <= 1) {
            document.getElementsByClassName("tabItem")[0].textContent = getString("string order menu");
        }
    }
    else if (modifyOrderOn && TotalCstmrCount() > 1) { //If currently modifying.
        document.getElementById("splitOrderBtn").textContent = getString("button finished modify");
        document.getElementById("unassigned").textContent = getString("string unassigned");
        document.getElementById("newCustomerTab").textContent = getString("string add customer allcaps");
        document.getElementById("removeCustomerTab").textContent = getString("string remove customer allcaps");
    }
    else {
        document.getElementById("splitOrderBtn").textContent = getString("button finished modify");
        document.getElementsByClassName("tabItem")[0].textContent = getString("string unassigned");
        document.getElementById("newCustomerTab").textContent = getString("string add customer allcaps");
        document.getElementById("removeCustomerTab").textContent = getString("string remove customer allcaps");
    }
    document.getElementById("addFromMenuBtn").textContent = getString("button add from menu");
}
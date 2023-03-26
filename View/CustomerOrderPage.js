function CreateCstmrOrderPage(){
    //--------------------------------------------------------------------------------------//
    var undoRedoBtnEl = CreateUndoRedoBtn();

    var filterDivEl = createElement("div", {"id": "filters"}, [undoRedoBtnEl]);
    var menuZoneEl = createElement("div", {"id": "menuZone", "class": "menuTab"});
    //--------------------------------------------------------------------------------------//
    var addCustomerEl = createElement("div", {"id": "addCustomerZone", "class": "addNewCustomer", "content": "textContent"});
    var horizLineEl = createElement("div", {"class": "horizLine"});
    var orderBtnEl = createElement("button", {"id": "orderBtn", "content": "textContent", "onClick": "CstmrCreateOrder();"});
    var allCustOrderSumTxtEl = createElement("label", {"class": "allCustOrderSumTxt"});

    var orderZoneLabelEl = createElement("label", {"id": "orderZoneLabel"}, [getString("string drag order")]);
    var orderZoneEl = createElement("div", {"id": "orderZone", "class": "orderTab orderZoneOpened"}, [orderZoneLabelEl]);
    var optionZoneEl = createElement("div", {"id": "optionZone"}, [allCustOrderSumTxtEl, addCustomerEl, horizLineEl, orderBtnEl]);
    //--------------------------------------------------------------------------------------//
    var columnRightEl = createElement("div", {"class": "columnRight"}, [orderZoneEl, optionZoneEl]);
    var labelEl = createElement("label", {"id": "orderLabel", "content": "textContent"});

    var columnAllEl = createElement("div",{"class": "column"}, [columnRightEl, labelEl]);
    //--------------------------------------------------------------------------------------//
    SetChangeLangAfterFunc(function() { parameters.lang = this.getAttribute("langType"); CstmrOrderSetTextLabels(); LoadView(); CstmrManageListeners(); } ); //Pass this as the function that should be run after changing the language in the menubar. Do this before creating the menubar.
    var mainContentEl = createElement("div", {"class": "mainContent"}, [filterDivEl, menuZoneEl, columnAllEl, CreateMenuBar()]);

    document.body.appendChild(mainContentEl);

    CustomerControlInit();
}
function CstmrOrderSetTextLabels() {
    document.getElementById("loginButton").textContent = getString("button login");
    document.getElementById("addCustomerZone").textContent = "+ " + getString("string new customer");
    document.getElementById("orderBtn").textContent = getString("string order menu");
    document.getElementById("orderLabel").textContent = getString("string order menu");
}

//VIEW RELATED FUNCTIONS
function HoverOrderTab(ev) {
    var rightColumn = document.getElementsByClassName("columnRight")[0];

    rightColumn.style.background = "transparent";

    //prevent unwanteds repetitions
    rightColumn.removeEventListener("mouseover", HoverOrderTab);
    rightColumn.removeEventListener("dragover", HoverOrderTab);
    document.getElementById("orderLabel").style.display = "none";

    setTimeout(function(){
        ev.target.style.transition = "background-color 250ms";
        rightColumn.style.background = "#B3D0AE";
    },250);

    setTimeout(function(){
        rightColumn.style.width = "40%";
    },300);

    setTimeout(function(){
        for (let x of rightColumn.children) {
            if (x.id === "orderZone" && x.classList.contains("orderZoneOpened")) {
                x.style.display = "flex";
            }
            else {
                x.style.display = "block";
            }
        }
        rightColumn.addEventListener("mouseleave", UnhoverOrderTab);
    }, 550);
}

function UnhoverOrderTab() {
    var rightColumn = document.getElementsByClassName("columnRight")[0];
    rightColumn.removeEventListener("mouseleave", UnhoverOrderTab);

    setTimeout(function(){
        rightColumn.style.width = "8%"; //The width of the hidden order.

        for (let x of rightColumn.children)
            x.style.display = "none";

        rightColumn.addEventListener("mouseover", HoverOrderTab);
        rightColumn.addEventListener("dragover", HoverOrderTab);
        document.getElementById("orderLabel").style.display = "block";
    }, 100);
}

function CustomerControlInit() {
    var menuZone = document.getElementById("menuZone");
    var orderZone = document.getElementById("orderZone");
    var customerZone = document.getElementsByClassName("addNewCustomer")[0]; //since there is only 1 anyway
    var rightColumn = document.getElementsByClassName("columnRight")[0];

    //Subscribing functions to the drag drop events:
    menuZone.addEventListener("dragover", (event) => {event.preventDefault();} );
    menuZone.addEventListener("drop", CstmrDrop );
    orderZone.addEventListener("dragover", (event) => {event.preventDefault();} );
    orderZone.addEventListener("drop", CstmrDrop );
    customerZone.addEventListener("dragover", (event) => {event.preventDefault();} );
    customerZone.addEventListener("drop", CstmrDrop );
    rightColumn.addEventListener("mouseover", HoverOrderTab);
    rightColumn.addEventListener("mouseleave", UnhoverOrderTab);
    rightColumn.addEventListener("dragover", HoverOrderTab);


    //If is VIP, just hide the add customer part & append a specials section.
    if (getIdConnected(parameters)) {
        if (getCategoryUser(getIdConnected(parameters)) === 3) {
            $(".addNewCustomer").hide();
            var specialsZoneEl = createElement("div", {"id": "specialsZone"});
            $("#menuZone").append(specialsZoneEl);
            $("#specialsZone").append(createElement("div", {}, ["SPECIALS"])); //For testing.
        }
    }

    RemoveAllToDefault();
    LoadCustomerMenu();
    CreateAllMenuItems("menuItem");
    ClearAllEmptyCustomers();
    UnhoverOrderTab();
    LoadView();
}

function LoadView() {
    //Clear all items.
    $("#orderZone").empty(); //https://www.w3schools.com/jquery/html_empty.asp#:~:text=The%20empty()%20method%20removes,use%20the%20detach()%20method.

    //If there are more than one customer, this needs to be presented visually.
    if (TotalCstmrCount() > 1) {
        LoadViewMultipleCustomer();
    }

    //For each item in a customer, display them.
    else {
        document.getElementById("orderZone").style.padding = "20px";
        if (TotalCstmrCount() > 0) {
            for (i = 0; i < RetrieveCstmrItems().length; i++) {
                var itemToAdd = CreateItem(parseInt(RetrieveCstmrItems()[i].name)); //name refers to the beverageID.
                itemToAdd.id = RetrieveCstmrItems()[i].ID; //Need to do a bit of a workaround. Need id to be the item's item (e.g. cust_0_1).
                document.getElementById("orderZone").appendChild(itemToAdd);
            }
        }

        document.getElementById("optionZone").getElementsByClassName("allCustOrderSumTxt")[0].textContent = getString("string total order") + ": $XX"; //If only one item, display it this way
    }

    //If there are no items in the order zone, display this text.
    if (document.getElementById("orderZone").children.length === 0) {
        $("#orderZone").append(createElement("label", {"id": "orderZoneLabel"}, [getString("string drag order")]));
        document.getElementById("orderZone").style.paddingTop = "calc(0.2 * 100vh)";
        document.getElementById("orderZone").style.paddingLeft = "30%";
        document.getElementById("orderZone").style.height = "calc(0.45 * 100vh)";
        document.getElementsByClassName("allCustOrderSumTxt")[0].textContent = "";
    }
    else {
        document.getElementById("orderZone").style.paddingTop = "0%";
        document.getElementById("orderZone").style.paddingRight = "0px";
        document.getElementById("orderZone").style.height = "calc(0.65 * 100vh)";
        document.getElementsByClassName("allCustOrderSumTxt")[0].textContent = CalculateTotalPrice();
    }

    CreateAllOrderItems("orderItem");
}

//Purpose: If there are more than one customer, this needs to be presented visually.
function LoadViewMultipleCustomer() {
    document.getElementById("orderZone").style.paddingTop = "0%";
    document.getElementById("orderZone").style.paddingRight = "0px";
    document.getElementById("orderZone").style.height = "70%";


    for (i = 0; i < RetrieveAllCustomers().length; i++) {
        CreateCustomer(RetrieveAllCustomers()[i].cstmrName, RetrieveAllCustomers()[i].ID, document.getElementById("orderZone")); //Create Customer
        var customerId = RetrieveAllCustomers()[i].ID;

        for (j = 0; j < RetrieveCstmrItems(customerId).length; j++) {
            var addElementTo = $(".customerItem#" + customerId) //first find the ones with customer class, then identify with ID
            var itemToAdd = CreateItem(parseInt(RetrieveCstmrItems(customerId)[j].name)); //name refers to the beverageID.
            itemToAdd.id = RetrieveCstmrItems(customerId)[j].ID; //Need to do a bit of a workaround. Need id to be the item's item (e.g. cust_0_1).
            addElementTo.append(itemToAdd);
        }
        //Adding sum text
        var custOrderSumTxtEl = createElement("label", {"class": "custOrderSumTxt"});
        custOrderSumTxtEl.textContent = getString("string total order") + ": "+ CalculatePricePerOrder(RetrieveCstmrItems(customerId)); //Show price of the customer's order.
        addElementTo.append(custOrderSumTxtEl);
    }//https://stackoverflow.com/questions/9681601/how-can-i-count-the-number-of-elements-with-same-class
}

function LoadCustomerMenu() {
    //Load the menu items.
    var beverages = allBeverages();
    for (i = 0; i < beverages.length; i++) {
        const element = document.getElementById("menuZone");
        element.appendChild(CreateItem(beverages[i]));
    }
}

function CreateAllMenuItems(className) { //Make the items menu items by adding the class.
    var beverage = document.getElementsByClassName("item");
    for (let i = 0; i < beverage.length; i++) {
        if (className != null) {
            beverage[i].classList.add(className);
        }
    }
}

//Purpose: Make the items order items by adding the class.
function CreateAllOrderItems(className) {
    if (TotalCstmrCount() <= 1) {
        var columnChildren = document.getElementById("orderZone").children;
        for (let i = 0; i < columnChildren.length; i++) {
            if (columnChildren[i].classList.contains("item")) {
                columnChildren[i].classList.add(className);
            }
        }
    }
    else if (TotalCstmrCount() > 1) {
        var customers = document.getElementsByClassName("customerItem");
        for (let i = 0; i < customers.length; i++) {
            var customerChildren = document.getElementsByClassName("item");
            for (let j = 0; j < customerChildren.length; j++) {
                if (customerChildren[j].classList.contains("item")) {
                    customerChildren[j].classList.add(className);
                }
            }
        }
    }
}

//Purpose: Create placeholder customer container.
function CreateCustomer(customerName, id = "cust_0", appendTo) {
    var editCustNameEl = createElement("button", {"class": "editCustomerName", "id": id});
    editCustNameEl.onclick = function() { CstmrEditCustomerNameCtrl(id); };
    var nameCustEl = createElement("p", {"class": "custNameTxt"});
    var headerContainerEl = createElement("div", {"class": "custContainHeader"}, [nameCustEl, editCustNameEl]);
    var customerEl = createElement("div", {"class": "customerItem", "id": id});
    var customerContainerEl = createElement("div", {"class": "customerContainer", "id": id});
    nameCustEl.textContent = "Order " + (parseInt(id.charAt(id.length - 1)) + 1) + ": " + customerName;

    appendTo.appendChild(customerContainerEl).appendChild(headerContainerEl);
    appendTo.appendChild(customerContainerEl).appendChild(customerEl);

    return customerContainerEl;
}
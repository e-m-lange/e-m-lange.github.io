$(document).ready(function(){
    CreatePage();
    CustomerSetTextLabels();
    ResetUndoRedo(); //Since user is opening another page
})

function CreatePage(){
    //Separated to make it easier to understand...
    //--------------------------------------------------------------------------------------//
    var undoBtnEl = createElement("button", {"id": "undoBtn", "onclick": "Undo()"});
    var vertiLineEl = createElement("div", {"class": "vertiLine"});
    var redoBtnEl = createElement("button", {"id": "redoBtn", "onclick": "Redo()"});
    var undoRedoBtnEl = createElement("div", {"id": "undoRedoBtn"}, [undoBtnEl, vertiLineEl, redoBtnEl]);

    var filterDivEl = createElement("div", {"id": "filters"}, [undoRedoBtnEl]);
    var menuZoneEl = createElement("div", {"id": "menuZone", "class": "menu"});
    //--------------------------------------------------------------------------------------//
    var addCustomerEl = createElement("div", {"id": "addCustomerZone", "class": "addNewCustomer", "content": "textContent"});
    var horizLineEl = createElement("div", {"class": "horizLine"});
    var orderBtnEl = createElement("button", {"id": "orderBtn", "content": "textContent"});

    var orderZoneEl = createElement("div", {"id": "orderZone", "class": "orderTab"});
    var optionZoneEl = createElement("div", {"id": "optionZone"}, [addCustomerEl, horizLineEl, orderBtnEl]);
    //--------------------------------------------------------------------------------------//
    var columnRightEl = createElement("div", {"class": "columnRight"}, [orderZoneEl, optionZoneEl]);
    var labelEl = createElement("label", {"id": "orderLabel", "content": "textContent"});

    var columnAllEl = createElement("div",{"class": "column"}, [columnRightEl, labelEl]);
    //--------------------------------------------------------------------------------------//
    var loginBtnEl = createElement("button", {"id": "loginButton", "content": "textContent"});
    var menuBarEl = createElement("div", {"id": "menuBar"}, [loginBtnEl]);
    //--------------------------------------------------------------------------------------//
    var mainContentEl = createElement("div", {"class": "mainContent"}, [filterDivEl, menuZoneEl, columnAllEl, menuBarEl]);

    document.body.appendChild(mainContentEl);

    CustomerControlInit();
}
function CustomerSetTextLabels(){
    document.getElementById("loginButton").textContent = getString("button login");
    document.getElementById("addCustomerZone").textContent = "+ " + getString("string new customer");
    document.getElementById("orderBtn").textContent = getString("string order menu");
    document.getElementById("orderLabel").textContent = getString("string order menu");
    //For now undo redo is text, will be replaced later.
    document.getElementById("undoBtn").textContent = "undo";
    document.getElementById("redoBtn").textContent = "redo";
}

//VIEW RELATED FUNCTIONS
var isVIP = false;

//Can use this function to set the VIP status, which is important for display the correct information & html elements
function SetVIPStatus (boolValue){
    isVIP = boolValue;
}
function CreateMenuItems(){

}

function HoverOrderTab(ev){
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
        for (let x of rightColumn.children)
            x.style.display = "block";
        rightColumn.addEventListener("mouseleave", UnhoverOrderTab);
    }, 550);
}

function UnhoverOrderTab()
{
    var rightColumn = document.getElementsByClassName("columnRight")[0];
    rightColumn.removeEventListener("mouseleave", UnhoverOrderTab);

    setTimeout(function(){
        rightColumn.style.width = "5%";

        for (let x of rightColumn.children)
            x.style.display = "none";

        rightColumn.addEventListener("mouseover", HoverOrderTab);
        rightColumn.addEventListener("dragover", HoverOrderTab);
        document.getElementById("orderLabel").style.display = "block";
    }, 100);
}

function CustomerControlInit(){
    var menuZone = document.getElementById("menuZone");
    var orderZone = document.getElementById("orderZone");
    var customerZone = document.getElementsByClassName("addNewCustomer")[0]; //since there is only 1 anyway
    var rightColumn = document.getElementsByClassName("columnRight")[0];

    //Subscribing functions to the drag drop events:
    menuZone.addEventListener("dragover", (event) => {event.preventDefault();} );
    menuZone.addEventListener("drop", Drop );
    orderZone.addEventListener("dragover", (event) => {event.preventDefault();} );
    orderZone.addEventListener("drop", Drop );
    customerZone.addEventListener("dragover", (event) => {event.preventDefault();} );
    customerZone.addEventListener("drop", Drop );
    rightColumn.addEventListener("mouseover", HoverOrderTab);
    rightColumn.addEventListener("mouseleave", UnhoverOrderTab);
    rightColumn.addEventListener("dragover", HoverOrderTab);

    //If is VIP, just hide the add customer part
    if (isVIP)
        $(".addNewCustomer").hide();

    //Fill up with some items.
    for (i = 0; i < 10; i++){
        const element = document.getElementById("menuZone");
        element.appendChild(CreateItem("Temp Item" + i, "cust_-1", "menuItem")); //-1 since it is basically unassigned atm
    }

    UnhoverOrderTab();
    LoadView();
}

function LoadView(){
    //Clear all items.
    $("#orderZone").empty(); //https://www.w3schools.com/jquery/html_empty.asp#:~:text=The%20empty()%20method%20removes,use%20the%20detach()%20method.

    //If there are more than one customer, this needs to be presented visually.
    if (TotalCstmrCount() > 1)
        LoadViewMultipleCustomer();

    //For each item in a customer, display them.
    else {
        for (i = 0; i < RetrieveCstmrItems().length; i++) {
            document.getElementById("orderZone").appendChild(CreateItem(RetrieveCstmrItems()[i].name, RetrieveCstmrItems()[i].ID, "orderItem"));
        }
    }

    //If there are no items in the order zone, display this text.
    if (document.getElementById("orderZone").children.length == 0) {
        $("#orderZone").text(getString("string drag order"));
        document.getElementById("orderZone").style.lineHeight = "100px";
    }
    else
        document.getElementById("orderZone").style.lineHeight = "normal";
}

function LoadViewMultipleCustomer(){
    //If there are more than one customer, this needs to be presented visually.
    for (i = 0; i < RetrieveAllCustomers().length; i++) {
        CreateCustomer(RetrieveAllCustomers()[i].cstmrName, RetrieveAllCustomers()[i].ID, document.getElementById("orderZone")); //Create Customer
        var customerId = RetrieveAllCustomers()[i].ID;

        for (j = 0; j < RetrieveCstmrItems(customerId).length; j++) {
            var addElementTo = $(".customerItem#" + customerId) //first find the ones with customer class, then identify with ID
            addElementTo.append(CreateItem(RetrieveCstmrItems(customerId)[j].name, RetrieveCstmrItems(customerId)[j].ID, "orderItem"));
        }
    }//https://stackoverflow.com/questions/9681601/how-can-i-count-the-number-of-elements-with-same-class
}

//Purpose: Creates a placeholder item. SHOULD BE DELETED ONCE THE DRINK CARDS HAVE BEEN MADE.
function CreateItem(text, id, className)
{
    var divItem = document.createElement("div");
    //Temporary. This can easily be changed by setting a class / a function.
    divItem.style.borderStyle = "solid";
    divItem.style.borderWidth = "1px";
    divItem.style.height = "80px";
    divItem.style.margin = "15px";
    divItem.style.padding = "15px";
    divItem.style.maxWidth = "100px";
    divItem.style.minWidth = "100px";
    divItem.style.backgroundColor = "#E4E4E4";
    divItem.draggable = true;
    divItem.ondragstart = Drag;
    divItem.textContent = text;
    divItem.id = id; //allows for removal later

    if (className != null)
        divItem.className = className;//to allow for dropping into the order tab ("menuItem") OR to prevent deletion upon being dropped on top of each other in the order tab ("order tab")

    return divItem;
}

//Purpose: Create placeholder customer container.
function CreateCustomer(customerName, id = "cust_0", appendTo)
{
    var customerEl = createElement("div", {"class": "customerItem", "id": id});
    var editCustNameEl = createElement("button", {"class": "editCustomerName", "id": id});
    var customerContainerEl = createElement("div", {"class": "customerContainer", "content": "textContent"});
    customerContainerEl.textContent = customerName + " ID: " + id;
    appendTo.appendChild(customerContainerEl).appendChild(customerEl);

    return customerContainerEl;
}
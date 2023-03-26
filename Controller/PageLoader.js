//Will hold the number of the currently selected page.
var tempSelected = 1;
$(document).ready(function(){
    TurnOffPageSheets();
    SetPage();
    TestingTools();
})

//Purpose: When called, will load the page according to the number stored in tempSelected.
function SetPage() {
    switch (tempSelected) {
        case 0:

            break;
        case 1:
            PageLoadCustomerOrder();
            break;
        case 2:
            PageLoadStaffSelectOrder();
            SetFocusedNav(document.getElementById("orderNav"));
            break;
        case 3:
            PageLoadStaffOrder();
            SetFocusedNav(document.getElementById("orderNav")); //Show item in nav bar as selected. Only applies to staff pages.
            break;
        case 4:
            PageLoadStaffInventory();
            SetFocusedNav(document.getElementById("inventoryNav"));
            break;
        case 5: //Differs from case 4 because we are loading the StaffInventoryPage for the StaffOrderPage when adding items from the menu.
            PageLoadStaffInventory(true);
            SetFocusedNav(document.getElementById("orderNav"));
            break;
    }
}

//Purpose: Clears all the items on a page.
function ClearPage() {
    var childrenLength = document.body.children.length;
    for (i = 0; i < childrenLength; i++)
        document.body.lastChild.remove();
}

//Purpose: Load the page that normal customers order on.
function PageLoadCustomerOrder() {
    $("#custOrderStyleId")[0].disabled = false;
    $("#customerOrderPageId")[0].disabled = false;
    CreateCstmrOrderPage();
    CstmrOrderSetTextLabels();
    ResetUndoRedo();
}

//Purpose: Load the page that staff use to select an order.
function PageLoadStaffSelectOrder() {
    $("#staffSelectOrderStyleId")[0].disabled = false;
    $("#staffSelectOrderPageId")[0].disabled = false;
    CreateStaffSelectOrderPage();
}

//Purpose: Load the page that staff manage a single order on.
function PageLoadStaffOrder() {
    $("#staffOrderStyleId")[0].disabled = false;
    $("#staffOrderPageId")[0].disabled = false;
    CreateStaffOrderPage();
}

//Purpose: Load the page that staff manage the inventory of.
function PageLoadStaffInventory(addFromMenuPage = false) {
    $("#staffInventoryStyleId")[0].disabled = false;
    $("#staffInventoryId")[0].disabled = false;
    CreateStaffInventoryPage(addFromMenuPage);
}

//Purpose: Used to reset the stylesheets that are related to specific pages. The relevant ones are turned on in the functions called by SetPage().
function TurnOffPageSheets() { //https://williamhuey.github.io/posts/disable-stylesheets-with-javascript/
    $("#custOrderStyleId")[0].disabled = true;
    $("#staffOrderStyleId")[0].disabled = true;
    $("#customerOrderPageId")[0].disabled = true;
    $("#staffOrderPageId")[0].disabled = true;
    $("#staffInventoryStyleId")[0].disabled = true;
    $("#staffInventoryId")[0].disabled = true;
}

//Purpose: For testing to swap between pages.
function TestingTools() {
    //For changing pages.
    var btnPage1 = createElement("button", {"onClick": "ChangePage(1)" });
    btnPage1.textContent = "Change to Page 1";
    var btnPage2 = createElement("button", {"onClick": "ChangePage(2)" });
    btnPage2.textContent = "Change to Page 2";
    var btnPage3 = createElement("button", {"onClick": "ChangePage(3)" });
    btnPage3.textContent = "Change to Page 3";
    var btnPage4 = createElement("button", {"onClick": "ChangePage(4)" });
    btnPage4.textContent = "Change to Page 4";
    //For changing user types.
    var loginStaff = createElement("button", {"onClick": "ChangeUserTest(0)" });
    loginStaff.textContent = "Staff(0)";
    var loginManager = createElement("button", {"onClick": "ChangeUserTest(1)" });
    loginManager.textContent = "Manager(1)";
    var loginNormal = createElement("button", {"onClick": "ChangeUserTest(2)" });
    loginNormal.textContent = "Customer(2)";
    var loginVIP = createElement("button", {"onClick": "ChangeUserTest(3)" });
    loginVIP.textContent = "VIP(3)";

    var notes = createElement("div", {"style": "background: rgba(200,200,200,.5)"}, ["Select user type THEN change page in order to see the effects"]);

    var testtool = createElement("div", {"id": "testTool"});

    //For changing pages.
    testtool.appendChild(btnPage1);
    testtool.appendChild(btnPage2);
    testtool.appendChild(btnPage3);
    testtool.appendChild(btnPage4);
    //For changing user types.
    testtool.appendChild(loginStaff);
    testtool.appendChild(loginManager);
    testtool.appendChild(loginNormal);
    testtool.appendChild(loginVIP);

    testtool.appendChild(notes);

    document.getElementsByClassName("mainContent")[0].appendChild(testtool);
}

//Purpose: Use this function to change the page.
//0 =
//1 = Customer Order
//2 = Staff Select Order
//3 = Staff Order
//4 = Staff Inventory
//5 = Staff Inventory when adding item to order
function ChangePage(num) {
    ResetUndoRedo();
    ClearPage();
    TurnOffPageSheets();
    tempSelected = num;
    SetPage();
    TestingTools();
}

//Test tool for swapping between user types.
//0 = Normal Staff / Waiter
//1 = Manager / Owner
//2 = Normal Customer (Default - no login)
//3 = VIP Customer
function ChangeUserTest(num = 2) {
    switch (num) {
        case 0:
            UpdateUserConnected(24);
            break;
        case 1:
            UpdateUserConnected(2);
            break;
        case 2:
            UpdateUserConnected(""); //No login for normal customers.
            break;
        case 3:
            UpdateUserConnected(28);
            break;
    }
}
var tempSelected = 2;

$(document).ready(function(){
    TurnOffPageSheets();
    SetPage();
    TestingTools();
})

function SetPage() {
    switch (tempSelected) {
        case 0:

            break;
        case 1:
            PageLoadCustomerOrder();
            break;
        case 2:
            PageLoadStaffOrder();
            break;
        case 3:
            PageLoadStaffInventory();
            break;
    }
}

//Clears all the items on a page.
function ClearPage() {
    for (i = 0; i < document.body.children.length; i++)
        document.body.lastChild.remove();
}

function PageLoadCustomerOrder() {
    $("#custOrderStyleId")[0].disabled = false;
    $("#customerOrderPageId")[0].disabled = false;
    CreateCstmrOrderPage();
    CstmrOrderSetTextLabels();
    ResetUndoRedo();
}

function PageLoadStaffOrder() {
    $("#staffOrderStyleId")[0].disabled = false;
    $("#staffOrderPageId")[0].disabled = false;
    CreateStaffOrderPage();
}

function PageLoadStaffInventory() {
    $("#staffInventoryStyleId")[0].disabled = false;
    $("#staffInventoryId")[0].disabled = false;
    CreateStaffInventoryPage();
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

//Purpose: USed to swap between user types.
function TestingTools() {
    var btnPage1 = createElement("button", {"onClick": "ChangePage(1)" });
    btnPage1.textContent = "Change to Page 1";
    var btnPage2 = createElement("button", {"onClick": "ChangePage(2)" });
    btnPage2.textContent = "Change to Page 2";
    var btnPage3 = createElement("button", {"onClick": "ChangePage(3)" });
    btnPage3.textContent = "Change to Page 3";
    var testtool = createElement("div", {"id": "testTool"});
    testtool.appendChild(btnPage1);
    testtool.appendChild(btnPage2);
    testtool.appendChild(btnPage3);
    document.getElementsByClassName("mainContent")[0].appendChild(testtool);
}

function ChangePage(num) {
    ResetUndoRedo();
    ClearPage();
    TurnOffPageSheets();
    tempSelected = num;
    SetPage();
    TestingTools();
}
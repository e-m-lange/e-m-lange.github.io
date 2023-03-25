function CreateStaffSelectOrderPage() {
    var orderItemZone = createElement("div", {"id": "orderItemZone"});
    //-----------------------------------------------------------------------//
    SetChangeLangAfterFunc( function() { parameters.lang = this.getAttribute("langType"); UpdateNavigationLabels(); SetStaffSelectOrderLabels(); });
    var staffSelectOrderEl = createElement("div", {"class": "mainContent"}, [CreateNavBar(), orderItemZone, CreateMenuBar()]);

    document.body.appendChild(staffSelectOrderEl);
    RemoveAll();
    ResetUndoRedo();
    LoadStaffOrderItems();
    ManageStaffSelectOrderListeners();
    SetStaffSelectOrderLabels();
}

//Load the orders that haven't been handled onto the view.
function LoadStaffOrderItems() {
    var orders = PendingOrders();
    for (let i = 0; i < orders.length; i++) {
        $("#orderItemZone").append(CreateStaffSelectOrderItem(1, TotalPriceOrder(orders[i]), TotalAmountOrder(orders[i]), orders[i].timestamp, orders[i].transaction_id));
    }
}

//Purpose: Clears all the currently displayed orders.
function ClearStaffOrderItems() {
    var orderItemZoneChildren = document.getElementById("orderItemZone");
    while (orderItemZoneChildren.children.length > 0) { orderItemZoneChildren.lastChild.remove() };
}

function CreateStaffSelectOrderItem(table = 1, price = 0, amount = 1, time = "00:00", id) {
    //The order information.
    var tableEl = createElement("label", {"class": "orderLabel"});
    tableEl.textContent = getString("string table") + ": " + table;
    var totalPriceEl = createElement("label", {"class": "orderLabel"});
    totalPriceEl.textContent = price + "kr";
    var timeEl = createElement("label", {"class": "orderLabel"});
    timeEl.textContent = "Time" + ": " + time.toLocaleTimeString();
    var amountEl = createElement("label", {"class": "orderLabel"});
    amountEl.textContent = getString("string order menu") + " " + getString("string amount") + ": " + amount;
    var labelContainerEl = createElement("div", {"class": "labelContainer"}, [tableEl, totalPriceEl, amountEl, timeEl]);
    //Button to delete the order.
    var deleteBtnEl = createElement("button", {"class": "deleteBtn"}, ["X"]);
    //Element to append.
    var orderItemEl = createElement("div", {"class": "tableOrderItem", "id": id, "onClick": "OpenSelectedOrder(this)"}, [labelContainerEl, deleteBtnEl]);

    return orderItemEl;
}

function SetStaffSelectOrderLabels() {
    document.getElementById("loginButton").textContent = getString("button login");
}
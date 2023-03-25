function CreateStaffSelectOrderPage() {
    var orderItemZone = createElement("div", {"id": "orderItemZone"});
    //-----------------------------------------------------------------------//
    var staffSelectOrderEl = createElement("div", {"class": "mainContent"}, [CreateNavBar(), orderItemZone, CreateMenuBar()]);

    document.body.appendChild(staffSelectOrderEl);
    LoadStaffOrderItems();
}

function LoadStaffOrderItems() {
    var orders = allOrders();

    for (let i = 0; i < orders.length; i++) {
        if (!getStatusOrder(orders[i])) { //If the order hasn't been served yet, append the order.
            $("#orderItemZone").append(CreateStaffSelectOrderItem(1, TotalPriceOrder(orders[i]), TotalAmountOrder(orders[i]), orders[i].timestamp, orders[i].transaction_id));
        }
    }
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
    var orderItemEl = createElement("div", {"class": "tableOrderItem", "id": id}, [labelContainerEl, deleteBtnEl]);

    return orderItemEl;
}
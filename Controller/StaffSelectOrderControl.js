//When an order is selected, open it.
function OpenSelectedOrder(ev) {
    var selectedOrderId = ev.id;

    //Load the order into the drag drop model.
    LoadOrderIntoDragDropModel(selectedOrderId);
    ChangePage(3); //Staff order page.
}

//Purpose: When user clicks delete button, delete the order. Currently attached using addeventlistener.
function DeleteStaffSelectedOrder(ev) {
    var selectedOrderId

    if (ev instanceof Event) { //If of type Event.
        selectedOrderId = ev.target.parentElement.id;
    }
    else if (ev instanceof HTMLElement) { //If of type HTMLelement.
        selectedOrderId = ev.id;
    }

    if (selectedOrderId) { //If valid.
        DeleteOrder(selectedOrderId);
    }
}

function ManageStaffSelectOrderListeners() {
    //Add the delete event to the delete buttons.
    var allDeleteBtns = document.getElementsByClassName("deleteBtn");
    for (let i = 0; i < allDeleteBtns.length; i++) {
        allDeleteBtns[i].addEventListener("click", function (ev) { DeleteStaffSelectedOrder(ev); ClearStaffOrderItems(); LoadStaffOrderItems(); ManageStaffSelectOrderListeners(); ev.stopPropagation();}) //Attach delete event and prevent event attached to parent.
    }
}
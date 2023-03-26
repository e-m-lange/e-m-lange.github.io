var hasBeenModified = false; //Used to keep track of if changes have occurred to the order, which would mean having to replace the old order with new ones.

function StaffDrag(ev){
    ev.dataTransfer.setData("customerID", selectedCustomer); //storing this ID will allow for us to know where the item came from. Customer id.
    ev.dataTransfer.setData("targetID", ev.target.id); //store the id for removal later.
    if (ev.target.parentElement.id === "mainTab") {
        ev.dataTransfer.setData("bevID", RetrieveCstmrSingleItem(ev.target.id, GetParentIDOfItem(ev.target.id)).name); //Will get the beverage ID through the customer order model.
    }
    else { //For unassigned.
        ev.dataTransfer.setData("bevID", RetrieveUnassignedOrders().find(x => x.id === ev.target.id).name);
    }
}

function StaffDrop(ev){
    try {
        //Ensure the item is a valid customer item.
        if (document.getElementById(ev.dataTransfer.getData("targetID")).classList.contains('staffOrderContainer')) {
            var parent = ev.dataTransfer.getData("customerID", ev.target.parentElement.id);
            var target = ev.target.id;
            var itemName = ev.dataTransfer.getData("bevID", ev.target.name);
            var itemId = ev.dataTransfer.getData("targetID", ev.target.id);
            if (target && parent) {
                StaffCheckDrop(parent, target, itemName, itemId);
                LoadOrder();
                LoadUnassigned();
            }
        }
    }
    catch (error) {
        console.log(error);
    }
}

function StaffCheckDrop(parent, target, itemName, itemId) { //parent = customerID, target = where the item is dropped
    if (parent === target) {
        return;
    }
    var targetClasses = document.getElementById(target).classList;
    var parentClasses = document.getElementById(parent).classList;

    if (target === "unassignedTab") { //When moving from a customer to the unassigned tab.
        if (parentClasses.contains("cstmrTab") || parentClasses.contains("tabItem")) {
            StaffDoAction("MoveToUnassigned", parent, target, itemName, itemId);
        }
    }
    else if (document.getElementById(itemId).parentElement.id === "unassignedTab") { //When moving from the unassigned tab to the customer.
        if (target === "orderZone" || target === "mainTab") {
            StaffDoAction("MoveUnassignedToCustomer", parent, target, itemName, itemId);
        }
    }
}

//All staff order actions are routed here.
function StaffDoAction(action, parent, target, itemName, itemId) {
    var successfulAction = true;
    const oldState = JSON.parse(JSON.stringify(RetrieveAllCustomers())); //Save the old state for undo redo later.
    const oldStateUnassigned = JSON.parse(JSON.stringify(RetrieveUnassignedAll())); //Save the old state for undo redo later.
    hasBeenModified = true; //When an action has occurred, means the order has been modified.

    switch(action) {
        case "AddCustomer":
            document.getElementsByClassName("mainContent")[0].appendChild(CreateMessageBox("Input new name:", true));
            document.getElementById("defMessBox").addEventListener("MessageClosedEv", function(evt) { //Call this when the messagebox is closed.
                selectedCustomer = null; //Unselect customer.
                AddCustomer(evt.input);
                LoadMultipleCstmrTabs();
                LoadOrder();
            }, false);
            break;
        case "RemoveCustomer":
            if (selectedCustomer != null && TotalCstmrCount() > 1) { //Don't allow for deletion if only one customer left.
                RemoveCustomer(selectedCustomer);
                LoadMultipleCstmrTabs();
                SetSelectedCustomer(null);
                LoadOrder();
            }
            break;
        case "MoveItemToCustomer":
            AddItem(itemName, GetParentIDOfItem(itemId));
            RemoveItemFromUnassigned(itemId);
            break;
        case "DuplicateItem":
            AddItem(itemName, GetParentIDOfItem(itemId));
            break;
        case "RemoveItem":
            RemoveItem(itemId, parent);
            LoadOrder();
            break;
        case "AddItemToUnassigned": //When adding an item from the menu.
            break;
        case "MoveToUnassigned":
            AddItemToUnassigned(itemName);
            RemoveItem(itemId, parent);
            break;
        case "MoveUnassignedToCustomer":
            AddItem(itemName, parent);
            RemoveItemFromUnassigned(itemId);
            break;
        case "SingleOrder":
            StaffSingleOrder(); //Call function from StaffDragDropControl that causes all orders to be shifted to one customer.
            LoadSingleOrder();
            LoadStaffOrderView();
            break;
        default:
            successfulAction = false; //If no valid action was made, don't save the state.
            break;
    }

    if (successfulAction) {
        StaffActionUndoRedo(oldState, oldStateUnassigned);
    }
}

function StaffSingleOrder() {
    CreateSingleOrder();
}

//Purpose: Edit the customer's name.
function StaffEditCustomerNameCtrl(custID) {
    document.getElementsByClassName("mainContent")[0].appendChild(CreateMessageBox("Input new name:", true));
    document.getElementById("defMessBox").addEventListener("MessageClosedEv", function(evt) { //Call this when the messagebox is closed.
        EditCustomerName(custID, evt.input);
        LoadMultipleCstmrTabs();
    }, false);
}

function StaffActionUndoRedo(oldState, oldStateUnassigned) {
    const newState = JSON.parse(JSON.stringify(RetrieveAllCustomers()));
    const newStateUnassigned = JSON.parse(JSON.stringify(RetrieveUnassignedAll()));
    CreateUndoRedoItem(
        function() { //Setting function call for redo.
            UndoRedoDragDrop(newState, "redo");
            UndoRedoUnassigned(newStateUnassigned);
            LoadStaffOrderView();
            if (modifyOrderOn) { LoadModifyOrder();}
            },

        function() { //Setting function call for undo.
            UndoRedoDragDrop(oldState, "undo");
            UndoRedoUnassigned(oldStateUnassigned);
            LoadStaffOrderView();
            if (modifyOrderOn) { LoadModifyOrder();}
        });
}

function ManageListenersOrders(orderItem) {
    orderItem.addEventListener("click", ExpandOrderItemOption);
}

//Purpose: When clicking proceed payment button.
function ProceedWithPayment(customerID = "cust_0") { //Default for first customer.
    console.log("Payment");

    if (TotalCstmrCount() <= 1) { //If there's only one customer, the whole order is done once paid.
        var currOrderX = cstmrOrderListModel.id; //The saved id of the order being handled.
        if (!hasBeenModified) { //If the order hasn't been modified, just update the status.
            UpdateOrderStatus(currOrderX); //Indicate it has been served.
        }
        else { //Otherwise, if it has been modified.
            var newOrderIdX = PageCreateOrder(); //Create a new order.
            UpdateOrderStatus(newOrderIdX); //Indicate that the new order has already been handled.
            DeleteOrder(currOrderX); //Delete the old order.
        }
        ChangePage(2); //Go back to the select order page.
        document.getElementsByClassName("mainContent")[0].appendChild(CreateMessageBox("Order Payment Completed", false));
    }
    else { //Otherwise if there are several customers, hide customers as the orders are paid (flawed solution...) since orders are handled as tables.
        RetrieveCustomer(selectedCustomer).hasPaid = true; //Indicate the customer has now paid.
        if (CheckAllCustomersPaid()) { //If all customers have paid...
            var currOrderY = cstmrOrderListModel.id;
            if (!hasBeenModified) { //If it hasn't been modified, just change the status.
                UpdateOrderStatus(currOrderY);
            }
            else { //If it has been modified, need to replace the order.
                var newOrderIdY = PageCreateOrder(); //Create a new order.
                UpdateOrderStatus(newOrderIdY); //Indicate that the new order has already been handled.
                DeleteOrder(currOrderY); //Delete the old order.
            }

            ChangePage(2);
            document.getElementsByClassName("mainContent")[0].appendChild(CreateMessageBox("Order Payment Completed", false));
        }
        else { //Otherwise just change the status of the customer's paid status.
            LoadStaffOrderView(); //Update the view.
            SetNextUnpaidCustomer(); //Select the next customer that has yet to pay.
            LoadOrder(); //Load the view (orders of selected customer).
        }
    }
}
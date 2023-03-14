
function StaffDrag(ev){
    ev.dataTransfer.setData("string", selectedCustomer); //storing this ID will allow for us to know where the item came from. Customer id.
    ev.dataTransfer.setData("text", ev.target.childNodes[0].childNodes[0].textContent); //store the name of the item. Staff order info
    ev.dataTransfer.setData("idText", ev.target.id); //store the id for removal later
}

function StaffDrop(ev){
    try {
        console.log(ev);
        //Ensure the item is a valid customer item.
        if (document.getElementById(ev.dataTransfer.getData("idText", ev.target.id)).classList.contains('staffOrderContainer')) {
            var parent = ev.dataTransfer.getData("string", ev.target.parentElement.id);
            var target = ev.target.id;
            var itemName = ev.dataTransfer.getData("text", ev.target.name);
            var itemId = ev.dataTransfer.getData("idText", ev.target.id);
            StaffCheckDrop(parent, target, itemName, itemId);
            LoadOrder();
            LoadUnassigned();
        }
    }
    catch (error) {
        console.log(error);
    }
}

function StaffCheckDrop(parent, target, itemName, itemId) { //parent = customerID, target = where the item is dropped
    if (parent == target) {
        return;
    }
    var targetClasses = document.getElementById(target).classList;
    var parentClasses = document.getElementById(parent).classList;

    if (target == "unassignedTab") { //When moving from a customer to the unassigned tab.
        if (parentClasses.contains("cstmrTab") || parentClasses.contains("tabItem")) {
            StaffDoAction("MoveToUnassigned", parent, target, itemName, itemId)
        };
    }
    else if (document.getElementById(itemId).parentElement.id == "unassignedTab") { //When moving from the unassigned tab to the customer.
        if (target == "orderZone" || target == "mainTab") {
            StaffDoAction("MoveUnassignedToCustomer", parent, target, itemName, itemId)
        };
    }
}

function StaffDoAction(action, parent, target, itemName, itemId) {
    var successfulAction = true;
    const oldState = JSON.parse(JSON.stringify(RetrieveAllCustomers())); //Save the old state for undo redo later.
    const oldStateUnassigned = JSON.parse(JSON.stringify(RetrieveUnassignedAll())); //Save the old state for undo redo later.

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
            if (selectedCustomer != null) {
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
            if (modifyOrderOn) { //If it was showing the unassigned tab etc., turn it off.
                LoadModifyOrder();
            }
            StaffSingleOrder(); //Call function from StaffDragDropControl that causes all orders to be shifted to one customer.
            LoadStaffOrderView();
            LoadSingleOrder();
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
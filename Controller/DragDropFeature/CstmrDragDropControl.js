//View IDs:
//orderZone = supposed to represent the area that the holds all order-related things
//menuZone = supposed to represent the area that the holds all menu-related things
//addCustomerZone = supposed to represent the area that allows for adding of customers, although is redundant given class addNewCustomer

//View CLASSES:
//orderItem = used to identify items that have been ordered
//menuItem = used to identify items that have been classified as menu items
//addNewCustomer = used to
//customerItem =
//customerContainer = encapsulates the customer elements, allows identification of where the items are placed.

//Should only have 10 orders in total
const maxNumOrders = 10;

//Purpose: When an item that has subscribed is dragged, will save the parentElement ID for the drop function
function CstmrDrag(ev){
    ev.dataTransfer.setData("string", ev.target.parentElement.id); //storing this ID will allow for us to know where the item came from
    ev.dataTransfer.setData("text", ev.target.textContent); //store the name of the item
    ev.dataTransfer.setData("idText", ev.target.id); //store the id for removal later

    console.log("parentelement");
    console.log(ev.dataTransfer.getData("string", ev.target.parentElement.id));
    console.log("textcontent");
    console.log(ev.dataTransfer.getData("text", ev.target.textContent));
    console.log("id");
    console.log(ev.dataTransfer.getData("idText", ev.target.id));
}


//Purpose: When item is dropped into either of the divs (whose events have been subscribed to)
function CstmrDrop(ev){
    try {
        //Ensure the item is a valid menu item (i.e. has the class 'menuItem') OR order item.
        if (document.getElementById(ev.dataTransfer.getData("idText", ev.target.id)).classList.contains('menuItem') ||
            document.getElementById(ev.dataTransfer.getData("idText", ev.target.id)).classList.contains('orderItem') ) {
            CstmrCheckDrop(ev.dataTransfer.getData("string", ev.target.parentElement.id), ev.target.id,
                ev.dataTransfer.getData("text", ev.target.name), ev.dataTransfer.getData("idText", ev.target.id));
            //https://developer.mozilla.org/en-US/docs/Web/API/DataTransfer //https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/dragover_event
            LoadView();
            CstmrManageListeners();
        }
    }
    catch (error) {
        console.log(error);
        LoadView();
        CstmrManageListeners();
    }
}


//Purpose: Will check whether the items being added are meeting the conditions before calling the functions in DragDropFunctions.
//We can make different versions if need be (different checks).
function CstmrCheckDrop(parent, target, itemName, itemId)
{
    //If they are the same (i.e. not moving anywhere), do nothing.
    if (parent === target) {
        return;
    }

    const oldState = JSON.parse(JSON.stringify(RetrieveAllCustomers())); //Used to save the model state before changes made for the UndoRedoManager. Clone the model, https://www.samanthaming.com/tidbits/70-3-ways-to-clone-objects/.
    var targetClasses = document.getElementById(target).classList; //Where the item is being dropped into.
    var parentClasses = document.getElementById(parent).classList; //Where the item comes from.
    var successfulAction = true; //Will be used to determine if the state should be saved.

    //Find out how many orders there are in total.
    var customerCount = 0;
    RetrieveAllCustomers().forEach(x => customerCount = customerCount + TotalCstmrOrderCount(x.ID));

    //Actions, will check where they're being dropped and call the right functions:
    if (targetClasses.contains("orderTab") && parentClasses.contains("menuTab")
        && customerCount < maxNumOrders) //Only add when under max number of orders.
    {
        CstmrAddItemFromMenu(itemName);
    }
    else if (targetClasses.contains("menuTab") && parentClasses.contains("orderTab")) {
        CstmrRemoveItemFromOrder(itemId);
    }
    else if (targetClasses.contains("addNewCustomer") && parentClasses.contains("menuTab")
             && RetrieveCstmrItems().length > 0 //Only allow adding of customers once customer 1 has items.
             && customerCount < maxNumOrders)   //Only add when under max number of orders.
    {
        CstmrAddNewCstmr(itemName, oldState);
        successfulAction = false; //Not successful until user has inputted name and closed the message box. Hence, saving the state has been added to the function run at close event of message box.
    }
    else if (targetClasses.contains("customerContainer") && parentClasses.contains("menuTab")) {
        CstmrAddItemToCstmr(itemName, target);
    }
    else if (targetClasses.contains("menuTab") && parentClasses.contains("customerContainer")) {
        CstmrRemoveItemFromCstmr(itemId, parent);
    }
    else if (targetClasses.contains("customerContainer") && parentClasses.contains("customerContainer")) {
        CstmrMoveItemBetweenCstmr(itemId, target, parent);
    }
    else { //If no valid action was made, don't save the state.
        successfulAction = false;
    }

    if (successfulAction) {
        CstmrActionUndoRedo(oldState);
    }
}

//Calling functions from DragDropFunctions.
function CstmrAddItemFromMenu(addItemName) {
    AddItem(addItemName);
}
function CstmrRemoveItemFromOrder(removeItemId) {
    RemoveItem(removeItemId);
}
function CstmrAddItemToCstmr(addItemName, customerId) {
    AddItem(addItemName, customerId);
}
function CstmrRemoveItemFromCstmr(removeItemId, customerId) { //There is no function for removing customer directly since once a customer has no order it is removed in the model.
    RemoveItem(removeItemId, customerId);
    ClearEmptyCustomer(customerId);
}
function CstmrMoveItemBetweenCstmr(itemId, targetCstmrId, parentCstmrId) {
    var itemName = RetrieveCstmrSingleItem(itemId, parentCstmrId).name; //NEEDS TO BE EDITED, WAITING FOR DRINK CARD
    AddItem(itemName, targetCstmrId);
    RemoveItem(itemId, parentCstmrId);
}
function CstmrAddNewCstmr(addItemName, oldState) { //Opens a message box waiting for input, then calls functions upon exiting the message box.
    document.getElementsByClassName("mainContent")[0].appendChild(CreateMessageBox(getString("message customer name"), true));
    document.getElementById("defMessBox").addEventListener("MessageClosedEv", function(evt) {
        var newlyAddedCstmrID = AddCustomer(evt.input);
        AddItem(addItemName, newlyAddedCstmrID);
        CstmrActionUndoRedo(oldState);
        LoadView();
        CstmrManageListeners();
    }, false);
}



//Purpose: When user clicks the edit button next order name to change the customer name.
function CstmrEditCustomerNameCtrl(customerID){
    document.getElementsByClassName("mainContent")[0].appendChild(CreateMessageBox("Input new name:", true));
    document.getElementById("defMessBox").addEventListener("MessageClosedEv", function(evt) { //Call this when the messagebox is closed.
        EditCustomerName(customerID, evt.input);
        LoadView();
        CstmrManageListeners();
    }, false);
}

//Basic function sent to UndoRedoManager where the states of the models are saved. This was the easiest way to ensure all changes were accounted for, and since the model is so small.
function CstmrActionUndoRedo(oldState) {
    const newState = JSON.parse(JSON.stringify(RetrieveAllCustomers()));
    CreateUndoRedoItem(function(){ UndoRedoDragDrop(newState, "redo"); LoadView(); CstmrManageListeners(); }, function(){ UndoRedoDragDrop(oldState, "undo"); LoadView(); CstmrManageListeners(); }); //To allow for Undo & Redo. https://stackoverflow.com/questions/1300242/passing-a-function-with-parameters-as-a-parameter
}

//Purpose: This will be called when the there are more than one customer as the areas that allow for
//dropping items into will change from the whole orderZone to the specific customer containers
function CstmrManageListeners() {
    var orderZone = document.getElementById("orderZone");

    if (TotalCstmrCount() <= 1) { //If the total number of customer is only one...
        orderZone.addEventListener("drop", CstmrDrop); //allow user to drop into the orderZone
    }

    else { //Otherwise, allow for dropping into any of the customer containers
        document.querySelectorAll(".customerContainer").forEach(x => { x.addEventListener("drop", CstmrDrop ); }) //https://flaviocopes.com/how-to-add-event-listener-multiple-elements-javascript/
        orderZone.removeEventListener("drop", CstmrDrop ); //Prevent user from dropping into orderZone
    }
}
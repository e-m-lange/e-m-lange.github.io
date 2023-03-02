//View IDs:
//orderZone = supposed to represent the area that the holds all order-related things
//menuZone = supposed to represent the area that the holds all menu-related things
//addCustomerZone = supposed to represent the area that allows for adding of customers, although is redundant given class addNewCustomer

//View CLASSES:
//orderItem = used to identify items that have been ordered
//menuItem = used to identify items that have been classified as menu items
//addNewCustomer = used to
//customerItem =
//customerContainer =

//Should only have 10 orders in total
const maxNumOrders = 10;

//Purpose: When an item that has subscribed is dragged, will save the parentElement ID for the drop function
function Drag(ev){
    ev.dataTransfer.setData("string", ev.target.parentElement.id); //storing this ID will allow for us to know where the item came from
    ev.dataTransfer.setData("text", ev.target.textContent); //store the name of the item
    ev.dataTransfer.setData("idText", ev.target.id); //store the id for removal later
}


//Purpose: When item is dropped into either of the divs (whose events have been subscribed to)
function Drop(ev){
    try {
        //Ensure the item is a valid menu item (i.e. has the class 'menuItem') OR and order item.
        if (document.getElementById(ev.dataTransfer.getData("idText", ev.target.id)).classList.contains('menuItem') ||
            document.getElementById(ev.dataTransfer.getData("idText", ev.target.id)).classList.contains('orderItem') ){
            CheckDrop(ev.dataTransfer.getData("string", ev.target.parentElement.id), ev.target.id,
                ev.dataTransfer.getData("text", ev.target.name), ev.dataTransfer.getData("idText", ev.target.id));
            //https://developer.mozilla.org/en-US/docs/Web/API/DataTransfer //https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/dragover_event
            LoadView();
            ManageListeners();
        }
    }
    catch (error) { //When dropping into a customer
        console.log(error);
        LoadView();
        ManageListeners();
    }
}


//Purpose: Will check whether the items being added are meeting the conditions before calling the functions in DragDropFunctions.
function CheckDrop(parent, target, addItemName, itemId)
{
    console.log("parent");
    console.log(parent);
    console.log("target");
    console.log(target);

    //If they are the same (i.e. not moving anywhere), do nothing.
    if (parent == target)
        return;

    //ADD ORDER ITEM
    var customerCount = 0;
    RetrieveAllCustomers().forEach(x => customerCount = customerCount + TotalCstmrOrderCount(x.ID));
    if (customerCount < maxNumOrders) //Ensure that it does not exceed 10 items
        AddOrderItem(target, addItemName, parent); //Should inform user with a message!

    //REMOVE ORDER ITEM: If it outside of the order tab, remove them.
    //But if it has been marked as an orderItem (which user may accidently drag into), do nothing.
    RemoveOrderItem(parent, target, itemId);

    //ADD CUSTOMER
    //Customers are added when items are dragged in, so item being dragged has to be added at the same time.
    AddCustomerItem(target, addItemName);
}

//Purpose: To add an item to the order.
function AddOrderItem(target, addItemName, parent)
{
    const oldState = JSON.parse(JSON.stringify(RetrieveAllCustomers())); //Used to save the model state before changes made for the UndoRedoManager. Clone the model, https://www.samanthaming.com/tidbits/70-3-ways-to-clone-objects/.

    //ADD ORDER ITEM: If the div has the class orderTab, items dragged here are added.
    if (document.getElementById(target).classList.contains('orderTab')){ //If the item is being dragged into the div with class orderTab
        if (TotalCstmrCount().length > 1)
            AddItem(addItemName, target)
        else //otherwise just go with default customer ID of 0
            AddItem(addItemName);
    }
    else if (document.getElementById(target).classList.contains('customerContainer')) //Otherwise if it is a customer div...
        AddItem(addItemName, target);

    setTimeout(() => CstmrActionUndoRedo(oldState), 10); //If there are remove functions running, wait for those to finish.
}

//Purpose: Removing and item from the order.
function RemoveOrderItem(parent, target, itemId){
    var targetElement = document.getElementById(target).classList;

    if (!targetElement.contains('orderTab') && !targetElement.contains('orderItem') && !targetElement.contains('addNewCustomer')
        && parent != "menuZone") {
        const oldState = JSON.parse(JSON.stringify(RetrieveAllCustomers()));

        //Don't need to specify the customer it is being removed from.
        if (TotalCstmrCount() <= 1)
            RemoveItem(itemId); //ID that was stored in drag datatransfer, is used to find the item in the model.
        else
            RemoveItem(itemId, parent);

        if (!document.getElementById(target).classList.contains('customerContainer')) //When moving between customers, two actions occur, thus, we only want to save the state once.
            CstmrActionUndoRedo(oldState);
    }
}

//Purpose: For adding a new customer.
async function AddCustomerItem(target, addItemName){
    var targetElement = document.getElementById(target).classList;

    if (targetElement.contains('addNewCustomer')){
        if (RetrieveCstmrItems().length > 0){ //only allow adding of customers once customer 1 has items

            document.getElementsByClassName("mainContent")[0].appendChild(CreateMessageBox(getString("message customer name"), true));
            document.getElementById("defMessBox").addEventListener("MessageClosedEv", function(evt) {
                AddCustomerWithName(evt.input, addItemName);
            }, false);
        }
    }
}

function AddCustomerWithName(customerName, addItemName) {
    console.log("made customer");
    const oldState = JSON.parse(JSON.stringify(RetrieveAllCustomers()));
    var newlyAddedCstmrID = AddCustomer(customerName);
    console.log(customerName);
    console.log(newlyAddedCstmrID);
    AddItem(addItemName, newlyAddedCstmrID);

    console.log(TotalCstmrCount());
    CstmrActionUndoRedo(oldState);
    LoadView();
}

function EditCustomerNameCtrl(customerID){
    document.getElementsByClassName("mainContent")[0].appendChild(CreateMessageBox("Input new name:", true));
    document.getElementById("defMessBox").addEventListener("MessageClosedEv", function(evt) {
        EditCustomerName(customerID, evt.input);
        LoadView();
    }, false);
}

//Basic function sent to UndoRedoManager where the states of the models are saved. This was the easiest way to ensure all changes were accounted for, and since the model is so small.
function CstmrActionUndoRedo(oldState) {
    //const newState = Object.assign({}, RetrieveAllCustomers());
    const newState = JSON.parse(JSON.stringify(RetrieveAllCustomers()));
    CreateUndoRedoItem(function(){ UndoRedoDragDrop(newState, "redo"); LoadView(); ManageListeners(); }, function(){ UndoRedoDragDrop(oldState, "undo"); LoadView(); ManageListeners(); }); //To allow for Undo & Redo. https://stackoverflow.com/questions/1300242/passing-a-function-with-parameters-as-a-parameter
}

//Purpose: This will be called when the there are more than one customer as the areas that allow for
//dropping items into will change from the whole orderZone to the specific customer containers
function ManageListeners() {
    var orderZone = document.getElementById("orderZone");

    if (TotalCstmrCount() <= 1) //If the total number of customer is only one...
        orderZone.addEventListener("drop", Drop ); //allow user to drop into the orderZone

    else { //Otherwise, allow for dropping into any of the customer containers
        document.querySelectorAll(".customerContainer").forEach(x => { x.addEventListener("drop", Drop ); }) //https://flaviocopes.com/how-to-add-event-listener-multiple-elements-javascript/
        orderZone.removeEventListener("drop", Drop ); //Prevent user from dropping into orderZone
    }
} //orderZone.replaceWith(orderZone.cloneNode(true)); //clear all listeners, use this since we used anonymous types for subscriptions https://bobbyhadz.com/blog/javascript-remove-all-event-listeners-from-element
//Important View IDs:
//orderZone = supposed to represent the area that the holds all order-related things
//menuZone = supposed to represent the area that the holds all menu-related things
//addCustomerZone = supposed to represent the area that allows for adding of customers, although is redundant given class addNewCustomer

//CLASSES that need to be added to View elements:
//orderItem = used to identify items that have been ordered
//menuItem = used to identify items that have been classified as menu items
//addNewCustomer = used to
//customerItem =

//Should only have 10 orders in total
const maxNumOrders = 10;
var isVIP = false;

//Purpose: When an item that has subscribed is dragged, will save the parentElement ID for the drop function
function Drag(ev){
    ev.dataTransfer.setData("string", ev.target.parentElement.id); //storing this ID will allow for us to know where the item came from
    ev.dataTransfer.setData("text", ev.target.textContent); //store the name of the item
    ev.dataTransfer.setData("idText", ev.target.id); //store the id for removal later
    console.log(ev.target.id);
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
    console.log("target: " + target + "  parent: " + parent + "  classList: " + Array.from(document.getElementById(target).classList));

    //If they are the same (i.e. not moving anywhere), do nothing.
    if (parent == target)
        return;

    //ADD ORDER ITEM
    var customerCount = 0;
    RetrieveAllCustomers().forEach(x => customerCount = customerCount + TotalCstmrOrderCount(x.ID));
    if (customerCount < maxNumOrders) //Ensure that it does not exceed 10 items
        AddOrderItem(target, addItemName); //Should inform user with a message!

    //REMOVE ORDER ITEM: If it outside of the order tab, remove them.
    //But if it has been marked as an orderItem (which user may accidently drag into), do nothing.
    RemoveOrderItem(parent, target, itemId);

    //ADD CUSTOMER
    //Customers are added when items are dragged in, so item being dragged has to be added at the same time.
    AddCustomerItem(target, addItemName);
}

function AddOrderItem(target, addItemName)
{
    //ADD ORDER ITEM: If the div has the class orderTab, items dragged here are added.
    if (document.getElementById(target).classList.contains('orderTab')){ //If the item is being dragged into the div with class orderTab
        if (TotalCstmrCount().length > 1)
            AddItem(addItemName, target)
        else //otherwise just go with default customer ID of 0
            AddItem(addItemName);
    }
    else if (document.getElementById(target).classList.contains('customerItem')) //Otherwise if it is a customer div...
        AddItem(addItemName, target);
    else if (document.getElementById(target).classList.contains('orderItem')) //If user drags over existing item, allow to drop..
        AddItem(addItemName, document.getElementById(target).parentElement.id); //But need to parent of the target to add to (i.e. cust_1...)

    console.log("parent element: " + document.getElementById(target).parentElement.classList);
}

function RemoveOrderItem(parent, target, itemId){
    console.log(RetrieveAllCustomers());
    var targetElement = document.getElementById(target).classList;

    if (!targetElement.contains('orderTab') && !targetElement.contains('orderItem') && !targetElement.contains('addNewCustomer')) {
        if (TotalCstmrCount() <= 1)
            RemoveItem(itemId); //ID that was stored in drag datatransfer, is used to find the item in the model.
        else
            RemoveItem(itemId, parent);
    }
}

function AddCustomerItem(target, addItemName){
    var targetElement = document.getElementById(target).classList;

    if (targetElement.contains('addNewCustomer')){
        if (RetrieveCstmrItems().length > 0){ //only allow adding of customers once customer 1 has items
            var newlyAddedCstmrID = AddCustomer();
            AddItem(addItemName, newlyAddedCstmrID);
            console.log(RetrieveAllCustomers());
        }
    }
}

//Purpose: This will be called when the there are more than one customer as the areas that allow for
//dropping items into will change from the whole orderZone to the specific customer containers
function ManageListeners()
{
    var orderZone = document.getElementById("orderZone");

    if (TotalCstmrCount() <= 1) //If the total number of customer is only one...
        orderZone.addEventListener("drop", Drop ); //allow user to drop into the orderZone

    else { //Otherwise, allow for dropping into any of the customer containers
        document.querySelectorAll(".customerItem").forEach(x => { x.addEventListener("drop", Drop ); }) //https://flaviocopes.com/how-to-add-event-listener-multiple-elements-javascript/
        orderZone.removeEventListener("drop", Drop ); //Prevent user from dropping into orderZone
    }
} //orderZone.replaceWith(orderZone.cloneNode(true)); //clear all listeners, use this since we used anonymous types for subscriptions https://bobbyhadz.com/blog/javascript-remove-all-event-listeners-from-element


//Purpose: Creates a placeholder item
function CreateItem(text, id, className)
{
    var divItem = document.createElement("div");
    //Temporary. This can easily be changed by setting a class / a function.
    divItem.style.borderStyle = "solid";
    divItem.style.borderWidth = "1px";
    divItem.style.height = "40px";
    divItem.style.width = "150px";
    divItem.style.margin = "10px";
    divItem.draggable = true;
    divItem.ondragstart = Drag;
    divItem.textContent = text;
    divItem.id = id; //allows for removal later

    console.log("classname: " + className);

    if (className != null)
        divItem.className = className;//to allow for dropping into the order tab ("menuItem") OR to prevent deletion upon being dropped on top of each other in the order tab ("order tab")

    return divItem;
}

//Purpose: Create placeholder customer container
function CreateCustomer(customerName, id = "cust_0")
{
    var divCustomer = document.createElement("div");

    divCustomer.style.borderStyle = "dashed";
    divCustomer.style.borderWidth = "1px";
    divCustomer.style.height = "fit-content";
    divCustomer.style.minHeight = "60px";
    divCustomer.style.width = "250px";
    divCustomer.textContent = customerName + " ID: " + id;
    divCustomer.id = id;
    divCustomer.className = "customerItem"; //so we can add items to it

    return divCustomer;
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
            console.log(RetrieveCstmrItems());
            document.getElementById("orderZone").appendChild(CreateItem(RetrieveCstmrItems()[i].name, RetrieveCstmrItems()[i].ID, "orderItem"));
        }
    }

    //If there are no items in the order zone, display this text.
    if (document.getElementById("orderZone").children.length == 0)
        $("#orderZone").text("Drag item here to order");
}

function LoadViewMultipleCustomer(){
    //If there are more than one customer, this needs to be presented visually.
    for (i = 0; i < RetrieveAllCustomers().length; i++) {
        document.getElementById("orderZone").appendChild(CreateCustomer(RetrieveAllCustomers()[i].cstmrName, RetrieveAllCustomers()[i].ID));
        var customerId = RetrieveAllCustomers()[i].ID; //console.log(customerId + " customer list length: " + RetrieveAllCustomers().length);
        console.log("customer ID: " + customerId);

        for (j = 0; j < RetrieveCstmrItems(customerId).length; j++){
            console.log(RetrieveCstmrItems(customerId));
            var addElementTo = $(".customerItem#" + customerId) //first find the ones with customer class, then identify with ID
            addElementTo.append(CreateItem(RetrieveCstmrItems(customerId)[j].name, RetrieveCstmrItems(customerId)[j].ID, "orderItem"));
        }
    }//https://stackoverflow.com/questions/9681601/how-can-i-count-the-number-of-elements-with-same-class
}


$(document).ready(function () {
    var menuZone = document.getElementById("menuZone");
    var orderZone = document.getElementById("orderZone");
    var customerZone = document.getElementsByClassName("addNewCustomer")[0]; //since there is only 1 anyway

    //Subscribing functions to the drag drop events:
    menuZone.addEventListener("dragover", (event) => {event.preventDefault();} );
    menuZone.addEventListener("drop", Drop );
    orderZone.addEventListener("dragover", (event) => {event.preventDefault();} );
    orderZone.addEventListener("drop", Drop );
    customerZone.addEventListener("dragover", (event) => {event.preventDefault();} );
    customerZone.addEventListener("drop", Drop );

    //If is VIP, just hide the add customer part
    if (isVIP)
        $(".addNewCustomer").hide();

    //Fill up with some items.
    for (i = 0; i < 10; i++){
        const element = document.getElementById("menuZone");
        element.appendChild(CreateItem("Temp Item" + i, "cust_-1", "menuItem")); //-1 since it is basically unassigned atm
    }

    LoadView();
})
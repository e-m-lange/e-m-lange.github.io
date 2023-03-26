//The functions here are called by DragDropControl, and relate directly the DragDropOrderModel

function AddCustomer(customerName = "Crewmate") {
    var orderModel = []; //A new customer will have an empty order list.
    var customerToAdd = {ID: CstmrIdGenerator(), cstmrName: customerName, orders: orderModel}; //Create the customer object to add to the model.
    cstmrOrderListModel.push(customerToAdd); //Add said object to the model.

    return customerToAdd.ID;
}

function RemoveCustomer(customerID = "cust_0") {
    for (i = 0; i < cstmrOrderListModel.length; i++){
        if (cstmrOrderListModel[i].ID === customerID) {
            cstmrOrderListModel.splice(i, 1);
            ReassignIds(); //Mostly helps with organisation and keeping track of the orders.
            break;
        }
    }
}

//Purpose: Remove all customers from the list & add back the default customer.
function RemoveAllToDefault() {
    //Remove everything...
    cstmrOrderListModel.length = 0; //https://stackoverflow.com/questions/1232040/how-do-i-empty-an-array-in-javascript
    //Then add back the default customer.
    AddCustomer();
}

//Purpose: Remove all customers from the list.
function RemoveAll() {
    //Remove everything...
    cstmrOrderListModel.length = 0;
}

function EditCustomerName(customerID, newName = "Crewmate") {
    for (i = 0; i < cstmrOrderListModel.length; i++){
        if (cstmrOrderListModel[i].ID === customerID) {
            cstmrOrderListModel[i].cstmrName = newName;
            break;
        }
    }
}

//Purpose: Add the object that the user selected to
//the order list to the selected customer.
function AddItem(itemName, customerID = "cust_0") {
    var itemToAdd = { ID: ItemIdGenerator(customerID), name: itemName };
    cstmrOrderListModel.find(x => x.ID === customerID).orders.push(itemToAdd);
    return itemToAdd;
}

function RemoveItem(itemID, customerID = "cust_0") {
    var customer = cstmrOrderListModel.find(x => x.ID === customerID);

    for (i = 0; i < RetrieveCstmrItems(customerID).length; i++){
        if (customer.orders[i].ID === itemID){
            customer.orders.splice(i, 1); //https://stackoverflow.com/questions/5767325/how-can-i-remove-a-specific-item-from-an-array-in-javascript
            break;
        }
    }
}

function GetParentIDOfItem(itemID) {
    for (i = 0; i < cstmrOrderListModel.length; i++) {
        for (j = 0; j < cstmrOrderListModel[i].orders.length; j++) {
            if (cstmrOrderListModel[i].orders[j].ID === itemID) {
                return cstmrOrderListModel[i].ID;
            }
        }
    }
}

function ClearEmptyCustomer(customerID) {
    //If customer has no more items, remove that customer. Does this until 1 customer left (default)
    if (cstmrOrderListModel.length > 1 && RetrieveCstmrItems(customerID).length === 0)
    {
        RemoveCustomer(customerID);
    }
}

function ClearAllEmptyCustomers() {
    for (i = 0; i < cstmrOrderListModel.length; i++) {
        ClearEmptyCustomer(cstmrOrderListModel[i].ID);
    }
}

//Purpose: Retrieve the customer by their ID.
//Returns a cstmrOrderModel based on the ID.
function RetrieveCustomer(customerID = "cust_0") {
    var customer = null;
    customer = cstmrOrderListModel.find(x => x.ID === customerID);
    return customer;
}

//Purpose: Returns the whole model.
function RetrieveAllCustomers() {
    return cstmrOrderListModel;
}

//Purpose: Returns the total number of customers.
function TotalCstmrCount() {
    return cstmrOrderListModel.length;
}

function SumOfCstmrOrder(customer= "cust_0") {
    RetrieveCustomer(customer).orders; //INCOMPLETE need to know what the drink card will be...
}

//Purpose: Returns the order items of a given customer.
function RetrieveCstmrItems(customerID = "cust_0") {
    var items = cstmrOrderListModel.find(x => x.ID === customerID).orders;
    return items;
}

//Purpose: Returns a specific item from a specific customer.
function RetrieveCstmrSingleItem(itemID, customerID = "cust_0") {
    var orderItem = RetrieveCstmrItems(customerID).find(x => x.ID === itemID); //WILL NEED TO BE EDITED, WAITING FOR DRINK CARD
    return orderItem;
}

function RetrieveCstmrAllItems() {
    var allOrders = [];

    for (i = 0; i < TotalCstmrCount(); i++) {
        var customer = RetrieveAllCustomers()[i];
        for (j = 0; j < customer.orders.length; j++) {
            var order = JSON.parse(JSON.stringify(customer.orders[j]));
            allOrders.push(order);
        }
    }

    return allOrders;
}

//Purpose: Returns the total number of orders of a given customer.
function TotalCstmrOrderCount(customerID = "cust_0") {
    var itemCount = cstmrOrderListModel.find(x => x.ID === customerID).orders.length;
    return itemCount;
}

//Purpose: Replaces the current cstmrOrderListModel with a new cstmrOrderListModel;
function SetCstmrOrderListModelState(inputList) {
    cstmrOrderListModel = [];
    cstmrOrderListModel = JSON.parse(JSON.stringify(inputList));
}

//Purpose: Function drag and drop passes to undo redo manager.
function UndoRedoDragDrop(inputList) {
    SetCstmrOrderListModelState(inputList); //Replace the state. This is the main Undo Redo functionality for drag and drop.
}

function UndoRedoUnassigned(inputList) {
    SetUnassignedOrders(inputList);
}

//Purpose: Move all orders onto one customer, thus creating a single order.
function CreateSingleOrder() {
    var replacementList = RetrieveCstmrAllItems();
    RemoveAll();
    var replacementCstmrId = AddCustomer();
    RetrieveCustomer(replacementCstmrId).orders = replacementList;
    replacementList.forEach(x => x.ID = ItemIdGenerator(replacementCstmrId));
    ReassignIds();
}

//Purpose: Reassign IDs so that the orders are easier to organise.
function ReassignIds() {
    for (i = 0; i < RetrieveAllCustomers().length; i++) {
        if (!RetrieveCustomer("cust_" + i)) {
            RetrieveAllCustomers()[i].ID = CstmrIdGenerator();
            RetrieveAllCustomers()[i].orders.forEach(x => x.ID = ItemIdGenerator(RetrieveAllCustomers()[i].ID));
        }
    }
}

//Purpose: Generates the ID for the customer.
function CstmrIdGenerator() {
    var index = 0;
    var contains = false;

    do { //repeat this until the condition is met
        if (cstmrOrderListModel.find(x => x.ID === "cust_" + index) != null){
            contains = true; //if the id already exists,
            index++;         //increase the number and repeat the process
        }
        else
            contains = false;
    } while (contains === true);

    return "cust_" + index; //e.g. cust_3
}

//Purpose: Generates ID for an order item. Has the customer ID as the prefix.
function ItemIdGenerator(customerID) {
    var index = 0;
    var contains = false;
    var listToCheck = cstmrOrderListModel.find(x => x.ID === customerID).orders;

    do { //repeat this until the condition is met
        if (listToCheck.find(x => x.ID === customerID + "_" + index) != null){
            contains = true; //if the id already exists,
            index++;         //increase the number and repeat the process
        }
        else
            contains = false;
    } while (contains === true);

    return customerID + "_" + index; //e.g. cust_0_1
}

function ItemIdGeneratorUnassigned() {
    var index = 0;
    var contains = false;
    var listToCheck = unassignedOrderModel.orders;

    do {
        if (listToCheck.find(x => x.id === unassignedOrderModel.ID + "_" + index)) {
            contains = true;
            index++;
        }
        else {
            contains = false;
        }
    } while (contains === true);

    return unassignedOrderModel.ID + "_" + index;
}

//Functions dealing with the unassigned model.
function AddItemToUnassigned(itemName) { //Will need, for example, drink item ID later.
    unassignedOrderModel.orders.push();
    var itemToAdd = { id: ItemIdGeneratorUnassigned(), name: itemName };
    unassignedOrderModel.orders.push(itemToAdd);

    return itemToAdd;
}

function RemoveItemFromUnassigned(itemID) {
    for (i = 0; i < unassignedOrderModel.orders.length; i++) {
        if (unassignedOrderModel.orders[i].id === itemID) {      //Find the item
            unassignedOrderModel.orders.splice(i, 1); //and remove it
        }
    }
}
function RetrieveUnassignedAll() {
    return unassignedOrderModel;
}

function RetrieveUnassignedOrders() {
    return unassignedOrderModel.orders;
}

function ClearUnassignedOrders() {
    for (i = unassignedOrderModel.orders.length - 1; i >= 0; i--) {
        unassignedOrderModel.orders[i].remove();
    }
}

function SetUnassignedOrders(input) {
    unassignedOrderModel = input;
}


//When an order has been made.
function PageCreateOrder() {
    var customerArr = RetrieveAllCustomers();
    var customerNameArr = []; //For CreateOrder, we need array of customer names.
    var orderArr = []; //For CreateOrder, we need arrays of beverage IDs.

    for (let i = 0; i < customerArr.length; i++) {
        var singleOrder = RetrieveCstmrItems(customerArr[i].ID);
        var singleOrderArr = [];
        for (let j = 0; j < singleOrder.length; j++) {
            singleOrderArr.push(parseInt(singleOrder[j].name)); //Store the beverage ID as int.
        }
        customerNameArr.push(customerArr[i].cstmrName); //Store the customer's name.
        orderArr.push(singleOrderArr);
    }

    CreateOrder(customerNameArr, orderArr);
}

//Purpose: Load the selected order into the drag drop model.
function LoadOrderIntoDragDropModel(orderId) {
    RemoveAll(); //Clear out the drag drop model completely.
    ResetUndoRedo();

    var customers = getCustomersOrder(getOrderfromOrders(orderId));
    var beverages = getBeveragesOrder(getOrderfromOrders(orderId));

    for (let i = 0; i < customers.length; i++) { //Add customer...
        var cstmrId = AddCustomer(customers[i]);
        for (let k = 0; k < beverages[i].length; k++) { //add each beverage to the customer.
            AddItem(beverages[i][k], cstmrId);
        }
    }
}

//Purpose: Calculate total price of drink id array (1 customer's orders).
function CalculatePricePerOrder(drinkArr) {
    var totalPrice = 0;

    for (let i = 0; i < drinkArr.length; i++) {
        totalPrice += getPriceBeverage(parseInt(drinkArr[i].name));
    }

    return totalPrice + "kr";
}

//Calculate the price of all orders from all customers.
function CalculateTotalPrice() {
    var allItems = RetrieveCstmrAllItems();
    var totalPrice = 0;

    for (let i = 0; i < allItems.length; i++) {
        totalPrice += getPriceBeverage(parseInt(allItems[i].name));
    }

    return totalPrice + "kr";
}
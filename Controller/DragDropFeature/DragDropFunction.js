//The functions here are called by DragDropControl, and relate directly the DragDropOrderModel

function AddCustomer(customerName = "customer"){
    var orderModel = []; //A new customer will have an empty order list.
    var customerToAdd = {ID: CstmrIdGenerator(), cstmrName: customerName, orders: orderModel}; //Create the customer object to add to the model.
    cstmrOrderListModel.push(customerToAdd); //Add said object to the model.

    return customerToAdd.ID;
}

function RemoveCustomer(customerID = "cust_0")
{
    for (i = 0; i < cstmrOrderListModel.length; i++){
        if (cstmrOrderListModel[i].ID == customerID) {
            const deleted = cstmrOrderListModel.splice(i, 1);
            break;
        }
    }

    //If only one customer, do some renaming if need be. Enables use of default values for parameters.
    if (cstmrOrderListModel.length == 1 && cstmrOrderListModel[0].ID != "cust_0") {
        var oldCustomer = cstmrOrderListModel[0];
        var replacementOrders = [];

        for (i = 0; i < oldCustomer.orders.length; i++){
            var orderItem = {ID: "cust_0" + oldCustomer.orders[i].ID.substring(6), name: oldCustomer.orders[i].name };
            replacementOrders.push(orderItem);
        }

        var replacementCustomer = {ID: "cust_0", cstmrName: oldCustomer.cstmrName, orders: replacementOrders}
        cstmrOrderListModel.pop();
        cstmrOrderListModel.push(replacementCustomer);
    }
}

//Purpose: Add the object that the user selected to
//the order list to the selected customer.
function AddItem(itemName, customerID = "cust_0"){
    var itemToAdd = { ID: ItemIdGenerator(customerID), name: itemName };
    cstmrOrderListModel.find(x => x.ID == customerID).orders.push(itemToAdd);
    return itemToAdd;
}

function RemoveItem(itemID, customerID = "cust_0"){
    var customer = cstmrOrderListModel.find(x => x.ID == customerID);

    for (i = 0; i < RetrieveCstmrItems(customerID).length; i++){
        if (customer.orders[i].ID == itemID){
            const deleted = customer.orders.splice(i, 1); //https://stackoverflow.com/questions/5767325/how-can-i-remove-a-specific-item-from-an-array-in-javascript
            break;
        }
    }

    if (cstmrOrderListModel.length > 1 && RetrieveCstmrItems(customerID).length == 0) //If customer has no more items, remove that customer. Does this until 1 customer left (default)
    {
        RemoveCustomer(customerID);
    }
}

//Purpose: Retrieve the customer by their ID.
//Returns a cstmrOrderModel based on the ID.
function RetrieveCustomer(customerID = "cust_0"){
    var customer = cstmrOrderListModel.find(x => x.ID == customerID);
    return customer;
}

//Purpose: Returns the whole model.
function RetrieveAllCustomers(){
    return cstmrOrderListModel;
}

//Purpose: Returns the total number of customers.
function TotalCstmrCount(){
    return cstmrOrderListModel.length;
}

//Purpose: Returns the order items of a given customer.
function RetrieveCstmrItems(customerID = "cust_0"){
    var items = cstmrOrderListModel.find(x => x.ID == customerID).orders;
    return items;
}

//Purpose: Returns the total number of orders of a given customer.
function TotalCstmrOrderCount(customerID = "cust_0"){
    var itemCount = cstmrOrderListModel.find(x => x.ID == customerID).orders.length;
    return itemCount;
}

//Purpose: Replaces the current cstmrOrderListModel with a new cstmrOrderListModel;
function SetCstmrOrderListModel(inputList){
    cstmrOrderListModel = [];
    cstmrOrderListModel = Object.assign(cstmrOrderListModel, inputList);
}

//Purpose: To remove the redundant undoredoobject when there is only one customer, otherwise user needs to click twice
function UndoRedoDragDrop(inputList, undoOrRedo)
{
    console.log(RetrieveAllCustomers());
    if (deepEqual(RetrieveAllCustomers(), inputList) && undoOrRedo == "undo")
        Undo();
    else if (deepEqual(RetrieveAllCustomers(), inputList) && undoOrRedo == "redo")
        Redo();
    else
        SetCstmrOrderListModel(inputList);
}

//Purpose: Generates the ID for the customer.
function CstmrIdGenerator()
{
    var index = 0;
    var contains = false;

    do { //repeat this until the condition is met
        if (cstmrOrderListModel.find(x => x.ID == "cust_" + index) != null){
            contains = true; //if the id already exists,
            index++;         //increase the number and repeat the process
        }
        else
            contains = false;
    } while (contains == true);

    return "cust_" + index; //e.g. cust_3
}

//Purpose: Generates ID for an order item. Has the customer ID as the prefix.
function ItemIdGenerator(customerID)
{
    var index = 0;
    var contains = false;
    var listToCheck = cstmrOrderListModel.find(x => x.ID == customerID).orders;

    do { //repeat this until the condition is met
        if (listToCheck.find(x => x.ID == customerID + "_" + index) != null){
            contains = true; //if the id already exists,
            index++;         //increase the number and repeat the process
        }
        else
            contains = false;
    } while (contains == true);

    return customerID + "_" + index; //e.g. cust_0_1
}

//Purpose: Check equality of objects, recursive solution. Source: https://dmitripavlutin.com/how-to-compare-objects-in-javascript/
function deepEqual(object1, object2) {
    const keys1 = Object.keys(object1);
    const keys2 = Object.keys(object2);
    if (keys1.length !== keys2.length) { //Of course if num of keys differ, not the same. And prevents issue of checking against one another if uneven number.
        return false;
    }
    for (const key of keys1) {
        const val1 = object1[key];
        const val2 = object2[key];
        const areObjects = isObject(val1) && isObject(val2);
        if (
            areObjects && !deepEqual(val1, val2) || //Will recurse until reach end of nest.
            !areObjects && val1 !== val2 //Once they are not of object type they can be compared.
        ) {
            return false;
        }
    }
    return true;
}
function isObject(object) { //To check if is object type.
    return object != null && typeof object === 'object';
}
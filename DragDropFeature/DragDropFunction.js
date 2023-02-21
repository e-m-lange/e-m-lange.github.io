function AddCustomer(customerName = "customer"){
    var orderModel = [];
    var customerToAdd = {ID: CstmrIdGenerator(), cstmrName: customerName, orders: orderModel};
    cstmrOrderListModel.push(customerToAdd);

    return customerToAdd.ID;
}

function RemoveCustomer(customerID = "cust_0")
{
    for (i = 0; i < cstmrOrderListModel.length; i++){
        if (cstmrOrderListModel[i].ID == customerID) {
            const deleted = cstmrOrderListModel.splice(i, 1);
            console.log("deleted customer");
            console.log(deleted);
            console.log(RetrieveAllCustomers());
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
        } //console.log(replacementOrders);

        var replacementCustomer = {ID: "cust_0", cstmrName: oldCustomer.cstmrName, orders: replacementOrders}
        cstmrOrderListModel.pop();
        cstmrOrderListModel.push(replacementCustomer);
    }
}

//Add the object that the user selected to
//the order list to the selected customer.
function AddItem(itemName, customerID = "cust_0"){
    console.log(cstmrOrderListModel);
    var itemToAdd = { ID: ItemIdGenerator(customerID), name: itemName };
    cstmrOrderListModel.find(x => x.ID == customerID).orders.push(itemToAdd);
}

function RemoveItem(itemID, customerID = "cust_0"){
    var customer = cstmrOrderListModel.find(x => x.ID == customerID);
    console.log(itemID);

    for (i = 0; i < RetrieveCstmrItems(customerID).length; i++){
        if (customer.orders[i].ID == itemID){
            const deleted = customer.orders.splice(i, 1); //https://stackoverflow.com/questions/5767325/how-can-i-remove-a-specific-item-from-an-array-in-javascript
            console.log(deleted);
            break;
        }
    }

    if (cstmrOrderListModel.length > 1 && RetrieveCstmrItems(customerID).length == 0) //If customer has no more items, remove that customer. Does this until 1 customer left (default)
    {
        RemoveCustomer(customerID);
        console.log("remove customer");
    }
}

//Retrieve the customer by their ID.
//Returns a cstmrOrderModel based on the ID.
function RetrieveCustomer(customerID = "cust_0"){
    var customer = cstmrOrderListModel.find(x => x.ID == customerID);
    return customer;
}

function RetrieveAllCustomers(){
    return cstmrOrderListModel;
}

function TotalCstmrCount(){
    return cstmrOrderListModel.length;
}

function RetrieveCstmrItems(customerID = "cust_0"){
    var items = cstmrOrderListModel.find(x => x.ID == customerID).orders;
    return items;
}

function TotalCstmrOrderCount(customerID = "cust_0"){
    var itemCount = cstmrOrderListModel.find(x => x.ID == customerID).orders.length;
    return itemCount;
}

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
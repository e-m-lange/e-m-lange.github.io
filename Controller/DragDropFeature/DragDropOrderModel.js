//Model of the current session. Used in the order pages.

//Default values.
const defaultCustomerID = "cust_0";
const defaultCustomerName = "Crewmate";
var currentOrderID;

//This will hold a list of the orders.
var orderModel = [];

//This represents 1 customer.
//cstmr = customer
var cstmrOrderModel = {
    ID: defaultCustomerID,
    cstmrName: defaultCustomerName,
    orders: orderModel, //each customer holds a list of their orders
    hasPaid: false, //if user has paid.
}

//This represents the list of customers.
//1 customer is the same as doing a group order, but once there are
//several customers there is the need to split them visually
var cstmrOrderListModel = [cstmrOrderModel], id; //id will be used to store a loaded order, not necessary before being sent and stored.

//OTHER:
//Will hold a temporary list of orders that are not assigned to any specific customer. Should not be saved in the final order!
var unassigned = [];

var unassignedOrderModel = {
    ID: "unassignedOrderModel",
    name: "Unassigned",
    orders: unassigned,
}
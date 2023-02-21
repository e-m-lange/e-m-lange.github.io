//Default values.
const defaultCustomerID = "cust_0";
const defaultCustomerName = "Customer";

//This will hold a list of the orders.
var orderModel = [];

//This represents 1 customer.
//cstmr = customer
var cstmrOrderModel = {
    ID: defaultCustomerID,
    cstmrName: defaultCustomerName,
    orders: orderModel, //each customer holds a list of their orders
}

//This represents the list of customers.
//1 customer is the same as doing a group order, but once there are
//several customers there is the need to split them visually
var cstmrOrderListModel = [cstmrOrderModel];
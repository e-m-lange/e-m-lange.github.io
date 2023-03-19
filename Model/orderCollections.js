// Returns all the order information
function allOrders(){
    var collector = [];

    for (i = 0 ; i < orders.length ; i++){
        collector.push(createInfoOrder(orders[i].transaction_id));
    }

    return sortOrders(collector);
}

// Custom sorting function
function compareOrders(a, b) {
    // Sort by time
    if (getTimeOrder(a) < getTimeOrder(b)) return -1;
    if (getTimeOrder(a) > getTimeOrder(b)) return 1;

    return 0;
}

//Return all the orders sorted by time
function sortOrders(orders) {  
    return orders.sort(compareUsers);
}

// Returns the orders not served yet
function PendingOrders() {
    var collector = [];
    var order = allOrders();

    for (i = 0; i < order.length; i++) {
        // We check if the order is served
        if (!getStatusOrder(order[i])) collector.push(order[i]);
    };

    return collector;
}

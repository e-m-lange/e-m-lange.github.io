function ManageStaffInventoryListeners(addFromMenuPage) {
    //Gather all inventory items.
    var items = document.getElementsByClassName("item");
    //Add the event listener.
    for (let i = 0; i < items.length; i++) {
        if (!addFromMenuPage) { //If not adding item to order (modified inventory page)
            if ( getCategoryUser(getIdConnected(parameters)) === 0 ) {//Show different popup based on user type.
                items[i].addEventListener("click", function (ev) {
                    document.body.getElementsByClassName("mainContent")[0].appendChild(PopUpStaff(parseInt(GetCardID(ev))));
                });
            }
            else if (getCategoryUser(getIdConnected(parameters)) === 1) { //Manager / Owner
                items[i].addEventListener("click", function (ev) {
                    document.body.getElementsByClassName("mainContent")[0].appendChild(PopUpManager(parseInt(GetCardID(ev))));
                });
            }
        }
        else { //Other if it is adding an item from inventory to the order.
            items[i].addEventListener("click", function (ev) {
                document.body.getElementsByClassName("mainContent")[0].appendChild(PopUpAddToOrder(parseInt(GetCardID(ev))));
            });
        }
    }
}

//Filter the id if need be.
function GetCardID(evItem) {
    var itemID = evItem.target;
    //Keep going until reach the card for the id as user may select the label instead of div.
    while (!itemID.classList.contains("item")) {
        itemID = itemID.parentElement;
    }
    itemID = itemID.id;
    //Remove the "RO_" to get just the beverage ID, "RO" standing for "Running Out".
    if (itemID.charAt(0) === "R") {
        itemID = itemID.slice(3);
    }

    return itemID;
}
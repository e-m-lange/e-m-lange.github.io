function CreateNavBar() {
    var orderNavTxtEl = createElement("label", {"class": "navItemTxt", "content": "textContent"});
    orderNavTxtEl.textContent = getString("navigation order");
    var orderNavDivEl = createElement("button", {"id": "orderNav", "class": "navItem", "onClick": "SelectNavItem(event)"}, [orderNavTxtEl]);

    var inventoryNavTxtEl = createElement("label", {"class": "navItemTxt", "content": "textContent"});
    inventoryNavTxtEl.textContent = getString("navigation inventory");
    var inventoryNavEl = createElement("button", {"id": "inventoryNav", "class": "navItem", "onClick": "SelectNavItem(event)"}, [inventoryNavTxtEl]);

    var VIPNavTxtEl = createElement("label", {"class": "navItemTxt", "content": "textContent"});
    VIPNavTxtEl.textContent = "VIP";
    var VIPNavEl = createElement("button", {"id": "vipNav", "class": "navItem", "onClick": "SelectNavItem(event)"}, [VIPNavTxtEl]);
    //--------------------------------------------------------------------------------------//
    var navBarEl = createElement("div", {"id": "navBar"}, [orderNavDivEl, inventoryNavEl, VIPNavEl]);

    return navBarEl;
}

//Purpose: Called when an item on the navigation bar is selected.
function SelectNavItem(ev) {
    var selectedId = null; //Reset.

    //If just sending a string, can be 'orderNav', 'inventoryNav', or 'vipNav'.
    if (typeof ev === 'string') {
        selectedId = ev;
    }
    //Otherwise if it is of type Event.
    else if (ev instanceof Event) {
        if (ev.target.id) {
            selectedId = ev.target.id;
        }
        else if (ev.target.parentElement.id) {
            selectedId = ev.target.parentElement.id;
        }
    }

    //Change the page accordingly.
    switch(selectedId) {
        case "orderNav":
            break;
        case "inventoryNav":
            ChangePage(3); //Load the staff inventory page.
            break;
        case "vipNav":
            break;
    }

    //Update the looks of the selected page on the navigation bar.
    if (selectedId)
        SetFocusedNav(document.getElementById(selectedId));
}

//Purpose: Change which item appears selected.
function SetFocusedNav(elToChange) {
    var lineEl = createElement("div", {"class": "horizLineNav"});

    //Clear the "selected" appearance of the nav items.
    var navItems = document.getElementsByClassName("navItem");
    for (i = 0; i < navItems.length; i++) {
        navItems[i].children[0].style.fontWeight = "unset";
        if (navItems[i].querySelector(".horizLineNav")){
            navItems[i].querySelector(".horizLineNav").remove();
        }
    }

    elToChange.querySelector(".navItemTxt").style.fontWeight = "bold";
    elToChange.append(lineEl);
}

//Purpose:
function UpdateNavigationLabels() {
    document.getElementById("orderNav").firstChild.textContent = getString("navigation order");
    document.getElementById("inventoryNav").firstChild.textContent = getString("navigation inventory");
}
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

function SelectNavItem(ev) {
    var selectedId = null;

    if (ev.target.id){
        selectedId = ev.target.id;
    }
    else if (ev.target.parentElement.id){
        selectedId = ev.target.parentElement.id;
    }

    if (selectedId)
        SetFocusedNav(document.getElementById(selectedId));
}

function SetFocusedNav(elToChange) {
    var lineEl = createElement("div", {"class": "horizLineNav"});

    //Clear the "selected" appearance of the nav items.
    var navItems = document.getElementsByClassName("navItem");
    for (i = 0; i < navItems.length; i++) {
        console.log(navItems[i]);
        navItems[i].children[0].style.fontWeight = "unset";
        if (navItems[i].querySelector(".horizLineNav")){
            navItems[i].querySelector(".horizLineNav").remove();
        }
    }

    elToChange.querySelector(".navItemTxt").style.fontWeight = "bold";
    elToChange.append(lineEl);
}
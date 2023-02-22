var isVIP = false;
function CreateMenuItems(){

}

function HoverOrderTab(ev){
    var rightColumn = document.getElementsByClassName("columnRight")[0];

    rightColumn.style.background = "transparent";

    //prevent unwanteds repetitions
    rightColumn.removeEventListener("mouseover", HoverOrderTab);
    rightColumn.removeEventListener("dragover", HoverOrderTab);
    document.getElementById("orderLabel").style.display = "none";

    setTimeout(function(){
        ev.target.style.transition = "background-color 250ms";
        rightColumn.style.background = "#B3D0AE";
    },250);

    setTimeout(function(){
        rightColumn.style.width = "40%";
    },300);

    setTimeout(function(){
        for (let x of rightColumn.children)
            x.style.display = "block";
        rightColumn.addEventListener("mouseleave", UnhoverOrderTab);
    }, 550);

    console.log("hovering");
}

function UnhoverOrderTab()
{
    var rightColumn = document.getElementsByClassName("columnRight")[0];
    rightColumn.removeEventListener("mouseleave", UnhoverOrderTab);

    setTimeout(function(){
        rightColumn.style.width = "5%";

        for (let x of rightColumn.children)
            x.style.display = "none";

        rightColumn.addEventListener("mouseover", HoverOrderTab);
        rightColumn.addEventListener("dragover", HoverOrderTab);
        document.getElementById("orderLabel").style.display = "block";
    }, 100);

    console.log("unhovering");
}

$(document).ready(function () {
    var menuZone = document.getElementById("menuZone");
    var orderZone = document.getElementById("orderZone");
    var customerZone = document.getElementsByClassName("addNewCustomer")[0]; //since there is only 1 anyway
    var rightColumn = document.getElementsByClassName("columnRight")[0];

    //Subscribing functions to the drag drop events:
    menuZone.addEventListener("dragover", (event) => {event.preventDefault();} );
    menuZone.addEventListener("drop", Drop );
    orderZone.addEventListener("dragover", (event) => {event.preventDefault();} );
    orderZone.addEventListener("drop", Drop );
    customerZone.addEventListener("dragover", (event) => {event.preventDefault();} );
    customerZone.addEventListener("drop", Drop );
    rightColumn.addEventListener("mouseover", HoverOrderTab);
    rightColumn.addEventListener("mouseleave", UnhoverOrderTab);
    rightColumn.addEventListener("dragover", HoverOrderTab);

    //If is VIP, just hide the add customer part
    if (isVIP)
        $(".addNewCustomer").hide();

    //Fill up with some items.
    for (i = 0; i < 10; i++){
        const element = document.getElementById("menuZone");
        element.appendChild(CreateItem("Temp Item" + i, "cust_-1", "menuItem")); //-1 since it is basically unassigned atm
    }

    UnhoverOrderTab();
    LoadView();
})
let changeLangAfterFunc = null; //Save the function to run when the language is changed.
function SetChangeLangAfterFunc(func) {
    changeLangAfterFunc = func;
}
function CreateMenuBar(userType = 0) { //Normal Customer = 0, VIP = 1, General Staff = 2, Owner = 3
    //Creating the html elements:

    var langBtnIconEl = createElement("div", {"id": "langBtnIcon"});
    var langBtnEl = createElement("button", {"id": "langBtn", "content": "textContent"});
    langBtnEl.textContent = parameters.lang;
    var langFlagIconEl = createElement("img", {"class": "langFlagIcon"});
    var langBtnContainerEl = createElement("div", {"id": "langBtnContainer", "onclick": "ShowLangDropDown()"}, [langFlagIconEl, langBtnEl, langBtnIconEl]);

    var langContainerEl = createElement("div", {"id": "langContainer"}, [langBtnContainerEl, CreateMenuBarItem()]);
    var loginBtnEl = createElement("button", {"id": "loginButton", "content": "textContent"});

    var menuBarEl = createElement("div", {"id": "menuBar"}, [loginBtnEl, langContainerEl]);
    SetLangIcon(langFlagIconEl);

    switch (userType){ //This will be used in the future as the different user types have different elements.
        case 2:
            break;
    }

    return menuBarEl;
}

//Create the items that are placed in the dropdown menu.
function CreateMenuBarItem() {
    var langDropDownEl;

    //If the dropdown element doesn't exist yet, make it, otherwise just change the language being displayed.
    if (document.getElementById("langDropDown") == null)
        langDropDownEl = createElement("div", {"id": "langDropDown", "content": "textContent"});
    else {
        langDropDownEl = document.getElementById("langDropDown");
        document.getElementById("langBtn").textContent = parameters.lang; //Since this function is called when language changes, this code is included here.
    }

    //Remove the children if there are any to make space for new child nodes.
    var childItems = document.getElementsByClassName("dropDownItem");
    while (childItems.length > 0){ //https://stackoverflow.com/questions/20044883/unable-to-remove-a-dom-element-using-javascript
        childItems[0].parentNode.removeChild(childItems[0]);
    }

    //Add the dropdown items (the languages).
    for (lang in languages) {
        //If it isn't the selected language...
        if (lang != parameters.lang){
            var item = createElement("div", {"class": "dropDownItem", "content": "textContent", "langType": lang});
            item.after('background: url("../jpg/DropDownArrowIcon.png")');
            item.textContent = languages[lang]["language"]; //We want to get all the languages.
            langDropDownEl.appendChild(item);
            //Make sure there is a function to attach as a listener.
            if (changeLangAfterFunc != null) { //If the function that should be run when a different language is selected is not empty.
                item.addEventListener("click", changeLangAfterFunc); //Make sure it is run when a different language is selected. Reload the menu items.
                var reloadFunc = function() {setTimeout(function() {CreateMenuBarItem(); ShowLangDropDown();}, 20)};
                item.addEventListener("click", reloadFunc); //Make sure it is run when a different language is selected. Reload the menu items.
            }
        }
        //Else if it is the selected language...
        else if (lang == parameters.lang){ //Just display it with no event listeners and a gray background.
            var deselected = createElement("div", {"class": "dropDownItem", "content": "textContent", "langType": lang, "style": "background: darkgray"});
            deselected.textContent = languages[lang]["language"];
            langDropDownEl.appendChild(deselected);
        }
    }
    //Hide the dropdown.
    langDropDownEl.style.display = "none";

    return langDropDownEl; //Returns to be attached.
}

//When the language button has been clicked, run this function.
function ShowLangDropDown() {
    var dropDown = document.getElementById("langDropDown");
    var icon = document.getElementById("langBtnIcon");

    //Changes if dropdown is visible or not depending on current state.
    switch (dropDown.style.display) {
        case("none"):
            dropDown.style.display = "block";
            icon.style.transform = "rotate(180deg)";
            document.getElementById("langContainer").style.boxShadow = "0px 5px 2px 0px rgba(0, 0, 0, 0.1)";
            break;
        case("block"):
            dropDown.style.display = "none";
            icon.style.transform = "rotate(0deg)";
            document.getElementById("langContainer").style.boxShadow = "0px 5px 2px 0px rgba(0, 0, 0, 0.0)";
            break;
    }

    SetLangIcon();
}

function SetLangIcon(flagIcon = document.getElementsByClassName("langFlagIcon")[0]) {

    switch (parameters.lang) {
        case("eng"):
            flagIcon.src = "jpg/EngFlagIcon.png";
            break;
        case ("fra"):
            flagIcon.src = "jpg/FraFlagIcon.png";
            break;
        case("indo"):
            flagIcon.src = "jpg/IndoFlagIcon.png";
            break;
    }
}
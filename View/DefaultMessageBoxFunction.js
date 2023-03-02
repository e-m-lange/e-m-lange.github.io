//Dispatch an event
var messageClosed;

function CreateMessageBox(message, allowInput = false){
    var overlayEl = createElement("div", {"id": "overlayAll"});

    var messBtnEl = createElement("button", {"id": "defMessBtn", "content": "textContent"});
    messBtnEl.textContent = "OK"; //Basic for the languages we have chosen.
    var messBtnContainEl = createElement("div", {"id": "defMessBtnContain"}, [messBtnEl]);

    var textEl = createElement("p", {"id": "defMessTxt", "content": "textContent"});
    textEl.textContent = message;
    var messTxtContainEl = createElement("div", {"style": "height: 35%"}, [textEl]);

    if (allowInput == false) //If we want to include a box for users to input something.
        var messBoxContainEl = createElement("div", {"id": "defMessBox"}, [messTxtContainEl, messBtnContainEl]);
    else {
        var inputBoxEl = createElement("input", {"id": "defMessInput"});
        var messBoxContainEl = createElement("div", {"id": "defMessBox"}, [messTxtContainEl, inputBoxEl, messBtnContainEl]);
        messageClosed = new CustomEvent("MessageClosedEv", {input: "Crewmate"});
    }

    var containerAllEl = createElement("div", {"id": "defMessBoxAll"}, [overlayEl, messBoxContainEl]);

    messBtnEl.addEventListener("mousedown", PressBtn);
    messBtnEl.addEventListener("mouseup", UnpressBtn);

    SetMessage(message);
    console.log("Create message");

    return containerAllEl;
}

function SetMessage(message = "Default message."){
    $(".messageTxt").text(message);
}

function PressBtn(ev){
    ev.target.style.transition = "background-color 250ms";
    ev.target.style.background = "#ffffff";

}
function UnpressBtn(ev){
    var messageBox = document.getElementById("defMessBoxAll");

    var input = document.getElementById("defMessInput").value;
    if (input && input.length > 0 && input.trim()) //Make sure it's valid before saving it.
        messageClosed.input = input; //To pass on the string user inputs so it can be saved.

    ev.target.style.transition = "background-color 500ms";

    setTimeout(function(){ //Keep button highlighted for a little longer after pressing.
        ev.target.style.background = "#ffffff";
    },400); //https://stackoverflow.com/questions/47892293/change-div-background-color-for-one-second-then-return-it-to-the-original-color

    setTimeout(function(){
        messageBox.style.transition = "opacity 0.2s linear";
        messageBox.style.opacity = "0";
    },200);

    setTimeout(function(){
        messageBox.style.display = "none";
        document.getElementById("defMessBox").dispatchEvent(messageClosed);
    },600); //waits until the other tasks above are done (400 + 300)

    setTimeout(function(){
        messageBox.remove();
    },650);

    //https://stackoverflow.com/questions/22581789/fade-in-fade-out-background-color-of-an-html-element-with-javascript-or-jquer
    //https://stackoverflow.com/questions/3331353/transitions-on-the-css-display-property
}
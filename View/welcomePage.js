function welcomePage (userType = 0) { //Normal Customer = 0, VIP = 1, General Staff = 2, Owner = 3
    //Creating the html elements for welcome page:

    // var container = createElement("button", {"id": "login"});
    // var btnModal = createElement("div", {"class":"modal-btns"});
    // var btnLogin = createElement("button", {"type":"submit", "class":"btn-login" , "id":"lBtn"});
    // var form1= createElement("form", {"id" : "formLogin", "method" : "post", "name" : "myform"} );
    //
    // var footer = createElement ("div", {"id":"swipeUp" , "class":"footer"});
    // var rectangel = createElement("div", {"class": "rectangular"});
    // var swipeText = createElement("p");
    // var contentSwipeUp = document.createTextNode ("Swipe Up");
    // document.getElementById("swipeUp").appendChild(swipeText);
    // // var noAccount = createElement("p");
    // var contentNoAccount = document.createTextNode ("if you do not have an account");
    // document.getElementById("noAccount").appendChild(noAccount);

    const welcomeText = createElement("h1",{"class":"welcome-container", "id":"header"});
    const aTag = createElement("a",{"href":"#ex1", "rel":"modal:open", "id":"sign"});
    const welcomeBtn = createElement("button",{"class":"welcome-btn" },[aTag]);
    const welcomeContainer = createElement("div",{"class":"welcome-container"},[welcomeText,welcomeBtn]);

    const welcomeP = createElement("p",{"id":"welcome"});
    const signText = createElement("p",{"id":"sign-welcome", "class":"sign-text"});
    const formWelcome = createElement("div", {"class":"form-welcome"},[welcomeP,signText]);


    const userName = createElement("label",{"for":"username","id":"username"});
    const br = createElement("br");
    const userInput = createElement("input", {"type":"text", "id":"username1", "name":"username", "value":"", "required":"true"});
    const password = createElement("label",{"for":"password","id":"password"});
    const passwordInput = createElement("input", {"type":"password", "id":"password1", "name":"password", "value":"", "required":"true"});
    const userPass = createElement("div", {"class":"userPass"},[userName,br,userInput,br,password,br,passwordInput]);
    const secondForm =createElement("form", {"id" : "formLogin", "method" : "post", "name" : "myform"},[userPass] );
    const button = createElement("button", {"type":"submit", "class":"btn-login" , "id":"lBtn"});
    const modalBtn = createElement("div", {"class":"modal-btns"},[button]);
    const mainForm = createElement("form",{"class":"form"},[formWelcome,secondForm,modalBtn]);
    const loginContainer = createElement("div",{"class":"login-container"},[mainForm]);
    const model = createElement("div",{"id":"ex1","class":"modal" },[loginContainer]);


    const welcome = createElement("div",{"class":"welcome"},[welcomeContainer,model]);


    const rectangular = createElement("div",{"class":"rectangular"});
    const swipe = createElement("p",{"id":"swipe"});
    const noAccount = createElement("p",{"id":"noAccount"});

    const swipeUp = createElement("div",{"id":"swipeUp" , "class":"footer"},[noAccount, swipe, rectangular]);

    const container = createElement("div", {"class":"container"}, [welcome,swipeUp]);

    return container;
};
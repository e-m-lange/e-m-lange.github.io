// function welcomePage (userType = 0) { //Normal Customer = 0, VIP = 1, General Staff = 2, Owner = 3
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

    // const welcomeText = createElement("h1",{"class":"welcome-container", "id":"header"});
    // const aTag = createElement("a",{"href":"#ex1", "rel":"modal:open", "id":"sign"});
    // const welcomeBtn = createElement("button",{"class":"welcome-btn" },[aTag]);
    // const welcomeContainer = createElement("div",{"class":"welcome-container"},[welcomeText,welcomeBtn]);
    //
    // const welcomeP = createElement("p",{"id":"welcome"});
    // const signText = createElement("p",{"id":"sign-welcome", "class":"sign-text"});
    // const formWelcome = createElement("div", {"class":"form-welcome"},[welcomeP,signText]);
    //
    //
    // const userName = createElement("label",{"for":"username","id":"username"});
    // const br = createElement("br");
    // const userInput = createElement("input", {"type":"text", "id":"username1", "name":"username", "value":"", "required":"true"});
    // const password = createElement("label",{"for":"password","id":"password"});
    // const passwordInput = createElement("input", {"type":"password", "id":"password1", "name":"password", "value":"", "required":"true"});
    // const userPass = createElement("div", {"class":"userPass"},[userName,br,userInput,br,password,br,passwordInput]);
    // const secondForm =createElement("form", {"id" : "formLogin", "method" : "post", "name" : "myform"},[userPass] );
    // const button = createElement("button", {"type":"submit", "class":"btn-login" , "id":"lBtn"});
    // const modalBtn = createElement("div", {"class":"modal-btns"},[button]);
    // const mainForm = createElement("form",{"class":"form"},[formWelcome,secondForm,modalBtn]);
    // const loginContainer = createElement("div",{"class":"login-container"},[mainForm]);
    // const model = createElement("div",{"id":"ex1","class":"modal" },[loginContainer]);
    //
    //
    // const welcome = createElement("div",{"class":"welcome"},[welcomeContainer,model]);
    //
    //
    // const rectangular = createElement("div",{"class":"rectangular"});
    // const swipe = createElement("p",{"id":"swipe"});
    // const noAccount = createElement("p",{"id":"noAccount"});
    //
    // const swipeUp = createElement("div",{"id":"swipeUp" , "class":"footer"},[noAccount, swipe, rectangular]);
    //
    // const container = createElement("div", {"class":"container"}, [welcome,swipeUp]);
    //
    // return container;
//};




    // Create necessary elements
    const container = document.createElement("div");
    container.classList.add("container");

    const welcome = document.createElement("div");
    welcome.classList.add("welcome");

    const welcomeContainer = document.createElement("div");
    welcomeContainer.classList.add("welcome-container");

    const header = document.createElement("h1");
    header.classList.add("welcome-text");
    header.id = "header";
    header.textContent = "string welcome page";

    const button = document.createElement("button");
    button.classList.add("welcome-btn");

    const link = document.createElement("a");
    link.href = "#ex1";
    link.rel = "modal:open";
    link.id = "sign";

    button.appendChild(link);

    const ex1 = document.createElement("div");
    ex1.id = "ex1";
    ex1.classList.add("modal");

    const loginContainer = document.createElement("div");
    loginContainer.classList.add("login-container");

    const form = document.createElement("form");
    form.classList.add("form");

    const formWelcome = document.createElement("div");
    formWelcome.classList.add("form-welcome");

    const welcomeParagraph = document.createElement("p");
    welcomeParagraph.id = "welcome";

    const signText = document.createElement("p");
    signText.classList.add("sign-text");
    signText.id = "sign-welcome";

    const formLogin = document.createElement("form");
    formLogin.id = "formLogin";
    formLogin.method = "post";
    formLogin.name = "myform";

    const userPass = document.createElement("div");
    userPass.classList.add("userPass");

    const usernameLabel = document.createElement("label");
    usernameLabel.htmlFor = "username";
    usernameLabel.id = "username";

    const usernameInput = document.createElement("input");
    usernameInput.type = "text";
    usernameInput.id = "username1";
    usernameInput.name = "username";
    usernameInput.value = "";
    usernameInput.required = true;

    const passwordLabel = document.createElement("label");
    passwordLabel.htmlFor = "password";
    passwordLabel.id = "password";

    const passwordInput = document.createElement("input");
    passwordInput.type = "password";
    passwordInput.id = "password1";
    passwordInput.name = "password";
    passwordInput.value = "";
    passwordInput.required = true;

    const modalBtns = document.createElement("div");
    modalBtns.classList.add("modal-btns");

    const loginButton = document.createElement("button");
    loginButton.type = "submit";
    loginButton.classList.add("btn-login");
    loginButton.id = "lBtn";

    // Append elements to the appropriate parents
    container.appendChild(welcome);
    welcome.appendChild(welcomeContainer);
    welcomeContainer.appendChild(header);
    welcomeContainer.appendChild(button);
    button.appendChild(link);
    container.appendChild(ex1);
    ex1.appendChild(loginContainer);
    loginContainer.appendChild(form);
    form.appendChild(formWelcome);
    formWelcome.appendChild(welcomeParagraph);
    formWelcome.appendChild(signText);
    form.appendChild(formLogin);
    formLogin.appendChild(userPass);
    userPass.appendChild(usernameLabel);
    userPass.appendChild(usernameInput);
    userPass.appendChild(passwordLabel);
    userPass.appendChild(passwordInput);
    form.appendChild(modalBtns);
    modalBtns.appendChild(loginButton);

    // Append the container to the body
    document.body.appendChild(container);

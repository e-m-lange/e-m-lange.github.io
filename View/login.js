$(document).ready(function() {
    var loginUsername;
    var loginPassword;

    document.getElementById("sign").innerHTML = "Login"
    document.getElementById("header").innerHTML = "Welcome to our ship";
    document.getElementById("welcome").innerHTML = "Welcome On Board";
    document.getElementById("sign-welcome").innerHTML = "Sign In";
    document.getElementById("username").innerHTML = "Username :";
    document.getElementById("password").innerHTML = "Password :";
    document.getElementById("lBtn").innerHTML = "Login";

    //Login form
    document.getElementById("username").innerHTML = "Username :";
    document.getElementById("password").innerHTML = "Password :";
    document.getElementById("lBtn").innerHTML = "Login";

    //Swipe up texts
    document.getElementById("swipe").innerHTML = "Swipe Up";
    document.getElementById("noAccount").innerHTML = "if you do not have an account";

    $('#lBtn').on('click', function() {
        var loginUsernameEntry = $("#username1").val();
        var loginPasswordEntry = $("#password1").val();
        $.getJSON("../databases/user.js", function(data){
            // console.log(data); // Prints: Harry
            loginUsername = data.find(item => item.username === loginUsernameEntry);
            loginPassword = data.find(item => item.password === loginPasswordEntry);

            if (loginUsernameEntry === loginUsername?.username && loginPasswordEntry === loginPassword?.password) {

                console.log("Current Username " + loginUsername.username);
                console.log("Current Password " + loginPassword.password);
                console.log("Logged In");
            } else {
                console.log("Attempted Username " + loginUsernameEntry);
                console.log("Attempted Password " + loginPasswordEntry);

                console.log("Login Failed");
            }

        }).fail(function(){
            console.log("An error has occurred.");
        });

    });
    const swipe = document.getElementById("swipeUp");
    swipe.addEventListener("click", swipeUp);

    function swipeUp() {
        alert("Button clicked!");
    }
    // welcomePage();
});

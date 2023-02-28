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

    $('#lBtn').on('click', function() {
        var loginUsernameEntry = $("#username1").val();
        var loginPasswordEntry = $("#password1").val();
        $.getJSON("../databases/VIP.json", function(data){
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

                console.log("Login Falied");
            };

        }).fail(function(){
            console.log("An error has occurred.");
        });

    });

});

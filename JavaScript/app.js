const model = {
    head: "Welcome On Board",
    message: "Swap If You Are Not a Member!!!",
};
//document.write("Swap if you are not a member!")
// View
const view = {
    displayMessage: function(message) {
        const messageElement = document.getElementById("message");
        messageElement.textContent = message;
    }
};

// Controller
const controller = {
    init: function() {
        this.displayWelcomeMessage();
        this.setUpEventListeners();
    },
    displayWelcomeMessage: function() {
        view.displayMessage(model.message);
    },
    setUpEventListeners: function() {
        const buttonElement = document.getElementById("btn");
        buttonElement.addEventListener("click", function() {
            view.displayMessage(model.message);
        });
    }
};

// Initialize the app
controller.init();

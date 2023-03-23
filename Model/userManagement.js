/**
 * Update the credits of a user in the database.
 * @param {number|object} user - The ID of the user or an user object.
 * @param {number} number - The number of credits to add or subtract from the user's account.
 */
function UpdateVIPCredits(user, number) {
    // If the parameter is an object, use it to find the ID
    if (typeof user === "object" ) user = getIdUser(user);
    
    // Find the user in the database
    const userIndex = accounts.findIndex(u => u.user_id == user);
    
    if (userIndex === -1) {
        console.log("Error: User ID not found");
        return;
    }

    // Validate the credit number
    if (typeof number !== "number") {
        console.log("Error: Invalid number");
        return;
    }

    // Convert creditSEK to a number
    let credits = parseFloat(accounts[userIndex].creditSEK);
    
    // Update the user's credits
    credits += number;
    accounts[userIndex].creditSEK = credits.toString();

    console.log("Updated credits:", accounts[userIndex].creditSEK);
}

// TO DO check login

// pb : the changes are not persistant in the database
console.log(accounts[0]);
UpdateVIPCredits(2, -400);
console.log(accounts[0]);

accounts[0].creditSEK=320;
console.log(accounts[0]);

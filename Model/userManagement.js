/*
 * Update the credits of a user in the database.
 * @param {number|object} user - The ID of the user or an user object.
 * @param {number} number - The number of credits to add or subtract from the user's account.
 */
function UpdateVIPCredits(user, number) {
    // Find the user in the database
    const index = getIndexfromUser(user);
    
    if (index === -1) {
        console.log("Error: User ID not found");
        return;
    }

    // Validate the credit number
    if (typeof number !== "number") {
        console.log("Error: Invalid number");
        return;
    }

    // Convert creditSEK to a number
    let credits = parseFloat(accounts[index].creditSEK);
    
    // Update the user's credits
    credits += number;
    accounts[userIndex].creditSEK = credits.toString();

    console.log("Updated credits:", accounts[index]);
}

// pb : the changes are not persistant in the database -> use JSON

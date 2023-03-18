// Return the object referenced by the id from the users database
function getUserfromUsers(user_id){
    var i=0;
    // Search for the corresponding id in the database
    while(user_id != users[i].user_id) i++;
    
    return users[i];
}

// Return the object referenced by the id from the accounts database
function getUserfromAccounts(user_id){
    var i=0;
    // Search for the corresponding id in the database
    while(user_id != accounts[i].user_id) i++;
    
    return accounts[i];
}

// Return the id of the user
function getIdUser(user){
    return user.user_id;
}

// Return the name of the user
function getNameUser(user){
    return user.first_name + " " + user.last_name;
}

// Return the username of the user
function getUsername(user){
    return user.username;
}

// Return the category of the user
function getCategoryUser(user){
    return Number(user.credentials) || user.category;
}

// Return the credit of the user
function getCreditUser(user){
    return Number(user.creditSEK);
}

// Return all informations relative to the user
// Used once to generate a proper user object, then use the object
function createInfoUser(user_id){
    var user = getUserfromUsers(user_id);
    var account = getUserfromAccounts(user_id);

    return { "user_id" : getIdUser(user),
        "name" : getNameUser(user),
        "username" : getUsername(user),
        "category" : getCategoryUser(user),
        "credit" : getCreditUser(account)
        } ;
}

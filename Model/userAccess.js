// Return the object referenced by the id from the users database
function getUserfromUsers(user_id){
    // Search for the corresponding id in the database by ChatGPT
    const person = users.find(user => user.user_id == user_id);
    
    return person;
}

// Return the index of the user in the user database from an object or an id
function getIndexfromUser(user){
    // If the parameter is an object, use it to find the ID
    if (typeof user === "object" ) user = getIdUser(user);
    return users.findIndex(x => x.user_id == user);
}

// Return the object referenced by the id from the accounts database
function getUserfromAccounts(user_id){
    // Search for the corresponding id in the database by ChatGPT
    const person = accounts.find(user => user.user_id == user_id);
    
    return person;
}

// Return the index of the user in the accounts database from an object or an id
function getIndexfromAccounts(user){
    // If the parameter is an object, use it to find the ID
    if (typeof user === "object" ) user = getIdUser(user);
    return accounts.findIndex(x => x.user_id == user);
}

// Return the id of the user from an object or an ID
function getIdUser(user){
    // If the parameter is a number, use it to find the user object by ID
    if (typeof user === 'number') user = getUserfromUsers(user);
    
    // Check if the parameter is a valid object with a user_id property
    if (typeof user !== 'object' || !user.hasOwnProperty('user_id')) {
        throw new Error('Invalid user object. Missing user_id property.');
    }

    return Number(user.user_id);
}

// Return the name of the user
function getNameUser(user){
    // If the parameter is a number, use it to find the user object by ID
    if (typeof user === 'number') user = getUserfromUsers(user);
    
    // Check if the parameter is a valid object with a name property
    if (typeof user !== 'object' || ((!user.hasOwnProperty('first_name') || !user.hasOwnProperty('last_name')) && !user.hasOwnProperty('name'))) {
        throw new Error('Invalid user object. Missing name property.');
    }

    return user.first_name + " " + user.last_name;
}

// Return the username of the user
function getUsername(user){
    // If the parameter is a number, use it to find the user object by ID
    if (typeof user === 'number') user = getUserfromUsers(user);
    
    // Check if the parameter is a valid object with a username property
    if (typeof user !== 'object' || !user.hasOwnProperty('username')) {
        throw new Error('Invalid user object. Missing username property.');
    }

    return user.username;
}

// Return the category of the user
function getCategoryUser(user){
    // If the parameter is a number, use it to find the user object by ID
    if (typeof user === 'number') user = getUserfromUsers(user);
    
    // Check if the parameter is a valid object with a category property
    if (typeof user !== 'object' || (!user.hasOwnProperty('category') && !user.hasOwnProperty('credentials'))) {
        throw new Error('Invalid user object. Missing category property.');
    }

    if (Number(user.credentials) === 0) { //Can have problems returning 0 as it is perceived as false, thus cater for this special case.
        return Number(user.credentials);
    }

    return Number(user.credentials) || user.category;
}

// Return the credit of the user
function getCreditUser(user){
    // If the parameter is a number, use it to find the user object by ID
    if (typeof user === 'number') user = getUserfromUsers(user);
    
    // Check if the parameter is a valid object with a creditSEK property
    if (typeof user !== 'object' || !user.hasOwnProperty('creditSEK')) {
        throw new Error('Invalid user object. Missing creditSEK property.');
    }

    return Number(user.creditSEK);
}

// Return all informations relative to the user
// Used to generate a proper user object
function createInfoUser(user_id){
    var user = getUserfromUsers(user_id);
    var account = getUserfromAccounts(user_id);

    return { "user_id" : getIdUser(user),
        "name" : getNameUser(user),
        "username" : getUsername(user),
        "category" : getCategoryUser(user),
        "creditSEK" : getCreditUser(account)
    } ;
}

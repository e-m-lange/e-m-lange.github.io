// Returns all the user information
function allUsers(){
    var collector = [];

    for (i = 0 ; i < users.length ; i++){
        collector.push(createInfoUser(users[i].user_id));
    }

    return sortUsers(collector);
}

// Custom sorting function
function compareUsers(a, b) {
    // Sort by name
    if (getNameUser(a) < getNameUser(b)) return -1;
    if (getNameUser(a) > getNameUser(b)) return 1;

    // If is the same name, sort by username
    if (getUsername(a) < getUsername(b)) return -1;
    if (getUsername(a) > getUsername(b)) return 1;

    return 0;
}

//Return all the users sorted by name and username
function sortUsers(users) {  
    return users.sort(compareUsers);
}

// Returns the VIP users
function VIPUsers() {
    var collector = [];
    var users = allUsers();

    for (i = 0; i < users.length; i++) {
        // We check if the user is VIP
        if (getCategoryUser(users[i]) == 3) collector.push(users[i]);
    };

    return collector;
}


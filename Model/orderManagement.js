// Modify the credits of the user
function Updatecredits(user_id, number){
    var i=0;
    // Search for the corresponding id in the database
    while(user_id != users[i].user_id) i++;
    
    // modify the credits number
    accounts[i].creditSEK = accounts[i].creditSEK + number;
}

//delete order older that 24h
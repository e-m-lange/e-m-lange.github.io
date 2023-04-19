// Return the id of the user connected
function getIdConnected(parameters){
    return Number(parameters.user_id) || undefined;
}

// Return language settings
function getLanguage(parameters){
    return parameters.lang || "eng";
}
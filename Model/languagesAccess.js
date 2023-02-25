//Return the string in the language set defined by its id in the database
function getString(id){
    var lang = parameters.lang;
    return languages[lang][id];
}
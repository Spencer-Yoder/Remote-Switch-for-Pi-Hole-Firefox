//Function that saves the key to storage
function setStorage(){
    browser.storage.local.set({api_key: document.getElementById("api_key").value}).then(setSuccess, storageError);  //Save the key to storage
}

//Function that sets save confirmation status on screen
function setSuccess() {
    document.getElementById("confirmation_status").innerHTML = "Saved Successful!";
}

//Function if the save was not successful 
function storageError(error) {
    document.getElementById("confirmation_status").innerHTML = "Saving Error!";
}

//Function that get the API key from the storage
function getStorage(){
    var getting = browser.storage.local.get("api_key"); //try and get the key
    getting.then(setCurrentChoice, storageError);   //decide on what action to go with
}

function setCurrentChoice(result) { 
    document.getElementById("api_key").defaultValue = result.api_key    //Set current Key in the input box
}

document.getElementById("save_button").addEventListener("click", setStorage);   //Action event for when save is pressed
window.addEventListener("load", getStorage);    //Get the API key when the page loads

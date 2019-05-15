var API_KEY = null; //Temporary variable for the API-Key 

//Function called after the enable/disable button is pressed.
function buttonClicked(){
    var httpResponse = new XMLHttpRequest();    //Make a new object to accept return from server
    var url = null; 

    if(document.getElementById("button1").value == "Disable"){  //If the Pi-Hole is currently ENABLED
        var time = document.getElementById("time").value;   //get the time from the box
        time = time * 60;   //get it in minutes
        url = "http://pi.hole/admin/api.php?disable=" + String(time) + "&auth=" + API_KEY;  //build the url
    }

    else if(document.getElementById("button1").value == "Enable"){  //If the Pi-Hole is currently DISABLED
        url = "http://pi.hole/admin/api.php?enable&auth=" + API_KEY;    //build the url
    }

     httpResponse.addEventListener("load", setStatus);  //add listener for the xmlResponse
     httpResponse.addEventListener("error", statusError);    //add listener to error
     httpResponse.open("GET", String(url)); //Open a get request
     httpResponse.send();   //Send it to the server
}

//Function that gets the current status of the Pi-Hole
function getPiHoleStatus(){
    getStorage();   //get the API key from local storage

    var httpResponse = new XMLHttpRequest();    //make a new request object
    httpResponse.addEventListener("load", setStatus);   //add listener to the load
    httpResponse.addEventListener("error", statusError);    //add listener to error
    httpResponse.open("GET", "http://pi.hole/admin/api.php?");  //set up get
    httpResponse.send();    //send it to the server
}

//Function that sets the status of the Pi-Hole in the respective places
function setStatus () {
    var data = JSON.parse(this.response);   //parse the return JSON

    if(data.status == "disabled"){  //If the Pi-Hole status is disabled
        document.getElementById("display_status").innerHTML = "Disabled";   //Set the popup text
        document.getElementById("display_status").className = "disabled";   //changed the text color
        document.getElementById("button1").value = "Enable";    //change the button for enable
        document.getElementById("time").disabled = true;    //disable the time input box
        browser.browserAction.setBadgeText({text: "Off"});  //set the badge to off
    }

    else if (data.status == 'enabled') {    //If the Pi-Hole is enabled
        document.getElementById("display_status").innerHTML = "Enabled";    //Set the popup text
        document.getElementById("display_status").className = "enabled";    //set the text color
        document.getElementById("button1").value = "Disable";   //change the button text
        document.getElementById("time").disabled = false;   //turn on the input box
        browser.browserAction.setBadgeText({text: "On"});   //set badge text to on
    } 

    else{   //If there is an API key error
        document.getElementById("display_status").innerHTML = "API Error";    //Set the popup text
        document.getElementById("display_status").className = "disabled";    //set the text color
        document.getElementById("button1").value = "";   //change the button text
        document.getElementById("time").disabled = true;   //turn off the input box
        browser.browserAction.setBadgeText({text: ""});   //set badge text to empty
    }
}

//Function if there was a problem gettting the status
function statusError(){
    document.getElementById("display_status").innerHTML = "Not Connected";  //Change the display status
    browser.browserAction.setBadgeText({text: ""}); //Clear the icon badge
}

//Function thats the API key from local storage
function getStorage(){
    var getting = browser.storage.local.get("api_key"); //Call to get local storage
    getting.then(gatherStorage, getError);
}

//Function if there was an error getting the Key from storage
function getError(error) {
    console.log("Error" + error);
    document.getElementById("display_status").innerHTML = "No Key";
}

//Function if the storage recall was successful
function gatherStorage(result) { 
    API_KEY = result.api_key;   //Save in memory
}

document.getElementById("button1").addEventListener("click", buttonClicked);    //Action listener for button clicked


// Quick disable for 10 seconds
document.getElementById("quick-btn-1").addEventListener("click", function(){
    var httpResponse = new XMLHttpRequest();
    var url = null;

    if(document.getElementById("button1").value == "Disable") {
        var time = 10;
        url = "http://pi.hole/admin/api.php?disable=" + String(time) + "&auth=" + API_KEY;
    } else if(document.getElementById("button1").value == "Enable"){ 
        url = "http://pi.hole/admin/api.php?enable&auth=" + API_KEY;
    }

    httpResponse.addEventListener("load", setStatus);
    httpResponse.addEventListener("error", statusError);
    httpResponse.open("GET", String(url));
    httpResponse.send();
});

// Quick disable for 30 seconds
document.getElementById("quick-btn-2").addEventListener("click", function(){
    var httpResponse = new XMLHttpRequest();
    var url = null;

    if(document.getElementById("button1").value == "Disable") {
        var time = 30;
        url = "http://pi.hole/admin/api.php?disable=" + String(time) + "&auth=" + API_KEY;
    } else if(document.getElementById("button1").value == "Enable"){ 
        url = "http://pi.hole/admin/api.php?enable&auth=" + API_KEY;
    }

    httpResponse.addEventListener("load", setStatus);
    httpResponse.addEventListener("error", statusError);
    httpResponse.open("GET", String(url));
    httpResponse.send();
});

// Quick disable for 5 minutes
document.getElementById("quick-btn-3").addEventListener("click", function(){
    var httpResponse = new XMLHttpRequest();
    var url = null;

    if(document.getElementById("button1").value == "Disable") {
        var time = 5 * 60;
        url = "http://pi.hole/admin/api.php?disable=" + String(time) + "&auth=" + API_KEY;
    } else if(document.getElementById("button1").value == "Enable"){ 
        url = "http://pi.hole/admin/api.php?enable&auth=" + API_KEY;
    }

    httpResponse.addEventListener("load", setStatus);
    httpResponse.addEventListener("error", statusError);
    httpResponse.open("GET", String(url));
    httpResponse.send();
});

// Quick disable permanently
document.getElementById("quick-btn-4").addEventListener("click", function(){
    var httpResponse = new XMLHttpRequest();
    var url = null;

    if(document.getElementById("button1").value == "Disable") {
        var time = 0;
        url = "http://pi.hole/admin/api.php?disable=" + String(time) + "&auth=" + API_KEY;
    } else if(document.getElementById("button1").value == "Enable"){ 
        url = "http://pi.hole/admin/api.php?enable&auth=" + API_KEY;
    }

    httpResponse.addEventListener("load", setStatus);
    httpResponse.addEventListener("error", statusError);
    httpResponse.open("GET", String(url));
    httpResponse.send();
});





document.addEventListener("DOMContentLoaded", getPiHoleStatus); //When the page loads get the status
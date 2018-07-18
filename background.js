checkStatus();  //Get the current status when the browser opens
window.setInterval(checkStatus, 30000); //Keep checking every 30 seconds

//Get the current status
function checkStatus(){
    var httpResponse = new XMLHttpRequest();    //make a new request
    httpResponse.addEventListener("load", setStatus);   //add event listeners
    httpResponse.addEventListener("error", statusError);
    httpResponse.open("GET", "http://pi.hole/admin/api.php?");  //URL to pi hole
    httpResponse.send();
}

//function if the check returned data
function setStatus () {
    var data = JSON.parse(this.response);
    
    if(data.status == "disabled"){  //If disabled set badge
        browser.browserAction.setBadgeText({text: "Off"});
    }

    else if (data.status == 'enabled') {    //else turn on badge
        browser.browserAction.setBadgeText({text: "On"});
    }
}

//If error getting the status 
function statusError(){
    browser.browserAction.setBadgeText({text: ""});
}
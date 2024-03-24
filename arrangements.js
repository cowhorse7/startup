//display user's name
function displayUsername() {
    const displayEl = document.querySelector("#usertitle");
    const username = localStorage.getItem("username");
    if (username != null && username.length != 0) {
        displayEl.textContent = username + "'s Arrangements";
    }
}

//display local storage of images
function displayImage() {
    document.getElementById("hey").src = localStorage.getItem("arrangement");
}

//display websocket??? images under "community" label
//--can also get new rows to delete old(est) rows... somehow
setInterval(() => {
    const groupWall = document.querySelector("#sharables"); //perhaps issue is appending to the front without clearing data
    groupWall.innerHTML = 
        '<tr><td>Etta</td><td><img id="ye" width="700" height="500"></td></tr>' +
        groupWall.innerHTML;
}, 5000);

function onDOMContentLoad(event) {
    console.log(event);
    displayUsername();
    displayImage();
}

document.addEventListener("DOMContentLoaded", (event) => { onDOMContentLoad(event); });
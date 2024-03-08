//display user's name
function displayUsername() {
    const displayEl = document.querySelector("#usertitle");
    const username = localStorage.getItem("username");
    if (username != null && username.length != 0) {
        displayEl.textContent = username + "'s Arrangements";
    }
}

function onDOMContentLoad(event) {
    console.log(event);
    displayUsername();
}

document.addEventListener("DOMContentLoaded", (event) => { onDOMContentLoad(event); });
//display local storage of images
//display websocket??? images under "community" label

//ref simon "websocket" to get new rows going in the table
//--can also get new rows to delete old(est) rows
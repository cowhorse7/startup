function duplicate(element) {
    //clone object onto stickerboard space, then make the clone moveable
    element.cloneNode();
}

function displayUsername() {
    const displayEl = document.querySelector("#username");
    const username = localStorage.getItem("username");
    if (username != null && username.length != 0) {
        displayEl.textContent = username + "'s arrangement";
    }
}

function onDOMContentLoad(event) {
    console.log(event);
    displayUsername();
}

document.addEventListener("DOMContentLoaded", (event) => { onDOMContentLoad(event); });

function saveButton() {
    //if there is a username in ls,
    //onclick of save button
    //save an image of the stickerboard in local storage
    //potentially timestamp it, too (save the time of creation with the image)
}

function shareButton() {
    //if there is a username in ls
    //onclick of share button
    //send image to.. websocket??? along with username
    //potentially with timestamp as well
}
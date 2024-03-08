function duplicate(element) { //is this valid? if I call this function with an on-click, is it using the thing I clicked (as I expect)? How else can I reference the images?
    //clone object onto stickerboard space, then make the clone moveable
    const dupimg = element.cloneNode(true);
    const stickerboard = document.getElementById("stickerboard");//.appendChild(dupimg);
    const ctx = stickerboard.getContext("2d");
    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(dupimg, 0, 0);
    //create object (such as an array) that can keep track of the images and their locations
    }

function displayUsername() {
    const displayEl = document.querySelector("#usertitle");
    const username = localStorage.getItem("username");
    if (username != null && username.length != 0) {
        displayEl.textContent = username + "'s Arrangement";
    }
}

function onDOMContentLoad(event) {
    console.log(event);
    displayUsername();
    for(let flower of document.getElementsByClassName("flowers")) {
        flower.addEventListener("click", (event) => {duplicate(flower);}) //"flower" is equivalent to "event.target"
    }
}

document.addEventListener("DOMContentLoaded", (event) => { onDOMContentLoad(event); });

function saveButton() {
    //if there is a username in ls,
    if (username != null && username.length != 0) {
    //save an image of the stickerboard in local storage
    //potentially timestamp it, too (save the time of creation with the image)
    }
}

function shareButton() {
    //if there is a username in ls
    if (username != null && username.length != 0) {
    //send image to.. websocket??? along with username
    //potentially with timestamp as well
    }
}

function clearButton() {
    //empty the stickerboard of children/images
}
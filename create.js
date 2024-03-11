function duplicate(element) {
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
    const username = localStorage.getItem("username");
    if (username != null && username.length != 0) {
        //save the stickerboard in local storage--this save method pushes onto a stack [of canvases]
        const cv = document.getElementById("stickerboard").getContext("2d");
        cv.save();
    //potentially timestamp it, too (save the time of creation with the image)
    }
}

function shareButton() {
    //if there is a username in ls
    const username = localStorage.getItem("username");
    if (username != null && username.length != 0) {
        //save the stickerboard
        const cv = document.getElementById("stickerboard").getContext("2d");
        cv.save();
        //send image to.. websocket??? along with username
    //potentially with timestamp as well
    }
}

function clearButton() {
    //empty the stickerboard of children/images
    const cv = document.getElementById("stickerboard");
    const cvcx = cv.getContext("2d");
    cvcx.clearRect(0,0, cv.width, cv.height);
}
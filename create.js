
// let stickerboard = document.getElementById("stickerboard");
// let ctx = stickerboard.getContext("2d");
// stickerboard.width = window.innerWidth - 30; //not sure what these -nums are for
// stickerboard.height = window.innerHeight - 10;
// let stick_width = stickerboard.width;
// let stick_height = stickerboard.height;
// let imgs = [];
// let current_img_index = null;

function duplicate(element) {
    //clone object onto stickerboard space, then make the clone moveable
    const dupimg = element.cloneNode(true);
    const stickerboard = document.getElementById("stickerboard");
    const ctx = stickerboard.getContext("2d");
    //imgs.push(dupimg);
    ctx.drawImage(dupimg, 0, 0);
    //dupimg.onload = function() {drag();};
    
    //create object (such as an array) that can keep track of the images and their locations
    }

let ismouseinimg = function(x, y, img) {
    let img_left = img.x;
    let img_right = img.x + img.width;
    let img_top = img.y;
    let img_bottom = img.y + img.height;
    if (x > img_left && x < img_right && y > img_top && y < img_bottom){ return true; }
}

let mousedown = function(event) {
    event.preventDefault();
    let startX = parseInt(event.clientX);
    let startY = parseInt(event.clientY);
    let index = 0;
    for(let img of imgs) {
        if (ismouseinimg(startX, startY, img)) {
            console.log("yes"); //testing fill
            current_img_index = index;
        }
        else{ console.log("no");} //testing statement
        index++;
    }
}

stickerboard.onmousedown = mousedown;
   
let drag = function() {
    ctx.clearRect(0,0,stick_width, stick_height);
    for(let img of imgs) {
        ctx.fillStyle = img.color;
        ctx.fillRect(img.x, img.y, img.width, img.height);
    }
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
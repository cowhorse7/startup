// const stickerboard = document.getElementById("stickerboard");
// const ctx = stickerboard.getContext("2d");
var stickerboard, ctx;
var dupimg = new Image();
var isDraggable = false;
var currentX = 0;
var currentY = 0;

function duplicate(element) {
    //clone object onto stickerboard space, then make the clone moveable
    dupimg = element.cloneNode(true);
    stickerboard = document.getElementById("stickerboard");
    ctx = stickerboard.getContext("2d");
    currentX = stickerboard.width/2;
    currentY = stickerboard.height/2;
    ctx.imageSmoothingEnabled = false;
    dupimg.onload = function() {ctx.drawImage(dupimg, 0, 0);};
    ctx.onload = function(){ go(); };
    //create object (such as an array) that can keep track of the images and their locations
    }

function go() {
    mouseEvents();
    setInterval(function() { 
        clearButton();
        redraw(); 
    }, 1000/30); //not sure what this ratio is for..?
}

function redraw() {
    ctx.drawImage(dupimg, currentX-(dupimg.width/2), currentY-(dupimg.height/2));
}

function mouseEvents() {
    stickerboard.onmousedown = function(e) {
        var mouseX = e.pageX - this.offsetLeft;
        var mouseY = e.pageY - this.offsetTop;
        if (mouseX >= (currentX - dupimg.width/2) &&
            mouseX <= (currentX + dupimg.width/2) &&
            mouseY >= (currentY - dupimg.height/2) &&
            mouseY <= (currentY + dupimg.height/2)) {
            isDraggable = true;
        }
    };
    stickerboard.onmousemove = function(e) {
        if(isDraggable) {
            currentX = e.pageX - this.offsetLeft;
            currentY = e.pageY - this.offsetTop;
        }
    };
    stickerboard.onmouseup = function(e) {
        isDraggable = false;
    };
    stickerboard.onmouseout = function(e) {
        isDraggable = false;
    };
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
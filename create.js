

// stickerboard.width = window.innerWidth - 30; //not sure what these -nums are for
// stickerboard.height = window.innerHeight - 10;
// let stick_width = stickerboard.width;
// let stick_height = stickerboard.height;

// let current_img_index = null;

(function() {
    var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
    window.requestAnimationFrame = requestAnimationFrame;
})();
var imgs = [];
function renderScene() {
    requestAnimationFrame(renderScene);
    let stickerboard = document.getElementById("stickerboard");
    let ctx = stickerboard.getContext("2d");
    ctx.clearRect(0,0,stickerboard.width,stickerboard.height);

    for(var x=0,len = imgs.length; x<len; x++) {
        var flower = imgs[x];
        flower.context.drawImage(flower.image,flower.x,flower.y);
    }
}

requestAnimationFrame(renderScene);

window.addEventListener("load",function(){
    let stickerboard = document.getElementById("stickerboard");
    stickerboard.onmousedown = function(e) {
        let startX = e.offsetX;
        let startY = e.offsetY;
        for(var x=0,len = imgs.length; x<len; x++) {
            var flower = imgs[x];
            if(!ismouseinimg(startX, startY,flower)) {
                continue;
            }
            startMove(flower,startX,startY);
            break;
        }
    }
},false);

function startMove(obj, startX, startY) {
    let stickerboard = document.getElementById("stickerboard");
    var origX = obj.x, origY = obj.y;
    stickerboard.onmousemove = function(e) {
        var moveX = e.offsetX, moveY = e.offsetY;
        var diffX = moveX-startX, diffY = moveY-startY;
        obj.x = origX+diffX;
        obj.y = origY+diffY;
    }
    stickerboard.onmouseup = function() {
        stickerboard.onmousemove = function(){};
    }
}

function ismouseinimg(x,y,obj){
    return !(x<obj.x || x>obj.x+obj.width || y<obj.y || y>obj.y+obj.height);
}

function allowDrop(e) {
    e.preventDefault();
}

function drag(e) {
    e.dataTransfer.setData("mouse_position_x", e.clientX-e.target.offsetLeft);
    e.dataTransfer.setData("mouse_position_y", e.clientY-e.target.offsetTop);
    e.dataTransfer.setData("flower_id", e.target.id);
}

function drop(e) {
    e.preventDefault();
    var flower = document.getElementById(e.dataTransfer.getData("flower_id"));
    var mouse_position_x = e.dataTransfer.getData("mouse_position_x");
    var mouse_position_y = e.dataTransfer.getData("mouse_position_y");
    let stickerboard = document.getElementById("stickerboard");
    let ctx = stickerboard.getContext('2d');
    //if(flower.offsetWidth===null) {flower.offestWidth=0;}
    imgs.push({
        context: ctx,
        image: flower,
        x: e.clientX-stickerboard.offsetLeft-mouse_position_x,
        y: e.clientY-stickerboard.offsetTop-mouse_position_y,
        width: flower.offsetWidth,
        height: flower.offsetHeight
    });
}

function convertCanvasToImage() {
    let stickerboard = document.getElementById("stickerboard");
    var flower_src = stickerboard.toDataURL("flower/png");
    window.open(flower_src);
}

function duplicate(element) {
    //clone object onto stickerboard space, then make the clone moveable
    
    const dupimg = element.cloneNode(true);
    //dupimg.addEventListener("click", (event) => {mousedown(event);});
    const stickerboard = document.getElementById("stickerboard");
    const ctx = stickerboard.getContext("2d");
    ctx.drawImage(dupimg, 0, 0);
    
    //create object (such as an array) that can keep track of the images and their locations
    }

// function ismouseinimg(x, y, img) {
//     let img_left = img.x;
//     let img_right = img.x + img.width;
//     let img_top = img.y;
//     let img_bottom = img.y + img.height;
//     if (x > img_left && x < img_right && y > img_top && y < img_bottom){ return true; }
// }
// function mousedown (event) {
//     console.log("clicked");
//     event.preventDefault();
//     let startX = parseInt(event.clientX);
//     let startY = parseInt(event.clientY);
//     let index = 0;
//     for(let img of imgs) {
//         if (ismouseinimg(startX, startY, img)) {
//             console.log("yes"); //testing fill
//             current_img_index = index;
//         }
//         else{ console.log("no");} //testing statement
//         index++;
//     }
// }

//stickerboard.onmousedown = mousedown;

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
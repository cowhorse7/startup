var imagesOnCanvas = [];

function renderScene() {
    requestAnimationFrame(renderScene);

    var canvas = document.getElementById('stickerboard');
    var ctx = canvas.getContext('2d');
    ctx.clearRect(0,0,
        canvas.width,
        canvas.height
    );

    for(var x = 0,len = imagesOnCanvas.length; x < len; x++) {
        var obj = imagesOnCanvas[x];
        obj.context.drawImage(obj.image,obj.x,obj.y);
    }
}
requestAnimationFrame(renderScene);

window.addEventListener("load",function(){
    var canvas = document.getElementById('stickerboard');
    canvas.onmousedown = function(e) {
        var downX = e.offsetX,downY = e.offsetY;

        // scan images on canvas to determin if event hit an object
        for(var x = 0,len = imagesOnCanvas.length; x < len; x++) {
            var obj = imagesOnCanvas[x];
            if(!isPointInRange(downX,downY,obj)) {
                continue;
            }
            startMove(obj,downX,downY);
            break;
        }
    } 
},false);

function startMove(obj,downX,downY) {
    var canvas = document.getElementById('stickerboard');
    var origX = obj.x, origY = obj.y;
    canvas.onmousemove = function(e) {
        var moveX = e.offsetX, moveY = e.offsetY;
        var diffX = moveX-downX, diffY = moveY-downY;
        obj.x = origX+diffX;
        obj.y = origY+diffY;
    }
    canvas.onmouseup = function() {
        // stop moving
        canvas.onmousemove = function(){};
    }
}

function isPointInRange(x,y,obj) {
    return !(x < obj.x ||
            x > obj.x + obj.width ||
            y < obj.y ||
            y > obj.y + obj.height);
}

function allowDrop(e) {
    e.preventDefault();
}

function drag(e) {
    //store the position of the mouse relativly to the image position
    e.dataTransfer.setData("mouse_position_x",e.clientX - e.target.offsetLeft );
    e.dataTransfer.setData("mouse_position_y",e.clientY - e.target.offsetTop  );
    e.dataTransfer.setData("image_id",e.target.id);
}

function drop(e) {
    e.preventDefault();
    var image = document.getElementById( e.dataTransfer.getData("image_id") );
    var mouse_position_x = e.dataTransfer.getData("mouse_position_x");
    var mouse_position_y = e.dataTransfer.getData("mouse_position_y");
    var canvas = document.getElementById('stickerboard');
    var ctx = canvas.getContext('2d');
        
    imagesOnCanvas.push({
        context: ctx,  
        image: image,  
        x:e.clientX - canvas.offsetLeft - mouse_position_x,
        y:e.clientY - canvas.offsetTop - mouse_position_y,
        width: image.offsetWidth,
        height: image.offsetHeight
        });
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
    displayQuote();
}

document.addEventListener("DOMContentLoaded", (event) => { onDOMContentLoad(event); });

function saveButton() {
    //if there is a username in ls,
    const username = localStorage.getItem("username");
    if (username != null && username.length != 0) {
        saveImages();
    }
}

async function saveImages() {
    const date = new Date().toLocaleDateString();
    const canvas = document.getElementById('stickerboard');
    const image_src = canvas.toDataURL("image/png");
    const newImage = {image: image_src, date: date};
        try {
            const response = await fetch('/api/images', {
                method: 'POST',
                headers: {'content-type': 'application/json'},
                body: JSON.stringify(newImage),
            });
            const images = await response.json();
            localStorage.setItem("images", JSON.stringify(images));
        } catch {
            this.updateLocalImages(newImage);
        }
}

function updateLocalImages(newImage) {
    let images = [];
    const imageText = localStorage.getItem('images');
    if (imageText) {
      images = JSON.parse(imageText);
    }
    images.push(newImage);
    if (images.length > 5) {
      images.length = 5;
    }
    localStorage.setItem('images', JSON.stringify(images));
  }

function shareButton() {
    //if there is a username in ls,
    const username = localStorage.getItem("username");
    if (username != null && username.length != 0) {
        shareImages();
    }
}

async function shareImages() {
    const username = localStorage.getItem("username");
    const date = new Date().toLocaleDateString();
    const canvas = document.getElementById('stickerboard');
    const image_src = canvas.toDataURL("image/png");
    const newImage = {image: image_src, date: date, name: username};
        try {
            const response = await fetch('/api/images', {
                method: 'POST',
                headers: {'content-type': 'application/json'},
                body: JSON.stringify(newImage),
            });
            const images = await response.json();
            localStorage.setItem("images", JSON.stringify(images));
        } catch {
            this.updateLocalImages(newImage);
        }
}

function clearButton() {
  imagesOnCanvas= [];
}

function displayQuote(data) {
    fetch('https://api.quotable.io/random')
      .then((response) => response.json())
      .then((data) => {
        const containerEl = document.querySelector('#quotebox');
  
        const quoteEl = document.createElement('p');
        quoteEl.classList.add('quote');
  
        quoteEl.textContent = data.content;
  
        containerEl.appendChild(quoteEl);
      });
  }
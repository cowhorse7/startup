import React from 'react';
import './create.css';
import bf1 from './blueFlower1.png';
import bf2 from './blueFlower2.png';
import bf3 from './blueFlower3.png';
import of1 from './orangeFlower1.png';
import of2 from './orangeFlower2.png';
import pf1 from './pinkFlower.png';
import pf2 from './pinkFlower2.png';
import yf1 from './yellowFlower1.png';
import yf2 from './yellowFlower2.png';

export function Create() {
let page = false;

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



React.useEffect((data) => {
  const displayEl = document.querySelector("#usertitle");
  const username = localStorage.getItem("username");
  if (username != null && username.length != 0) {
      displayEl.textContent = username + "'s Arrangement";}
    fetch('https://api.quotable.io/random')
      .then((response) => response.json())
      .then((data) => {
        const containerEl = document.querySelector('#quotebox');
  
        const quoteEl = document.createElement('p');
        quoteEl.classList.add('quote');
  
        quoteEl.textContent = data.content;
  
        containerEl.appendChild(quoteEl);
      });
    
      requestAnimationFrame(renderScene);
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
      return(()=>page=true);
  }, []);

  var imagesOnCanvas = [];

function renderScene() {
  console.log(page);
  if (!page){
    requestAnimationFrame(renderScene);

    var canvas = document.getElementById('stickerboard'); //file can't find the stickerboard
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
}

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

function clearButton() {
  imagesOnCanvas= [];
}



  return (
    <main>
      <div>
            <h2 id="usertitle">Guest's Arrangement</h2>
            <p>Drag flowers from the box onto the stickerboard</p>
            <div className="box" width="700">
                <img id="basicPink" draggable="true" onDragStart={(event)=> drag(event)} src={pf1} alt="basic pink"></img>
                <img id="thinYellow" draggable="true" onDragStart={(event)=> drag(event)} src={yf2} alt="thin yellow"></img>
                <img id="elegantBlue" draggable="true" onDragStart={(event)=> drag(event)} src={bf1} alt="elegant blue"></img>
                <img id="thinPink" draggable="true" onDragStart={(event)=> drag(event)} src={pf2} alt="thin pink"></img>
                <img id="sunYellow" draggable="true" onDragStart={(event)=> drag(event)} src={yf1} alt="sun yellow"></img>
                <img id="crownBlue" draggable="true" onDragStart={(event)=> drag(event)} src={bf2} alt="crown blue"></img>
                <img id="swirlBlue" draggable="true" onDragStart={(event)=> drag(event)} src={bf3} alt="swirl blue"></img>
                <img id="crownOrange" draggable="true" onDragStart={(event)=> drag(event)} src={of1} alt="crown orange"></img>
                <img id="basicOrange" draggable="true" onDragStart={(event)=> drag(event)} src={of2} alt="basic orange"></img>
            </div>
            <div id="buttons">
            <button type="submit" onClick={(event)=>clearButton()}>clear</button>            
            <button type="submit" onClick={(event)=>saveImages()}>save</button>
            </div>            
            <canvas id="stickerboard"  onDrop={(event) =>drop(event)} onDragOver={(event)=>allowDrop(event)} width="700" height="500">
                </canvas>
            <div id="quotebox"></div>
        </div>
    </main>
  );
}
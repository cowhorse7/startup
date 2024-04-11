//display user's name
function displayUsername() {
    const displayEl = document.querySelector("#usertitle");
    const username = localStorage.getItem("username");
    if (username != null && username.length != 0) {
        displayEl.textContent = username + "'s Arrangements";
    }
}

//user-saved image display. may need to be edited since copied from text-based app

async function loadImages() {
  let images = [];
    try {
      // Get the latest images from the service
      const response = await fetch('/api/images');
      images = await response.json();
  
      // Save the images in case we go offline in the future
      localStorage.setItem('images', JSON.stringify(images));
    } catch {
      // If there was an error then just use the last saved images
      const imageText = localStorage.getItem('images');
      if (imageText) {
        images = JSON.parse(imageText);
      }
    }
  
    displayImages(images);
  }
  
function displayImages(images) {
  const tableBodyEl = document.querySelector('#images');
  if (images) {
      // Update the DOM with the images
    for (const i of images) {
      const dateTdEl = document.createElement('td');
      const imageTdEl = document.createElement('td');
  
      dateTdEl.textContent = i.date;
      const img = document.createElement('img');
      img.src=i.image;
      imageTdEl.appendChild(img);
  
      const rowEl = document.createElement('tr');
      rowEl.appendChild(dateTdEl);
      rowEl.appendChild(imageTdEl);
  
      tableBodyEl.appendChild(rowEl);
    }
  } else {
    tableBodyEl.innerHTML = '<tr><td colSpan=2>No saved arrangements</td></tr>';
  }
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
    loadImages();
}

document.addEventListener("DOMContentLoaded", (event) => { onDOMContentLoad(event); });
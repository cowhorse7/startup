//display user's name
function displayUsername() {
    const displayEl = document.querySelector("#usertitle");
    const username = localStorage.getItem("username");
    if (username != null && username.length != 0) {
        displayEl.textContent = username + "'s Arrangements";
    }
}

//user-saved image display
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

function displayCommImages(images) {
  const tableBodyEl = document.querySelector('#sharables');
  if (commImages) {
      // Update the DOM with the images
    for (const i of commImages) {
      const dateTdEl = document.createElement('td');
      const nameTdEl = document.createElement('td');
      const imageTdEl = document.createElement('td');
  
      dateTdEl.textContent = i.date;
      nameTdEl.textContent = i.name;
      const img = document.createElement('img');
      img.src=i.image;
      imageTdEl.appendChild(img);
  
      const rowEl = document.createElement('tr');
      rowEl.appendChild(dateTdEl);
      rowEl.appendChild(nameTdEl);
      rowEl.appendChild(imageTdEl);
  
      tableBodyEl.appendChild(rowEl);
    }
  } else {
    tableBodyEl.innerHTML = '<tr><td colSpan=3>Be First to Share an Arrangement!</td></tr>';
  }
}
  

function configureWebSocket() {
  const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
  this.socket = new WebSocket(`${protocol}://${window.location.host}/ws`);
  // this.socket.onmessage = async (event) => {
  //   const msg = JSON.parse(await event.data.text());
  //   if (msg.type === GameEndEvent) {
  //     this.displayMsg('player', msg.from, `scored ${msg.value.score}`);
  //   } else if (msg.type === GameStartEvent) {
  //     this.displayMsg('player', msg.from, `started a new game`);
  //   }
  // };
}

function displaySocket(dt, nm, img) {
  const groupWall = document.querySelector('#sharables');
  groupWall.innerHTML =
    `<tr><td>${dt}</td><td>${nm}</td><td>${img}</td></tr>` + groupWall.innerHTML;
}

function onDOMContentLoad(event) {
    console.log(event);
    displayUsername();
    loadImages();
}

document.addEventListener("DOMContentLoaded", (event) => { onDOMContentLoad(event); });
import React from 'react';
import './arrangements.css';
import { Community } from './community';
import { Button } from 'react-bootstrap';
import { Wall } from './socket';

export function Arrangements() {
    const [images, setImages] = React.useState([]);
    //display user's name
    

//user-saved image display
React.useEffect(() => {
  const displayEl = document.querySelector("#usertitle");
    const username = localStorage.getItem("username");
    if (username != null && username.length != 0) {
        displayEl.textContent = username + "'s Arrangements";
    }
    fetch('/api/images')
    .then((response) => response.json())
    .then((images) => {
        setImages(images);
        // Save the images in case we go offline in the future
        localStorage.setItem('images', JSON.stringify(images));
    })
    .catch (() => {
      // If there was an error then just use the last saved images
      const imageText = localStorage.getItem('images');
      if (imageText) {
        setImages(JSON.parse(imageText));
      }
    });
}, []);

function shareImage(image){
  const username = localStorage.getItem("username");
  Wall.broadcastEvent(image.date, username, image.image);
}
  
const imageRows = [];
  if (images) {
      // Update the DOM with the images
    for (const [i, image] of images.entries()) {
      console.log(image);
        imageRows.push(
            <tr key={i}>
                <td>{image.date}<button type="submit" onClick={(event)=>shareImage(image)}>share</button>
</td>
                <td><img src={image.image}/></td>
            </tr>
        )
    }
  } else {
    imageRows.push(
        <tr key='0'>
            <td colspan='2'>No saved images yet</td>
        </tr>
    );
  }

  return (
    <main>
      <div>
            <h2 id="usertitle">Guest's Arrangements</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Canvas</th>
                        </tr>
                    </thead>
                    <tbody id="images">{imageRows}</tbody>
                </table>
            <Community/>
        </div>
    </main>
  );
}
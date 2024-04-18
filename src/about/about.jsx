import React from 'react';
import './about.css';
import flower from './flowerIcon.png';

export function About() {
  return (
    <main>
      <div>
        <p>
                Bouquet began as a class project with the hope of helping flower arrangements come to life.
                When brainstorming for the project, Rebecca was stressed about planning for her wedding, and 
                was thinking about her bouquet in particular. Because she didn't know much about flowers, 
                she decided to make an app to help her pull herself together and maybe help you do the same ;)
        </p>
        <img height="350px" src={flower} alt="a simple yellow flower with a green stem"/>
        </div>
    </main>
  );
}
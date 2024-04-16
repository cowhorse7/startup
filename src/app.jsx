import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';

export default function App() {
  return (
  <div className='body bg-dark'>
      <header>
            <h1>Bouquet<img height="120px" src="sparkles.png" alt="navy blue sparkles"/></h1>
            </header>
            <nav>
                <menu>
                    <li><a href="index.html">Home</a></li>
                    <li><a href="create.html">Create</a></li>
                    <li><a href="arrangements.html"> Arrangements</a></li>
                    <li><a href="about.html">About</a></li>
                </menu>
            </nav>
        <main>App comps go here</main>
        <footer>
            <span class = "text-reset">Rebecca Case &nbsp;</span>
            <a href="https://github.com/cowhorse7/startup">GitHub</a>
        </footer>
  </div>
  );
}
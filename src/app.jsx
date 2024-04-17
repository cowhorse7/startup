import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { Login } from './login/login';
import { Create } from './create/create';
import { Arrangements } from './arrange/arrangements';
import { About } from './about/about';
import { AuthState } from './login/authState';

function App() {
    const [username, setUserName] = React.useState(localStorage.getItem('username') || '');
    const currentAuthState = username ? AuthState.Authenticated : AuthState.Unauthenticated;
    const [authState, setAuthState] = React.useState(currentAuthState);
  
    return (
    <BrowserRouter>
        <div>
            <header>
            <h1>Bouquet<img height="120px" src="sparkles.png" alt="navy blue sparkles"/></h1>
            </header>
                <menu>
                    <li><NavLink to="">Login</NavLink></li>
                    <li><NavLink to="create">Create</NavLink></li>
                    <li><NavLink to="arrangements"> Arrangements</NavLink></li>
                    {/* {authState === AuthState.Authenticated && (<li><NavLink to="create">Create</NavLink></li>)}
                    {authState === AuthState.Authenticated && (<li><NavLink to="arrangements"> Arrangements</NavLink></li>)} */}
                    <li><NavLink to="about">About</NavLink></li>
                </menu>
            <Routes>
            <Route
            path='/'
            element={
              <Login
                username={username}
                authState={authState}
                onAuthChange={(username, authState) => {
                  setAuthState(authState);
                  setUserName(username);
                }}
              />
            }
            exact
          />  
          <Route path='/create' element={<Create />} />
          <Route path='/arrange' element={<Arrangements />} />
          <Route path='/about' element={<About />} />
          <Route path='*' element={<NotFound />} />
          </Routes>
        <footer>
            <span class = "text-reset">Rebecca Case &nbsp;</span>
            <a href="https://github.com/cowhorse7/startup">GitHub</a>
        </footer>
        </div>
    </BrowserRouter>
    );
}
function NotFound() {
    return <main className='container-fluid bg-secondary text-center'>404: Return to sender. Address unknown.</main>;
    }
export default App;
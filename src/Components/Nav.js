import React from 'react';
import {NavLink} from 'react-router-dom';

const Nav = () => (
  <nav className="main-nav">
    <ul className="main-nav">
      {/*<li><NavLink exact to="/">Home</NavLink></li>*/}
      <li><NavLink to="">Cats</NavLink></li>
      <li><NavLink to="">Dogs</NavLink></li>
      <li><NavLink to="">Computers</NavLink></li>
    </ul>    
  </nav>
);

export default Nav;
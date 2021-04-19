import React from 'react';
import {NavLink} from 'react-router-dom';

/** NavLink used to add styling to 'active' links */
const Nav = () => (
  <nav className="main-nav">
    <ul className="main-nav">
      <li><NavLink to="/cats">Cats</NavLink></li>
      <li><NavLink to="/dogs">Dogs</NavLink></li>
      <li><NavLink to="/computers">Computers</NavLink></li>
    </ul>  
  </nav>
);

export default Nav;
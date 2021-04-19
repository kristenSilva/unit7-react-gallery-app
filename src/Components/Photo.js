import React from 'react';

/**
 * Creates the individual photo components
 * @param {*} props 
 */
const Photo = props => (
  <li>
    <img src={props.url} alt=""/>
  </li>
);

export default Photo;
import React from 'react';

/** 
 * Component displayed if no searches were found given user query
 * Called in App.js within ternery conditional
 */
const NoMatch = () => (
  <li className='not-found'>
    <h3>Try a new search!</h3>
    <p>You search did not return any results. Please try again.</p>
  </li>
);

export default NoMatch;
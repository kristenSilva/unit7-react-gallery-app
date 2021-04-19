import React from 'react';
import { withRouter } from 'react-router-dom';
import NotFound from './NotFound';
import Photo from './Photo';

/**
 * Component displays all photos if results are avaiable otherwise `NotFound` component displayed
 * First conditional is for browser navigation
  * If the url in browser does not match the data displayed on page a new search is requested for 
  * url query
 * @param {*} props 
 */
const PhotoContainer = (props) => { 

  if(props.match.url.slice(8) !== props.title){
    props.onSearch(props.match.url.slice(8));
  }

  const results = props.data;
  let photos;
  if(results.length > 0){
    photos = results.map(photo =>
      <Photo
        url={`https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`} 
        key={photo.id}
      /> 
    );
  } else {
    photos = <NotFound/>
  }

  return(
    <div className="photo-container">
        <h2>Results: {props.title}</h2>
        <ul>
            {photos}
        </ul>
    </div> 
  );
}

export default withRouter(PhotoContainer);
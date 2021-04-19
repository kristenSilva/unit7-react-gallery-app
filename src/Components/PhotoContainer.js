import React from 'react';
import { withRouter } from 'react-router-dom';
import NoMatch from './NoMatch';
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
  let photos = results.map(photo =>
    <Photo
      url={`https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`} 
      key={photo.id}
    /> 
  );

  return(
    <div className="photo-container">
      {(props.loading) ? <p>Loading...</p> : 
        (results.length > 0 && !props.loading) ?
        <div>
          <h2>Results: {props.title}</h2>
          <ul>{photos}</ul>
        </div> :
        <NoMatch/>
      }
    </div> 
  );
}

export default withRouter(PhotoContainer);
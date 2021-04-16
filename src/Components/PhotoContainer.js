import React from 'react';
import NotFound from './NotFound';
import Photo from './Photo';

const PhotoContainer = props => { 
  
  const results = props.data;
  let photos = results.map(photo =>
    <Photo
      url={`https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`} 
      key={photo.id}
    /> 
  );
  return(
    <div className="photo-container">
        <h2>Results</h2>
        <ul>
            {/*Photos*/}
            {photos}
            <NotFound/>
        </ul>
    </div> 
  );
}

export default PhotoContainer;
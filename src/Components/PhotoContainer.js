import React from 'react';
import { withRouter } from 'react-router-dom';
import NotFound from './NotFound';
import Photo from './Photo';

const PhotoContainer = (props) => { 

  if(props.match.url.slice(8) !== props.title){
    props.onSearch(props.match.url.slice(8));
  }

  if(props.match.url === '/'){
    props.onSearch('sunsets');
    console.log('back to home');
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
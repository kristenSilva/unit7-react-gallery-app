import React, {Component} from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import apiKey from './config';

//import App components
import Nav from './Components/Nav';
import PhotoContainer from './Components/PhotoContainer';
import SearchForm from './Components/SearchForm';

class App extends Component {
  state = {
    photos: []
  }

  componentDidMount() {
    this.performSearch('dogs');
  }

  performSearch = (tag) => {
    fetch(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${tag}&per_page=24&format=json&nojsoncallback=1`)
    .then(res => res.json())
    .then(response => {
      this.setState({
        photos: response.photos.photo
      });
    })
    .catch(error => {
      console.log('Error fetching and parsing data', error);
    });
  }

  render(){
    return(
      <BrowserRouter>
        <h1>Hey!</h1>
        <SearchForm onSearch={this.performSearch}/>
        <Nav/>
        <PhotoContainer data={this.state.photos}/>
      </BrowserRouter>
    );
  }
}

export default App;

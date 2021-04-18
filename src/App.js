import React, {Component} from 'react';
import {BrowserRouter, Redirect, Route, Switch} from 'react-router-dom';
import apiKey from './config';

//import App components
import Nav from './Components/Nav';
import PhotoContainer from './Components/PhotoContainer';
import SearchForm from './Components/SearchForm';
import NotFound from './Components/NotFound';
import NoMatch from './Components/NoMatch';

class App extends Component {
  state = {
    photos: [],
    cats: [],
    dogs: [],
    computers: [],
    title: '',
    loading: true
  }

  componentDidMount() {
    this.performSearch();
    this.performSearch('cats');
    this.performSearch('dogs');
    this.performSearch('computers');
  }

  performSearch = (tag = 'sunsets') => {
    fetch(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${tag}&per_page=15&format=json&nojsoncallback=1`)
    .then(res => res.json())
    .then(response => {
      if(tag === 'cats'){
        this.setState({
          cats: response.photos.photo,
          loading: false
        })
      } else if (tag === 'dogs'){
        this.setState({
          dogs: response.photos.photo,
          loading: false
        })
      } else if (tag === 'computers'){
        this.setState({
          computers: response.photos.photo,
          loading: false
        })
      } else {
        this.setState({
          photos: response.photos.photo,
          title: tag,
          loading: false
        })
      }
    })
    .catch(error => {
      console.log('Error fetching and parsing data', error);
    });
  }

  render(){
    return(
      <BrowserRouter>
        <SearchForm onSearch={this.performSearch} tag={this.state.title}/>
        <Nav/>
        <Switch>
          <Route exact path='/' render={ () => 
            (this.state.loading) ? <p>Loading...</p> : <PhotoContainer 
              data={this.state.photos} title={this.state.title} onSearch={() => this.performSearch}/>} 
          />
          <Redirect from="/search/cats" to="/cats"/>
          <Route path='/cats' render={ () => 
            (this.state.loading) ? <p>Loading...</p> : <PhotoContainer 
              data={this.state.cats} title='Cats' onSearch={() => this.performSearch}/>} 
          />
          <Redirect from="/search/dogs" to="/dogs"/>
          <Route path='/dogs' render={ () => 
            (this.state.loading) ? <p>Loading...</p> : <PhotoContainer 
              data={this.state.dogs} title='Dogs' onSearch={() => this.performSearch}/>} 
          />
          <Redirect from="/search/computers" to="/computers"/>
          <Route path='/computers' render={ () => 
            (this.state.loading) ? <p>Loading...</p> : <PhotoContainer 
              data={this.state.computers} title='Computers' onSearch={() => this.performSearch}/>} 
          />
          <Route exact path='/search/:tag' render={ () => 
            (this.state.photos.length < 1) ? <NoMatch/>:
            (this.state.loading) ? <p>Loading...</p> : <PhotoContainer 
              data={this.state.photos} title={this.state.title} onSearch={this.performSearch}/>}
          />
          <Route component={NotFound} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;

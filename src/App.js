import React, {Component} from 'react';
import {BrowserRouter, Redirect, Route, Switch} from 'react-router-dom';
import apiKey from './config';

//import App components
import Nav from './Components/Nav';
import PhotoContainer from './Components/PhotoContainer';
import SearchForm from './Components/SearchForm';
import NotFound from './Components/NotFound';

/** App Class Component
 * Initializes state with pre-loads of tags defined by navigation buttons
 * Loads data when component is rendered
 */
class App extends Component {
  state = {
    photos: [],
    cats: [],
    dogs: [],
    computers: [],
    title: '',
    loading: true
  }

  //data fetched when App is rendered
  componentDidMount() {
    this.performSearch();
    this.performSearch('cats');
    this.performSearch('dogs');
    this.performSearch('computers');
  }

  /** `performSearch`
   * Data is fetched and parsed to JSON
   * Conditional to serach for query that matches one of the pre-loaded data sets
    * These matches are stored in corresponding `state` array
   * @param {string} tag - query that user inputs in search 
   */
  performSearch = (tag) => {
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

  handleLoading = (indicator) => {
    this.setState({loading: indicator});
  }
 
  render(){
    return(
      <BrowserRouter>
        <SearchForm onSearch={this.performSearch} tag={this.state.title} setLoading={this.handleLoading}/>
        <Nav/>
        <Switch>
          <Route exact path='/' render= { () => <Redirect to="/cats"/>} />
          <Redirect from="/search/cats" to="/cats"/>
          <Route exact path='/cats' render={ () => <PhotoContainer 
              data={this.state.cats} title='Cats' loading={this.state.loading} onSearch={() => this.performSearch}/>} 
          />
          <Redirect from="/search/dogs" to="/dogs"/>
          <Route exact path='/dogs' render={ () => <PhotoContainer 
              data={this.state.dogs} title='Dogs' loading={this.state.loading} onSearch={() => this.performSearch}/>} 
          />
          <Redirect from="/search/computers" to="/computers"/>
          <Route exact path='/computers' render={ () => <PhotoContainer 
              data={this.state.computers} title='Computers' loading={this.state.loading} onSearch={() => this.performSearch}/>} 
          />
          <Route exact path='/search/:tag' render={ () => <PhotoContainer 
              data={this.state.photos} title={this.state.title} loading={this.state.loading} onSearch={this.performSearch}/>}
          />
          <Route component={NotFound} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;

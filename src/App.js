import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

class App extends Component {

  // 1. Add a constructor to setup the component state
  constructor(props){
    super(props);
    this.state = {
      planetList: []
    }
  }

  // This is similar to jQuery's onReady
  // It is called by React when the component is loaded and ready to go!
  componentDidMount() {
    console.log('App component mounted');
    const url = 'https://swapi.co/api/planets/?format=json'
    this.getPlanets(url);
  }

  getPlanets(nextUrl) {
    if (nextUrl != null) {
      axios.get(nextUrl)
        .then((response)=> {
          console.log('Got more planets', response.data.results);
          this.setState( { planetList: 
            [ ...this.state.planetList, ...response.data.results]
          } );
          this.getPlanets(response.data.next)
          console.log('The next URL is:', nextUrl);
        })
        .catch((error) => {
          console.log('Error getting more planets', error)
        })
    }
  }

  render() {
    console.log('PlanetList:', this.state.planetList);
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">SWAPI Planets</h1>
        </header>
        <section>
          {/* 3. Put a unordered list of planet names here! */}
          <ul>
            { this.state.planetList.map( planet => 
              <li key={planet.url}>{planet.name}</li> ) 
            }
          </ul>
        </section>
      </div>
    );
  }
}

export default App;

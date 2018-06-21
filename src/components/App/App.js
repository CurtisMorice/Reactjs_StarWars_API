import React, { Component } from 'react';
import axios from 'axios';
import Header from '../Header/Header';
import PlanetList from '../PlanetList/PlanetList';
import People from '../People/People';
import './App.css';

class App extends Component {

  // 1. Add a constructor to setup the component state
  constructor(props){
    super(props);
    this.state = {
      planetList: [],
      peopleArray: [],
    }
  }

  // This is similar to jQuery's onReady
  // It is called by React when the component is loaded and ready to go!
  componentDidMount() {
    console.log('App component mounted');
    const url = 'https://swapi.co/api/planets/?format=json';
    const peopleUrl = 'https://swapi.co/api/people/?format=json'
    this.getPlanets(url);
    this.getPeople(peopleUrl);
  }
  
getPeople(peopleUrl) {
console.log(peopleUrl);
axios.get(peopleUrl)
.then((response)=>{
  this.setState({peopleArray:[...this.state.peopleArray, ...response.data.results]});
  if(response.data.next == null){
    console.log('Made it to last page',response.data.next);
  }
  else{
   this.getPeople(response.data.next);
  console.log(response.data);
  }
}).catch((error)=>{
  console.log('error in getPeople', error);
});
}




  async getPlanets(url) {
    let nextUrl = url;
    while (nextUrl != null) {
      await axios.get(nextUrl)
        .then((response)=> {
          console.log('Got more planets', response.data.results);
          this.setState( { planetList: 
            [ ...this.state.planetList, ...response.data.results]
          } );
          nextUrl = response.data.next;
          console.log('The next URL is:', nextUrl);
        })
        .catch((error) => {
          console.log('Error getting more planets', error)
          nextUrl = null;
        })
    }
  }

  render() {
    console.log('PlanetList:', this.state.planetList);
    return (
      <div className="App">
       <Header />
       <PlanetList array={this.state.planetList} />
        <People array={this.state.peopleArray} />
      </div>
    );
  }
}

export default App;

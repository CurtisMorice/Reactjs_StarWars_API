import React, { Component } from 'react';
import {BrowserRouter as Router, Link, Route} from 'react-router-dom';
import axios from 'axios';


import Header from '../Header/Header';
import Home from '../../pages/Home/Home';
import PlanetList from '../../pages/PlanetList/PlanetList';
import People from '../../pages/People/People';
import './App.css';
import Planets from '../../components/StarWars-Planets/StarWars-Planets';
import StarWarsPeople from '../StarWars-People/StarWars-People';

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
    // console.log('PlanetList:', this.state.planetList);
    return (
      <Router>
      <div className="App">
      <Header />
      <ul>
        <li><Link to='/'>Home</Link></li>
        <li><Link to={{pathname: '/people', state: {peopleArray: [...this.state.peopleArray]}}}>People</Link></li>
        <li><Link to={{pathname: '/planets', state: [...this.state.planetList]}}>Planets</Link></li>
      </ul>

        <Route exact path='/' component={Home} />
        <Route path='/people' component={People} />
        <Route path='/planets' render={(props)=> <Planets {...props}/>} />

       
      
      </div>
      </Router>
    );
  }
}

export default App;

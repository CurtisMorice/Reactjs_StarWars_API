import React, {Component} from 'react';
import { Route, Link } from 'react-router-dom';
import StarWarsPeople from '../../components/StarWars-People/StarWars-People';



const People = ({location, match, match: {url}}) => (
    
    <div>
          <ul>
         <li><Link to={`${url}/people`}>People</Link></li>
        </ul>
        {JSON.stringify(location)}
        {/* <StarWarsPeople array={location.state.people}/> */}
        </div>

);

export default People;
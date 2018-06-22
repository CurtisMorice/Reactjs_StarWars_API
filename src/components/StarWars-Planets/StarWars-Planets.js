import React from 'react';
import PlanetList from '../../pages/PlanetList/PlanetList';
import List from '../../pages/List/List';

class Planets extends Component{
    render(){
        return(
    <div>
    <section>
    
    <ul>
      { this.props.array.map( planet => 
        <List item={planet}/> ) }
    </ul>
</section>  
</div>
);
    }};


export default Planets;
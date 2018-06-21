import React, { Component } from 'react';
import List from '../List/List';

class PlanetList extends Component{

    render(){
return(
<section>
          {/* 3. Put a unordered list of planet names here! */}
          <ul>
            { this.props.array.map( planet => 
              <List item={planet}/> ) 
              
            }
          </ul>
        </section>  
    );
  }
}

export default PlanetList;
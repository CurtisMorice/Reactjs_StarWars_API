import React, {Component} from 'react';
import List from '../List/List';
class People extends Component {
    
    render(){
        return(
        
            <ul>
            { this.props.array.map( people => 
              <List item={people}/> ) 
              
            }
          </ul>

)

}

}

export default People;
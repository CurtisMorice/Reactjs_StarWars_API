import  React, { Component } from 'react';
import List from '../../pages/List/List';


class StarWarsPeople extends Component {
    render() {
        return (
            <div>
                {console.log('Thing', this.props.peopleArray)}
                <ul>
            { this.props.array.map( people => 
              <List item={people}/> ) 
              
            }
          </ul>
            </div>
        );
    }
}



export default StarWarsPeople;
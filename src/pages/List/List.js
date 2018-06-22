import  React, { Component } from 'react';


class List extends Component {
    render() {
        return (
            <div>

                <li key={this.props.item.url}>{this.props.item.name}</li>
            </div>
        );
    }
}



export default List;
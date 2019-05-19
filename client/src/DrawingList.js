import React, { Component } from 'react';
import {
    subscribeToDrawings,
} from './api';


class DrawingList extends Component {
    constructor(props) {
        super(props);
        subscribeToDrawings(this.fetchDrawings);
        this.state = {
            drawings: [],
        }
    }

    fetchDrawings = (drawing) => {
        this.setState(prevState => ({
            drawings: prevState.drawings.concat([drawing]),
        }))
    }

    render() {

        return (
            <ul className="DrawingList">
                {this.state.drawings.map(drawing => (
                    <li
                        className="DrawingList-item"
                        key={drawing.id}
                    >
                        {drawing.name}
                    </li>
                ))}
            </ul>
        );
    }
}

export default DrawingList;

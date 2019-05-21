import React, { useState, useEffect, Component } from 'react';
import Canvas from 'simple-react-canvas';
import { publishLine, subscribeToDrawingLines } from './api';

export const Drawing1 = ({ drawing }) => {
    
    const [lines, setLines] = useState([]);

    useEffect(() => {
        console.log(drawing)
        subscribeToDrawingLines(drawing.id, (line) => setLines([...lines, line]))
    }, [lines, drawing])

    // const updateLines = (line) => {
    //     setLines(
    //         [
    //             ...lines,
    //             line
    //         ]
    //     )
    // }

    const handleDraw = (line) => {
        publishLine({
            drawingId: drawing.id,
            line,
        })
    }
    
    return <div className="Drawing">
        <div className="Drawing-title">{drawing.name}</div>
        <Canvas 
            drawingEnabled={true}
            onDraw={handleDraw}
            lines={lines}
        />
    </div>
}

export class Drawing extends Component {
    state = {
        lines: [],
    }

    componentDidMount() {
        subscribeToDrawingLines(this.props.drawing.id, (linesEvent) => {
            this.setState((prevState) => {
                return {
                    lines: [...prevState.lines, ...linesEvent.lines],
                };
            });
        });
    }

    handleDraw = (line) => {
        publishLine({
            drawingId: this.props.drawing.id,
            line,
        });
    }

    render() {
        return (this.props.drawing) ? (
            <div
                className="Drawing"
            >
                <div className="Drawing-title">{this.props.drawing.name}</div>
                <Canvas
                    onDraw={this.handleDraw}
                    drawingEnabled={true}
                    lines={this.state.lines}
                />
            </div>
        ) : null;
    }
}

// export default Drawing;
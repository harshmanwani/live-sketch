import React, { useState, useEffect } from 'react';
import Canvas from 'simple-react-canvas';
// import CanvasDraw from "react-canvas-draw";
import { publishLine, subscribeToDrawingLines } from './api';

export const Drawing = ({ drawing, closeDrawing }) => {
    
    const [lines, setLines] = useState([]);

    useEffect(() => {
            subscribeToDrawingLines(drawing.id, updateLines)
    })

    const updateLines = (linesEvent) => {
        setLines(
            [
                ...lines, ...linesEvent.lines
            ]    
        )
    }

    const handleDraw = (line) => {
        publishLine({
            drawingId: drawing.id,
            line,
        })
    }

    // const defaultCanvas = {
    //     canvasWidth: '100vw',
    //     canvasHeight: '100vh',
    //     brushRadius: 8
    // }
    
    return <div className="Drawing">

        <div className="Drawing-title">
            <span>
                {drawing.name}
            </span>
            <span onClick={() => closeDrawing()} id="close-btn">
                [x]
            </span>
        </div>

        {/* <CanvasDraw
            {...defaultCanvas}
        /> */}


        <Canvas 
            drawingEnabled={true}
            onDraw={handleDraw}
            lines={lines}
        />
    </div>
}

// class Drawing2 extends Component {
//     state = {
//         lines: [],
//     }

//     componentDidMount() {
//         subscribeToDrawingLines(this.props.drawing.id, (linesEvent) => {
//             this.setState((prevState) => {
//                 return {
//                     lines: [...prevState.lines, ...linesEvent.lines],
//                 };
//             });
//         });
//     }

//     handleDraw = (line) => {
//         publishLine({
//             drawingId: this.props.drawing.id,
//             line,
//         });
//     }

//     render() {
//         return (this.props.drawing) ? (
//             <div
//                 className="Drawing"
//             >
//                 <div className="Drawing-title">{this.props.drawing.name}</div>
//                 <Canvas
//                     onDraw={this.handleDraw}
//                     drawingEnabled={true}
//                     lines={this.state.lines}
//                 />
//             </div>
//         ) : null;
//     }
// }

// export default Drawing;
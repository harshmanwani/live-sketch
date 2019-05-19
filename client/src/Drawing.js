import React from 'react';
import Canvas from 'simple-react-canvas';
import { publishLine } from './api';

export const Drawing = ({ drawing }) => {
    
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
        />
    </div>
}
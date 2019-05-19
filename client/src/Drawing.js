import React from 'react';
import Canvas from 'simple-react-canvas';

export const Drawing = ({ drawing }) => (
    <div className="Drawing">
        <div className="Drawing-title">{drawing.name}</div>
        <Canvas drawingEnabled={true}/>
    </div>
)
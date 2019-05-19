import React, { Component } from 'react';
import Canvas from 'simple-react-canvas';

export default Drawing = ({ drawing }) => (
    <div className="Drawing">
        <div className="Drawing-title">{drawing.name}</div>
        <Canvas drawingEnabled={true}/>
    </div>
)
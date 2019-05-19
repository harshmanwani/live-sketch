import openSocket from 'socket.io-client';
const socket = openSocket('http://localhost:8000');

/*
We're here subscribing to the timer event on server.
and publishing a subscribeToTimer event with the interval.

If emit first and then subscribe, client will start receiving response without subscribing.
So we setup the handler for timer event first and then emit the subscribing event

*/

function subscribeToDrawings(cb) {
    socket.on('drawing', cb);
    socket.emit('subscribeToDrawings');
}


function createDrawing(name) {
    socket.emit('createDrawing', { name });
}


 function publishLine({ drawingId, line }) {
    socket.emit('publishLine', { drawingId, ...line })
 }


 function subscribeToDrawingLines({ drawingId, cb }) {
    socket.on(`drawingLine:${drawingId}`, cb);
    socket.emit('subscribeToDrawingLines', drawingId);
 }


export {
    createDrawing,
    subscribeToDrawings,
    publishLine,
    subscribeToDrawingLines,
} 
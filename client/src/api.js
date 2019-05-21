import openSocket from 'socket.io-client';
import * as Rx from 'rxjs/Rx'
const socket = openSocket('http://localhost:8000');

/*
We're here subscribing to the timer event on server.
and publishing a subscribeToTimer event with the interval.

If emit first and then subscribe, client will start receiving response without subscribing.
So we setup the handler for timer event first and then emit the subscribing event

*/

function subscribeToDrawings(cb) {
    socket.on('drawing', drawing => cb(drawing));
    socket.emit('subscribeToDrawings');
}


function createDrawing(name) {
    socket.emit('createDrawing', { name });
}


 function publishLine({ drawingId, line }) {
    socket.emit('publishLine', { drawingId, ...line })
 }


 function subscribeToDrawingLines( drawingId, cb ) {

    const lineStream = Rx.Observable.fromEventPattern(
        h => socket.on(`drawingLine:${drawingId}`, h),
        h => socket.off(`drawingLine:${drawingId}`, h),
    )

    const bufferedTimeStream = lineStream
    .bufferTime(100)
    .map(lines => ({ lines }));

    bufferedTimeStream.subscribe(linesEvent => cb(linesEvent));

    socket.emit('subscribeToDrawingLines', drawingId);
 }


export {
    createDrawing,
    subscribeToDrawings,
    publishLine,
    subscribeToDrawingLines,
} 
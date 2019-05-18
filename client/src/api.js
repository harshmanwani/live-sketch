import openSocket from 'socket.io-client';
const socket = openSocket('http://localhost:8000');

/*
We're here subscribing to the timer event on server.
and publishing a subscribeToTimer event with the interval.

If emit first and then subscribe, client will start receiving response without subscribing.
So we setup the handler for timer event first and then emit the subscribing event

*/

function subscribeToTimer(cb) {
    socket.on('timer', timestamp => cb(timestamp));
    socket.emit('subscribeToTimer', 1000);
}

export default subscribeToTimer;
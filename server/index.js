const io = require('socket.io')();


/*
Socket works on events. We define actions based on the events trigger.
Here, on connection establishment we pass client info in a callback.
Which subscribes to an client-event named 'subscribeToTimer'. It also receives an interval
value from client, which we then use to emit an event to the client in that interval.

 client.on -> subscribe to an event
 client.emit -> push an event

*/

io.on('connection', (client) => {
    client.on("subscribeToTimer", (interval) => {
        console.log(`client is subscribing to timer with interval ${interval}`);
        setInterval(() => {
           client.emit('timer', new Date()) 
        }, interval);
    })
})

const port = 8000;
io.listen(8000);

console.log(`listening on port ${port}`)
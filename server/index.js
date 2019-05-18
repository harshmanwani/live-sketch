const io = require('socket.io')();
const r = require('rethinkdb');

//opens a new rethinkdb connection, returns a promise on success
r.connect({
    host: 'localhost',
    port: 28015,
    db: 'live_sketch',
}).then((connection) => {
    console.log(`connected to db ${connection.db}`);
    // console.log(connection);
    io.on('connection', (client) => {           // only accept new socket connections after rethinkdb connection
        client.on("subscribeToTimer", (interval) => {
            console.log(`client is subscribing to timer with interval ${interval}`);
            r.table('timers') //when client subscribes to this subscribeToTimer event, we open up a new query on rethinkdb
            .changes()          // and lookout (subscribe) for changes
            .run(connection)    // then run the query, passing it the connection from r.connect which returns a promise
            .then((cursor) => {
                cursor.each((err, timerRow) => {   // .each let's you know of every change and passes a callback
                    if(err) return console.log(err)
                    client.emit('timer', timerRow.new_val.timestamp);  // the row has the latest updated value on a property called new_val
                });
            });
        });
    });
});

/*
Socket works on events. We define actions based on the events trigger.
Here, on connection establishment we pass client info in a callback.
Which subscribes to an client-event named 'subscribeToTimer'. It also receives an interval
value from client, which we then use to emit an event to the client in that interval.

 .on -> subscribe to an event
 .emit -> publish an event

 io.on('connection', (client) => {
    client.on("subscribeToTimer", (interval) => {
        console.log(`client is subscribing to timer with interval ${interval}`);
        setInterval(() => {
           client.emit('timer', new Date())
        }, interval);
    })
})

*/

const port = 8000;
io.listen(8000);

console.log(`listening on port ${port}`)
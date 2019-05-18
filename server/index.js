const io = require('socket.io')();
const r = require('rethinkdb');

function createDrawing({ connection, name }) {
    r.table('drawings')
    .insert({
        name,
        timestamp: new Date()
    })
    .run(connection)
    .then(() => console.log(`Created a drawing with the name ${name}`))
}


function subscribeToDrawings({ client, connection }) {
    r.table('drawings')
    .changes({ include_initial: true })
    .run(connection)
    .then((cursor) => {
        cursor.each((err, drawingRow) => client.emit('drawing', drawingRow.new_val))
    })
}


r.connect({
    host: 'localhost',
    port: '28015',
    db: 'live_sketch'
}).then((connection) => {
    io.on('connect', (client) => {
        client.on('createDrawing', ({name}) => {
            createDrawing({ connection, name });
        });

        client.on('subscribeToDrawings', () => subscribeToDrawings({ 
            client, 
            connection 
        }));
    });
});

















const port = 8000;
io.listen(8000);

console.log(`listening on port ${port}`)

/*
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
*/

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
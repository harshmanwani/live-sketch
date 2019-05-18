const io = require('socket.io')();

const port = 8000;
io.listen(8000);

console.log(`listening on port ${port}`)
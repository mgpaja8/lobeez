const io = require('socket.io')();
const port = 8080;

io.listen(port);
console.log('Server listening on port: ', port);

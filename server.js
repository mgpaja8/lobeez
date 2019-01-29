const io = require('socket.io')();
const port = 1337;

io.on('connection', function(socket) {
  console.log('Socket connected', socket.id);

  emitSensorReading(socket, 'AC', 1, 100);

  emitSensorReading(socket, 'CO2', 60, 50);

  emitSensorReading(socket, 'Temperature', 10, 80);

  socket.on('disconnect', function () {
    console.log('Socket disconnected', socket.id);
  });
});

io.listen(port);
console.log('Server listening on port: ', port);

function emitSensorReading(socket, eventName, interval, maxValue) {
  socket.emit(eventName, getRandomInt(maxValue));

  setInterval(() => {
    socket.emit(eventName, getRandomInt(maxValue));
  }, interval * 1000);
} 

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

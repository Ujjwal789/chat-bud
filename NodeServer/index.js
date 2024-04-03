const http = require('http');
const io = require('socket.io');

// Create a simple HTTP server
const server = http.createServer((req, res) => {
  // Handle your HTTP requests here if needed
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Hello World!\n');
});

// Attach Socket.io to the HTTP server
const socketIoServer = io(server, {
  cors: {
    origin: 'http://127.0.0.1:5500', // Adjust this to your frontend server's URL
    methods: ['GET', 'POST'],
  },
});

const users = {};

socketIoServer.on('connection', socket => {
//   console.log('User connected:', socket.id);


  //if new user joined let other user  know it
  socket.on('new-user-joined', name => {
    // console.log("New user:", name);
    users[socket.id] = name;
    socket.broadcast.emit('user-joined', name);
  });

 //if someone send message brodcast to other people
socket.on('send', message => {
    socket.broadcast.emit('receive', { message: message, name: users[socket.id] });
  });

  //if user left let other user  know it
socket.on('disconnect', message => {
    socket.broadcast.emit('left', users[socket.id]);
    delete users[socket.id];
  });
  
});

const PORT = 8000;

server.listen(PORT, '127.0.0.1', () => {
  console.log(`Server is running on http://127.0.0.1:${PORT}`);
});

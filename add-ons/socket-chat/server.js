const io = require('socket.io')(3000)

const users = {}

io.on('connection', socket => {
  socket.on('new-user', uname => {
    users[socket.id] = uname
    socket.broadcast.emit('user-connected', uname)
  })
  socket.on('send-chat-message', message => {
    socket.broadcast.emit('chat-message', { message: message, uname: users[socket.id] })
  })
})
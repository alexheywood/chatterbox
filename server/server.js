console.log("server up and running...")

const io = require('socket.io')(3000, {
    cors: ["http://localhost:5173", "http://localhost:5174"]
})

io.on('connection', socket => {
    //print unique socket ID for each client
    console.log(socket.id)
    socket.on('addUser', (user) => {
        io.emit('updateUsers', user)
        console.log(user)
    })
    socket.on('sendMessage', (message) => {
        io.emit("receiveMessage", message)
        console.log(message)
    })

})

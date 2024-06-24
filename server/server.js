console.log("server up and running...")

const io = require('socket.io')(3000, {
    cors: ["http://localhost:5173", "http://localhost:5174", "http://localhost:5175"]
})

io.on('connection', socket => {
    //print unique socket ID for each client
    console.log(socket.id)


    socket.on('addUser', (user, room) => {

        console.log("user joined: " + user + " in room: " + room)
        socket.join(room)
        io.to(room).emit('updateUsers', user)
        io.to(room).emit('sendRoomList')
    })


    socket.on('removeUser', (user) => {
        console.log("user: " + user + " left room: " + room)
        io.to(room).emit('removeUser', user)
    } )

    socket.on('sendMessage', (message) => {
        console.log(message)
        io.to(message.room).emit("receiveMessage", message)
    })

    socket.on('sendDetails', (user, room) => {
        io.to(room).emit('updateUsers', user)
    })

})

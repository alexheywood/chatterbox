import { useCallback, useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from './components/NavBar';
import { SocketContext, socket } from './comms.js';
import Chat from './components/Chat.jsx';
import Home from './components/Home.jsx';

function App() {
  const [username, setUsername] = useState('')
  const [messages, setMessages] = useState([])
  const [count, setCount] = useState(0)
  const [registered, setRegistered] = useState(false)
  const [room, setRoom] = useState('')

  useEffect( () => {
    socket.on("connect", () => {
      console.log("You connected to chat server with id: " + socket.id)
  })
  setCount(messages.length)
  }, [])

  useEffect( () => { 
    socket.on("receiveMessage", (msg) => { addMessage(msg)})
    socket.on('sendRoomList', () => { sendPing ()})

  }, [socket])

  function sendPing() {

    socket.emit('sendDetails', username, room)
  }

  function registerUser(user, room) {

    setUsername(user)
    setRoom(room)
    setRegistered(true)
    setMessages([])
  }


  function logout() {
    setUsername("")
    setRoom("")
    setRegistered(false)
    setMessages([])
    socket.emit('removeUser', user)
  }


  function addMessage(newMessage) {
    console.log("adding message")
    if (count >= 10 ) {
      console.log("count is ten or greater")
        setMessages((prevMessages) => { 
            const newMessages = [...prevMessages.shift(), newMessage]
            setCount((prevCount) => prevCount++)
            return newMessages
        })
    }
    else {
        setMessages((prevMessages) => {
          console.log("under ten")
          console.log(count)
            const newMessages = [...prevMessages, newMessage]
            setCount((prevCount) => prevCount++)
            return newMessages
        })
    }
}

  return (
    <SocketContext.Provider value={socket}>
    <div className="bg-white">
    { registered ? <NavBar username={username} exit={logout}/> : null }
    { registered ? <Chat username={username} messages={messages} room={room}/> :
    <Home submit={registerUser}/> }
    </div>
    </SocketContext.Provider>
  )
}

export default App

import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import NavBar from "./components/NavBar";
import { SocketContext, socket } from "./comms.js";
import Chat from "./components/Chat.jsx";
import Home from "./components/Home.jsx";

function App() {
  const [username, setUsername] = useState("");
  const [registered, setRegistered] = useState(false);
  const [room, setRoom] = useState("");

  useEffect(() => {
    socket.on("connect", () => {
      console.log("You connected to chat server with id: " + socket.id);
    });

    return () => {
      socket.off("connect");
      socket.disconnect();
    };
  }, []);

  function registerUser(user, room) {
    setUsername(user);
    setRoom(room);
    setRegistered(true);
  }

  function logout() {
    setUsername("");
    setRoom("");
    setRegistered(false);
    socket.emit("removeUser", username, room);
  }

  // function addMessage(newMessage) {
  //   console.log("adding message");
  //   setMessages((prevMessages) => {
  //     const newMessages = [...prevMessages, newMessage];
  //     return newMessages;
  //   });
  // }

  return (
    <SocketContext.Provider value={socket}>
      <div className="bg-white">
        {registered ? <NavBar username={username} exit={logout} /> : null}
        {registered ? (
          <Chat username={username} room={room} />
        ) : (
          <Home submit={registerUser} />
        )}
      </div>
    </SocketContext.Provider>
  );
}

export default App;

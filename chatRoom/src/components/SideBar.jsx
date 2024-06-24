import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/esm/Container";
import { RiRadioButtonLine } from "react-icons/ri";
import { SocketContext } from "../comms";
import { useContext, useState, useEffect } from "react";

export default function SideBar(props) {
  const [userList, setUserList] = useState([]);



  const socket = useContext(SocketContext);

  useEffect( () => { 
    
  socket.on("updateUsers", (user) => { addUserToList(user)})
  socket.on("removeUser", (user) => {removeUser(user)})
  }, [socket])


  function removeUser(user) {
    console.log("user left chat: " + user)
    setUserList((prevList) => {
      const index = prevList.indexOf(user);
      return prevList.splice(index, 1)
    })
  }


  function addUserToList(user) {
    console.log("receiving user: " + user)
    setUserList((prevUserList) => [...prevUserList, user])
  }


  return (
    <Nav className="flex-column border rounded border bg-light w-100 h-fit">
      <Container className="my-3">
        <Nav.Item className="py-2">
          <strong>Current users in chat:</strong>
        </Nav.Item>
        {userList.map((user) => {
          return (
            <Nav.Item key={user}>
              <RiRadioButtonLine className="mx-2" color="green" />
              {user}
            </Nav.Item>
          );
        })}
      </Container>
    </Nav>
  );
}

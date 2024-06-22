import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/esm/Container';
import { RiRadioButtonLine } from "react-icons/ri";
import {SocketContext} from '../comms';
import { useContext, useState } from 'react';

export default function SideBar(props) {

  const [users, setUsers] = useState([])

  const socket = useContext(SocketContext)

  socket.on("updateUsers", (user) => {
    console.log("receiving user" + user)
    setUsers((prevUsers) => { [...prevUsers, user] })
  })


  return (
    <Nav className="flex-column border rounded border bg-light w-100 h-fit">
        <Container className="my-3">
        <Nav.Item className="py-2"><strong>Current users in chat:</strong></Nav.Item>
        {
            users.map( (user) => {
                return (<Nav.Item key={user}><RiRadioButtonLine className="mx-2" color="green"/>{user}</Nav.Item>)
            })
        }
        </Container>
    </Nav>
  );
}
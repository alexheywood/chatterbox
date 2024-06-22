import Container from 'react-bootstrap/Container'
import Navbar from 'react-bootstrap/Navbar'
import { RiChatSmile2Fill } from "react-icons/ri";

export default function NavBar(props) {

    return (
        <>
    <Navbar className="bg-body-tertiary">
          <Container fluid>
            <Navbar.Brand href="#home"><RiChatSmile2Fill className="mx-2" size="30" color="green"/>Chatterbox</Navbar.Brand>
            <Navbar.Toggle />
            <Navbar.Collapse className="justify-content-end">
              { props.username ? 
              <Navbar.Text>
              Chatting as: <strong>{props.username}</strong>
              <button onClick={props.exit} type="button" className="mx-2 btn btn-danger">Leave</button>
            </Navbar.Text>
            : null}
              
            </Navbar.Collapse>
          </Container>
        </Navbar>
        </>
    )
}
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/esm/Container";
import { RiRadioButtonLine } from "react-icons/ri";
import { SocketContext } from "../comms";
import { useContext, useState, useEffect } from "react";

export default function SideBar() {
  const [userList, setUserList] = useState([]);

  const socket = useContext(SocketContext);

  useEffect(() => {
    socket.on("updateUserList", (userList) => {
      setUserList(userList);
    });
    socket.on("removeUserFromList", (userList) => {
      setUserList(userList);
    });

    return () => {
      socket.off("updateUserList");
      socket.off("removeUserFromList");
    };
  }, [socket]);

  return (
    <Nav className="flex-column border rounded border bg-light w-100 h-fit">
      <Container fluid className="my-3">
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

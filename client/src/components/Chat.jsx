import SideBar from "./SideBar";
import Container from "react-bootstrap/esm/Container";
import MessageView from "./MessageView";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { RiChatThreadLine } from "react-icons/ri";
import { useState, useContext } from "react";
import { SocketContext } from "../comms";

export default function Chat({ username, users, room }) {

  return (
    <>
      <div id="chatroom">
        <Row>
          <Col sm={3}></Col>
          <Col sm={9}>
            <Container fluid className="text-center rounded w-100 mt-3 mb-0">
              <div className="bg-light border rounded">
                <strong>
                  <RiChatThreadLine size={30} />
                  {room}
                </strong>
              </div>
            </Container>
          </Col>
        </Row>
        <Container fluid className="p-1 my-1">
          <Row>
            <Col sm={3}>
              <SideBar users={users} />
            </Col>
            <Col sm={9}>
              <MessageView room={room} user={username} />
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}

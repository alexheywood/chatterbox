import { useState, useContext, useCallback, useEffect, useRef } from "react";
import Container from "react-bootstrap/esm/Container";
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";
import { SocketContext } from "../comms";

export default function MessageView({ user, room, messages }) {
  const socket = useContext(SocketContext);

  const message = useRef();

  useEffect(() => {
    message.current.focus();
  });

  function getCurrentTime() {
    const now = new Date();
    const hoursAndMinutes = now.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
    return hoursAndMinutes;
  }

  const submitMessage = useCallback((e) => {
    e.preventDefault();
    if (!message.current.value) {
      return;
    }

    const messageObject = {
      time: getCurrentTime(),
      user: user,
      message: message.current.value,
      room: room,
    };
    socket.emit("sendMessage", messageObject);
    message.current.value = "";
    message.current.focus();
  }, []);

  return (
    <>
      <div className="">
        <Container
          fluid
          className="overflow-auto flex"
          style={{ flexDirection: "column-reverse" }}
        >
          <ul className="list-group bg-light border" style={{ height: "70vh" }}>
            {messages.map((item) => {
              if (item.user === user) {
                return (
                  <li
                    key={item.time + item.user + item.message}
                    className="list-group-item bg-light"
                  >
                    <span className="badge rounded-pill text-bg-success">
                      {item.user}
                    </span>
                    : {item.message}{" "}
                    <small className="flex-end fw-light position-absolute mx-2 end-0">
                      {item.time}
                    </small>
                  </li>
                );
              } else {
                return (
                  <li
                    key={item.time + item.user + item.message}
                    className="list-group-item"
                  >
                    <span className="badge rounded-pill text-bg-primary">
                      {item.user}
                    </span>
                    : {item.message}{" "}
                    <small className="flex-end fw-light position-absolute mx-2 end-0">
                      {item.time}
                    </small>
                  </li>
                );
              }
            })}
          </ul>
        </Container>
        <Container fluid className="my-3">
          <form onSubmit={submitMessage}>
            <Row>
              <Col sm={10}>
                <div className="mb-3">
                  <input
                    ref={message}
                    type="text"
                    className="form-control"
                    id="exampleFormControlInput1"
                    placeholder="Type your message"
                  ></input>
                </div>
              </Col>
              <Col sm={2}>
                <button
                  type="submit"
                  onClick={submitMessage}
                  onSubmit={submitMessage}
                  className="btn btn-primary w-100"
                >
                  Send
                </button>
              </Col>
            </Row>
          </form>
        </Container>
      </div>
    </>
  );
}

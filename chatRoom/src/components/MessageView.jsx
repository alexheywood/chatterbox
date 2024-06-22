import { useState, useContext, useCallback } from "react";
import Container from "react-bootstrap/esm/Container";
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";
import { SocketContext } from "../comms";

export default function MessageView({ user, chat }) {
  const [message, setMessage] = useState("");

  const socket = useContext(SocketContext);

  function messageChange(e) {
    setMessage(e.target.value);
  }

  function getCurrentTime() {
    const now = new Date();
    const hoursAndMinutes = now.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
    return hoursAndMinutes;
  }

  const submitMessage = useCallback(() => {
    if (!message) {
      return;
    }

    const messageObject = {
      time: getCurrentTime(),
      user: user,
      message: message,
    };
    socket.emit("sendMessage", messageObject);
    setMessage("");
  }, [message]);

  return (
    <>
      <div className="">
        <Container className="overflow-auto">
          <ul className="list-group bg-light border" style={{ height: "70vh" }}>
            {chat.map((item) => {
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
            })}
          </ul>
        </Container>
        <Container className="my-3">
          <Row>
            <Col sm={10}>
              <div className="mb-3">
                <input
                  value={message}
                  onChange={messageChange}
                  type="text"
                  className="form-control"
                  id="exampleFormControlInput1"
                  placeholder="Type your message"
                ></input>
              </div>
            </Col>
            <Col sm={2}>
              <button
                type="button"
                onClick={submitMessage}
                className="btn btn-primary w-100"
              >
                Send
              </button>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}

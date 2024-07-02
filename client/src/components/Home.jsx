import { useRef, useCallback, useContext, useState } from "react";
import { SocketContext } from "../comms";
import { Circles } from "react-loader-spinner";

export default function Home({ submit }) {
  const socket = useContext(SocketContext);

  const name = useRef();
  const room = useRef();
  const [roomError, setRoomError] = useState(false);
  const [nameError, setNameError] = useState(false);

  const sendUsername = useCallback((username, room) => {
    socket.emit("addUser", username, room);
  }, []);

  function addUser() {
    setRoomError(false);
    setNameError(false);
    if (
      !name.current.value ||
      !room.current.value ||
      room.current.value.length != 11
    ) {
      if (!name.current.value) {
        setNameError(true);
      }
      if (!room.current.value || room.current.length != 11) {
        setRoomError(true);
      }
      return;
    }

    sendUsername(name.current.value, room.current.value);
    submit(name.current.value, room.current.value);
  }

  return (
    <>
      <section
        className="vh-100"
        style={{ background: "linear-gradient(90deg, #3c548d, #23396d)" }}
      >
        <div className="container py-5 h-100">
          <div className="row d- flex justify-content-center align-items-center h-100">
            <div className="col col-xl-10">
              <div className="card" style={{ borderRadius: "1rem" }}>
                <div className="row g-0">
                  <div className="col-md-6 col-lg-5 d-none d-md-block">
                    <img
                      src="https://image.freepik.com/vektoren-kostenlos/illustration-des-chatrooms_53876-8482.jpg"
                      alt="login form"
                      className="img-fluid"
                      style={{
                        borderRadius: "1rem 0 0 1rem",
                        objectFit: "cover",
                        height: "100%",
                        width: "500px",
                      }}
                    />
                  </div>
                  <div className="col-md-6 col-lg-7 d-flex align-items-center text">
                    <div
                      className="card-body p-4 p-lg-5 text-black"
                      style={{ maxWidth: "600px" }}
                    >
                      <form>
                        <div className="mb-2 pb-3 text-center ">
                          <span className="fw-bold fs-4">
                            <Circles
                              height="50"
                              width="50"
                              color="#4fa94d"
                              ariaLabel="circles-loading"
                              wrapperStyle={{
                                textAlign: "center",
                                display: "inline",
                                marginRight: "10px",
                              }}
                              wrapperClass=""
                              visible={true}
                            />
                            Chatterbox
                          </span>
                        </div>

                        <h5
                          className="fw-normal mb-3 pb-3 text-center"
                          style={{ letterSpacing: "1px" }}
                        >
                          Free, anonymous conversations online.
                        </h5>

                        <div data-mdb-input-init className="form-outline mb-4">
                          <label className="form-label" htmlFor="nickname">
                            Nickname
                          </label>
                          {nameError ? (
                            <span style={{ display: "block", color: "red" }}>
                              Please enter a valid nickname.
                            </span>
                          ) : null}
                          <input
                            type="text"
                            id="nickname"
                            className="form-control form-control-lg"
                            ref={name}
                            required
                          />
                        </div>

                        <label className="form-label" htmlFor="server">
                          Server Room:
                        </label>
                        {roomError ? (
                          <span style={{ display: "block", color: "red" }}>
                            Please enter a valid server room number. Must be 11
                            characters long.
                          </span>
                        ) : null}

                        <div
                          data-mdb-input-init
                          className="form-outline mb-4 input-group"
                        >
                          <div className="input-group-prepend">
                            <span className="input-group-text" id="server">
                              #
                            </span>
                          </div>
                          <input
                            type="text"
                            id="server"
                            className="form-control form-control-lg"
                            placeholder="00000-00000"
                            maxLength={11}
                            ref={room}
                          />
                        </div>

                        <div className="pt-1 mb-4 text-center">
                          <button
                            data-mdb-button-init
                            data-mdb-ripple-init
                            className="btn btn-success btn-lg border"
                            type="submit"
                            onClick={(e) => {
                              e.preventDefault();
                              addUser();
                            }}
                          >
                            Join
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

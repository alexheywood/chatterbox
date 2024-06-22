import { RiChatSmile2Fill } from "react-icons/ri";
import { useRef } from "react";


export default function Home({submit}) {


    const name = useRef()
    const room = useRef()

  return (
    <>
      <section className="vh-100" style={{ backgroundColor: "#8d99ae"}}>
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col col-xl-10">
              <div className="card" style={{ borderRadius: "1rem" }}>
                <div className="row g-0">
                  <div className="col-md-6 col-lg-5 d-none d-md-block">
                    <img
                      src="https://image.freepik.com/vektoren-kostenlos/illustration-des-chatrooms_53876-8482.jpg"
                      alt="login form"
                      className="img-fluid"
                      style={{ borderRadius: "1rem 0 0 1rem", objectFit: "cover", height: "100%", width: "500px" }}
                    />
                  </div>
                  <div className="col-md-6 col-lg-7 d-flex align-items-center text">
                    <div className="card-body p-4 p-lg-5 text-black" style={{maxWidth: "600px"}}>
                      <form>
                        <div className="mb-2 pb-3 text-center ">
                            <RiChatSmile2Fill color="green" size={30}/>
                          <span className="fw-bold fs-4">Chatterbox</span>
                        </div>

                        <h5
                          className="fw-normal mb-3 pb-3 text-center"
                          style={{ letterSpacing: "1px" }}
                        >
                          Free, anonymous conversations online.
                        </h5>

                        <div data-mdb-input-init className="form-outline mb-4">
                          <label
                            className="form-label"
                            htmlFor="nickname"
                          >
                            Nickname
                          </label>
                          <input
                            type="text"
                            id="nickname"
                            className="form-control form-control-lg"
                            ref={name}
                          />
                        </div>

                        <label
                            className="form-label"
                            htmlFor="server"
                          >
                            Server Room:
                          </label>
                        <div data-mdb-input-init className="form-outline mb-4 input-group">
                          
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
                            prefix="#"
                            maxLength={11}
                            ref={room}
                          />
                        </div>

                        <div className="pt-1 mb-4 text-center">
                          <button
                            data-mdb-button-init
                            data-mdb-ripple-init
                            className="btn btn-dark btn-lg btn-block"
                            type="button"
                            onClick={() => {submit(name.current.value, room.current.value)}}
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

import React, { useEffect, useState, useRef } from "react";
import "./Friend.css";
import Myfriendcompo from "./Myfriendcompo";

export default function Friends() {
  const [friends, setFriends] = useState([]);
  const [chats, setChats] = useState([]);
  const [id, setId] = useState(localStorage.getItem("ID"));
  const [message, setMessage] = useState("");

  const [details, setDetails] = useState({
    name: "",
    COLLEGENAME: "",
    YEAROFGRADUATION: "",
    LINKEDINID: "",
    PORTFOLIOLINK: "",
  });

  const host="http://localhost:5000";

  const [arrivalmessage, setArrivalmessage] = useState(null);

  const fetchDetails = async () => {
    try {
      const response = await fetch(`${host}/api/fetchfriend`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      });

      const json = await response.json();
      setFriends(json);
    } catch (error) {
      console.error("Error fetching friend data:", error);
    }
  };

  const fetchChats = async (id) => {
    try {
      console.log(id);
      const response = await fetch(`${host}/api/getChats/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      });
      const json = await response.json();

      setChats(json);
    } catch (error) {
      console.error("Error fetching chat data:", error);
    }
  };

  const ref = useRef(null);
  const socket = useRef();

  useEffect(() => {
    fetchDetails();
  }, []);

  useEffect(() => {
    console.log("HII");
    socket.current = io("http://localhost:5000");
    socket.current.emit("addUser", id);
  }, []);

  console.log(socket);

  const chat = (ele1) => {
    setDetails(ele1);
    fetchChats(ele1.USERID);
    ref.current.click();
    console.log(ele1);
    setMessage("");
  };

  // here 

  const handleChange = (e) => {
    setMessage(e.target.value);
  };

  const scrollRef = useRef();

  const pushMessage = async () => {
    try {
      socket.current.emit("send-msg", {
        to: details.USERID,
        from: id,
        message: message,
      });

      const response = await fetch(`${host}/api/pushmessage`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },

        body: JSON.stringify({
          message: message,
          Receiver: details.USERID,
        }),
      });

      const json = await response.json();

      setChats(
        chats.concat({
          myself: true,
          message: message,
        })
      );

      setMessage("");
    } catch (error) {
      console.error("Error fetching chat data:", error);
    }
  };

  useEffect(() => {
    if (socket.current) {
      socket.current.on("msg-receive", (msg) => {
        console.log(msg);
        setArrivalmessage({
          myself: false,
          message: msg,
        });
      });
    }
  }, [arrivalmessage]);

  useEffect(() => {
    arrivalmessage && setMessage((pre) => [...pre, arrivalmessage]);
  }, [arrivalmessage]);

  return (
    <>
      <button
        ref={ref}
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Launch demo modal
      </button>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-lg ">
          <div className="modal-content modal-container">
            <div className="modal-header">
              <h5 className="modal-title font-bold " id="exampleModalLabel">
                Chat with {details.name}
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>

            <div className="modal-body">
              <div className="chat-container">
                <div className="chat-messages">
                  {chats.map((ele, index) => (
                    <div
                      ref={scrollRef}
                      key={index}
                      // className={`message ${
                      //   ele.sender === details.USERID ? "right" : "left"
                      // }`}
                    >
                      {ele.message}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Type your message"
                  onChange={handleChange}
                  value={message}
                />
                <button
                  className="btn btn-primary mx-2"
                  type="button"
                  onClick={pushMessage}
                >
                  Send
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="friends-container d-flex flex-wrap flex-row justify-center bg-black">
        {friends.length === 0
          ? ""
          : friends.map((ele) => {
              return <Myfriendcompo ele1={ele[0]} chat={chat} />;
            })}
      </div>
    </>
  );
}

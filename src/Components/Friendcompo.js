import { React, useState, useEffect } from 'react'
import './Friendcompo.css'

export default function Friendcompo(props) {

  const host = "http://localhost:5000";

  let { friend } = props;

  const addfriend = async () => {
    // localstorage.getItem("token") and props.friend.USERID
    let id = props.friend.USERID;
    const response = await fetch(`${host}/api/makefriend/${id}`, {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });

    setShowAlert(true);
    const timer = setTimeout(() => {
      setShowAlert(false);
    }, 1300);

    return () => {
      clearTimeout(timer);
    };
  };

  const [showAlert, setShowAlert] = useState(false);

  return (
    <>

      {showAlert && (
        <div class="alert alert-success fixed-top font-bold" role="alert">
          {props.friend.name} is added in your Friend List !!
        </div>
      )}

      <div className="card mx-3 my-5" style={{ "width": "17rem" }}>

        <div className="card-top">

          <img class="card-img-top" src={props.friend.PROFILELINK} alt="Card image cap"></img>

        </div>

        <div class="card-body ">
          <h6 class="card-title">{props.friend.name}</h6>
          <p class="card-text">{props.friend.COLLEGENAME}<span> &#40; {props.friend.YEAROFGRADUATION} &#41;</span></p>
          <p class="card-text" onClick={() => {
            props.handleBar(props.friend.SELECTINTERESTS);
          }}>See Skills <i class='bx bxs-right-top-arrow-circle' ></i></p>

          <a href="#" class="btn btn-primary" onClick={addfriend}>Add Friend</a>
        </div>
      </div>


    </>

  )
}

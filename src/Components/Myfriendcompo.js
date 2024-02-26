import { React, useEffect, useState } from "react";
import "./Friend.css";

export default function Myfriendcompo(props) {
  const [ab, setAb] = useState(1);

  const [details, setDetails] = useState({
    name: "",
    COLLEGENAME: "",
    YEAROFGRADUATION: "",
    LINKEDINID: "",
    PORTFOLIOLINK: "",
  });

  const { chat, ele1 } = props;

  useEffect(() => {
    // setDetails({
    //   name: props.name,
    //   COLLEGENAME: props.COLLEGENAME,
    //   YEAROFGRADUATION: props.YEAROFGRADUATION,
    //   LINKEDINID: props.LINKEDINID,
    //   PORTFOLIOLINK: props.PORTFOLIOLINK,
    // });
  }, [ab]);

  return (
    <>
      <div className="card text-white bg-dark  mx-4 my-3 pl-4">
        <div className="card-body ">
          <h4 className="card-title font-bold">{props.ele1.name}</h4>
          <h6 className="card-title font-bold">{props.ele1.COLLEGENAME}</h6>
          <span> </span>

          <h6 className="card-title ">
            &#40;{props.ele1.YEAROFGRADUATION}&#41;
          </h6>

          <button
            type="button"
            className="my-3 btn btn-primary  font-bold"
            onClick={() => {
              chat(ele1);
            }}
          >
            Talk <i class='mx-2 bx bxs-chat' ></i>
          </button>
        </div>
      </div>
    </>
  );
}

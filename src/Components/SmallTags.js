import {React,useState} from 'react'
import "./SmallTags.css";

export default function SmallTags(props) {

    const [change, Setchange] = useState(0);

    
    return (
    <>
      <div
        className={
          change == 0
            ? "SmallTags mx-3 my-2 w-1/2 bg-sky-400"
            : "SmallTags mx-3 my-2 w-1/2  bg-green-400"
        }
        onClick={() => {
          // it will chnage in actual array

          Setchange(1 - change);
          props.update(props.tag,change)
          
        }}
      >
        {props.tag}
      </div>
    </>
  );
  
}

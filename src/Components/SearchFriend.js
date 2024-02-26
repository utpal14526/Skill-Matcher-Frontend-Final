import {React,useState,useEffect,useRef} from 'react';
import SmallTags from './SmallTags';
import Friendcompo from './Friendcompo';
import './SearchFriend.css'
import './Profile.css'

export default function SearchFriend() {


  let arr = ["React","Html","Css","Nodejs","Flask", "Kotlin","ML", "MongoDb","Sql","Spring"];

  const [skillsarray,setSkillsarray]=useState([]);
  const [friendsarr, setFriendsarr] = useState([]);
  const [map, setMap] = useState(new Map());
  
  const update=(ele,idx)=>{

    const updatedMap = new Map(map);
    if (idx == 0) {
      updatedMap.set(ele, 1);
    } else {
      updatedMap.delete(ele, 1);
    }

    setMap(updatedMap);

    const updatedFinalarr = Array.from(updatedMap.keys());
    setSkillsarray(updatedFinalarr);
    console.log(map);
   
  }
  
  const host = "https://skill-matcher1.onrender.com";

  const fetchfriends = async () => {
    const response = await fetch(`${host}/api/filteruser`, {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },

      body: JSON.stringify({
        Interests: skillsarray,
      }),
    });

    const json = await response.json();
    console.log(json);
    setFriendsarr(json);
  };


  useEffect(()=>{
    console.log("HI");
    fetchfriends();

  },[])


  const [interests,setInterests]=useState([]);

  const ref = useRef(null);

  const handleBar=(ele)=>{
      setInterests(ele);
      ref.current.click();
  }
  


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
        className="modal fade custom-modal-height"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
            <div className="modal-body p-4">
              <div className="tags d-flex flex-wrap justify-center ">
                {interests.map((ele, index) => (
                  <div key={index} className="Tags2 mx-2 px-2 py-1 my-2 ">
                    {ele}
                  </div>
                ))}
              </div>
              <button
                type="button"
                className="btn-close position-absolute top-0 end-0 m-2"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
          </div>
        </div>
      </div>



    <div className="search-container">

      <div className="tags d-flex  pt-4 flex-start flex-wrap ">
          {arr.map((ele) => {
            return <SmallTags tag={ele} update={update}/>;
          })}
      </div>

      <center><div onClick={fetchfriends} className="SmallTags1 bg-sky-400">Search Friends <i class='bx bx-search-alt-2 mx-2' ></i> </div></center>

    </div>


     <div className=" my-5  d-flex  flex-start flex-wrap px-3 ">
          {friendsarr.length !== 0
            ? friendsarr.map((ele) => {
                return <Friendcompo friend={ele} handleBar={handleBar} />;
              })
            : ""}
      </div>


  
    </>
    
  )
}

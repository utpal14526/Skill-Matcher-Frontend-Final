
import { React, useState, useEffect, useContext } from "react";
import "./Profile.css";
export default function Profile() {

  let arr = ["React","Html","Css","Nodejs","Flask", "Kotlin","ML", "MongoDb","Sql","Spring"];

  
  const [details, setDetails] = useState({
    name: "",
    COLLEGENAME: "",
    YEAROFGRADUATION: "",
    LINKEDINID: "",
    PORTFOLIOLINK: "",
    SELECTINTERESTS: [],
    PROFILELINK: "",
  });

  const host = "https://skill-matcher1.onrender.com";

  const fetchcurprofile = async () => {
    const response = await fetch(`${host}/api/fetchcurprofile`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });

    const json = await response.json();

    if (json) {
      setDetails(json);
      console.log(json.SELECTINTERESTS);
    }

    return;
  };

  useEffect(() => {
    fetchcurprofile();
  }, []);

  const handleChange = (e) => {
    setDetails({
      ...details,
      [e.target.id]: e.target.value,
    });
  };

  // making value dynamic

  const [showAlert, setShowAlert] = useState(false);

  const handleClick = async (e) => {
    e.preventDefault();

    console.log(details);
    const response = await fetch(`${host}/api/profileupdate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },

      body: JSON.stringify(details),
    });

    const json = await response.json();

    setDetails(json);

    setShowAlert(true);
    const timer = setTimeout(() => {
      setShowAlert(false);
    }, 1300);

    return () => {
      clearTimeout(timer);
    };
  };

  // details.
  // for chosing things

  const handletags = async (e) => {
    console.log(e);
    const b = details.SELECTINTERESTS;
    let idx = b.indexOf(e);

    if (idx == -1) {
      b.push(e);
    } else {
      b.splice(idx, 1);
    }

    setDetails({
      ...details,
      SELECTINTERESTS: b,
    });

    // console.log(details);


  };

  function convertTobase64(file) {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  }

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertTobase64(file);

    setDetails({
      ...details,
      PROFILELINK: base64,
    });
  };

  let a="UTPAL";

  return (
    <>

      {showAlert && (
        <div class="alert alert-primary fixed-top font-bold" role="alert">
          Changes Saved Successfully !
        </div>
      )}
      {/* {localStorage.getItem("ID")} */}

      <div className="profile-conatiner">
      <div
        class="modal fade"
        id="exampleModal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog  " role="document   ">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title  font-extrabold" id="exampleModalLabel">
                SELECT YOUR SKILLS
              </h5>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>

           
            <div class="modal-body d-flex flex-start flex-wrap   ">
              {arr.map((ele) => {
                return (
                  // do cheiche ho jayegi
                  details.SELECTINTERESTS.includes(ele) ? (
                    <div
                      className="Tags mx-2 px-1 py-0.5 w-1/5 font-bold my-3"
                      onClick={() => {
                        
                        handletags(ele);
                      }}
                    >
                     
                      {ele}
                    </div>
                  ) : (
                    <div
                      className="Tags2 mx-2 px-1 py-0.5 w-1/5 font-bold my-3"
                      onClick={() => {
                        handletags(ele);
                      }}
                    >
                      {ele}
                    </div>
                  )
                );
              })}
            </div>

            <div className="d-flex flex-start flex-wrap mx-3">
              <div className="Tags mx-2 px-1 py-0.5 w-1/3 font-bold my-3 ">
                Already-Selected
              </div>
              <div className="Tags2 mx-2 px-1 py-0.5 w-1/3 font-bold my-3  bg-sky-400">
                Not-Selected
              </div>
            </div>

            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>

      
      {/* Modals */}
      <div className="form-container my-5">
        <h1 className="font-bold">Your Profile</h1>
        <form>
          <div className="mb-3">
            <label htmlFor="name" className="form-label text-light">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              placeholder="Enter your name"
              value={details.name}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="college" className="form-label text-light">
              College Name
            </label>
            <input
              type="text"
              className="form-control"
              id="COLLEGENAME"
              placeholder="Enter your college name"
              value={details.COLLEGENAME}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="graduation" className="form-label text-light">
              Year of Graduation
            </label>
            <input
              type="text"
              className="form-control"
              id="YEAROFGRADUATION"
              placeholder="Enter year of graduation"
              min="1900"
              max="2100"
              value={details.YEAROFGRADUATION}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="linkedin" className="form-label text-light">
              LinkedIn ID
            </label>
            <input
              type="text"
              className="form-control"
              id="LINKEDINID"
              placeholder="Enter your LinkedIn ID"
              value={details.LINKEDINID}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="portfolio" className="form-label text-light">
              Portfolio Link
            </label>
            <input
              type="text"
              className="form-control"
              id="PORTFOLIOLINK"
              placeholder="Enter your portfolio link"
              value={details.PORTFOLIOLINK}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="college" className="form-label text-light">
              Choose Profile Picture
            </label>
            <input
              type="file"
              lable="Image"
              name="myFile"
              id="file-upload"
              className="form-control"
              accept=".jpeg ,.png ,.jpg"
              onChange={(e) => handleFileChange(e)}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="interests" className="form-label text-light">
              Interests
            </label>
            <select
              className="form-select"
              id="interests"
              data-toggle="modal"
              data-target="#exampleModal"
            >
              <option selected disabled>
                Select your interests
              </option>
            </select>
          </div>
          <button
            type="submit"
            className="font-bold btn btn-primary "
            onClick={handleClick}
          >
            Save Changes
          </button>
        </form>
      </div>
      </div>
    </>
  );
}

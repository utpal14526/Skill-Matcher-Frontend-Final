import { React, useState, useEffect, useContext } from "react";
import "./Profile.css";
// import CustomNavbar from "./Navbar";
import { Select, Radio } from 'antd';
import Layout from "./Layout";
import { toast } from 'react-toastify';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';

export default function Profile() {

  let arr = ["React", "Html", "Css", "Nodejs", "Flask", "Kotlin", "ML", "MongoDb", "Sql", "Spring"];


  const [details, setDetails] = useState({
    name: "",
    USERID: "",   // this should be come from a different point 
    COLLEGENAME: "",
    YEAROFGRADUATION: "",
    LINKEDINID: "",
    PORTFOLIOLINK: "",

  });

  const [photo, setPhoto] = useState("");


  const host = "http://localhost:5000";

  const fetchcurprofile = async () => {
    const response = await fetch(`${host}/api/fetchcurprofile`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });



    const json = await response.json();
    console.log(json);

    if (json) {
      setDetails(json);
      setYear(json.YEAROFGRADUATION);
      setCollegename(json.COLLEGENAME);
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

  const [year, setYear] = useState(0);         // radio will store my year 
  const [collegename, setCollegename] = useState('');

  const handleClick = async (e, id) => {
    e.preventDefault();

    // formData


    const profileData = new FormData();
    profileData.append('name', details.name);
    profileData.append('COLLEGENAME', collegename);
    profileData.append('YEAROFGRADUATION', year);
    profileData.append('LINKEDINID', details.LINKEDINID);
    profileData.append('PORTFOLIOLINK', details.PORTFOLIOLINK);
    profileData.append('USERID', details.USERID);
    profileData.append('photo', photo);



    // const response = await fetch(`${host}/api/profileupdate`, {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //     "auth-token": localStorage.getItem("token"),
    //   },

    //   body: JSON.stringify(details),
    // });

    console.log(details.name);
    console.log(details.USERID);

    const { data } = await axios.post(`${host}/api/profileupdate`, profileData,
      {
        headers: {
          'auth-token': localStorage.getItem('token'),
        }
      }
    );

    console.log(data);

    if (data?.success) {

      toast.success(data?.message);

    }
    else {
      toast.error('Something Went Wrong');
    }

  };



  // new thing implementin g 



  const years = [
    { year: '2020', id: 0, value: 2020 },
    { year: '2021', id: 1, value: 2021 },
    { year: '2022', id: 2, value: 2022 },
    { year: '2023', id: 3, value: 2023 },
    { year: '2024', id: 4, value: 2024 },
    { year: '2025', id: 5, value: 2025 },
    { year: '2026', id: 6, value: 2026 },
    { year: '2027', id: 7, value: 2027 },
  ];

  const colleges = [
    { clg: 'DTU', id: 0 },
    { clg: 'NSUT', id: 1 },
    { clg: 'IITD', id: 2 },
    { clg: 'NIT', id: 3 },
    { clg: 'IITD', id: 4 },
    { clg: 'MAIT', id: 5 },
    { clg: 'Amity University', id: 6 }
  ];



  return (
    <>

      <Layout>


        <div className="profile-container">


          {/* Modals */}


          <div style={{ width: '500px' }} className="form-container  mt-5 profile-internal-container my-5">
            <div className='d-flex flex-row justify-content-between  '>
              <h2 className="font-bold">Your Profile</h2>
              <div>
                {photo ? (
                  <div className='text-center'>
                    <img
                      src={URL.createObjectURL(photo)}
                      alt='product_photo'
                      className='img img-responsive'
                      height={'80px'}
                      width={'80px'}
                    />
                  </div>
                ) : (
                  <div className='text-center'>
                    <img
                      src={`${host}/api/profilephoto/${details.USERID}`}
                      alt='product_photo'
                      className='img img-responsive'
                      height={'80px'}
                      width={'80px'}
                    />
                  </div>
                )}
              </div>
            </div>
            <form>
              <div className="mb-4">
                <label htmlFor="name" className="profile-label form-label ">
                  Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  placeholder="Enter your name"
                  value={details.name}
                  style={{
                    borderRadius: '5px'
                  }}
                  onChange={handleChange}
                />
              </div>


              <div className="mb-4">
                <label htmlFor="college" className="profile-label form-label ">
                  College Name
                </label>
                {/* <input
                  type="text"
                  className="form-control"
                  id="COLLEGENAME"
                  placeholder="Enter your college name"
                  value={details.COLLEGENAME}
                  style={{
                    borderRadius: '5px'
                  }}
                  onChange={handleChange}
                /> */}


                <Select
                  variant={false}
                  placeholder='Select College'
                  size='large'
                  showSearch
                  className='form-select mb-3'
                  value={collegename}
                  onChange={(value) => { setCollegename(value) }}
                >
                  {colleges.map((ele) => (
                    <Select.Option key={ele.id} value={ele.clg}>
                      {ele.clg}
                    </Select.Option>
                  ))}
                </Select>


              </div>

              <div className="mb-4">
                <label htmlFor="graduation" className="profile-label form-label half-border-bottom">
                  Year of Graduation
                </label>

                {/* <input
                  type="text"
                  className="form-control"
                  id="YEAROFGRADUATION"
                  placeholder="Enter year of graduation"
                  min="1900"
                  max="2100"
                  value={details.YEAROFGRADUATION}
                  onChange={handleChange}
                  style={{
                    borderRadius: '5px'
                  }}
                /> */}

                <Select
                  variant={false}
                  placeholder='Select Year'
                  size='large'
                  showSearch
                  className='form-select mb-3'
                  value={year}
                  onChange={(value) => {
                    console.log(value); setYear(value)
                  }}
                >
                  {years.map((ele) => (
                    <Select.Option key={ele.id} value={ele.value}>
                      {ele.year}
                    </Select.Option>
                  ))}
                </Select>


              </div>
              <div className="mb-4">
                <label htmlFor="linkedin" className="profile-label form-label ">
                  LinkedIn ID
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="LINKEDINID"
                  placeholder="Enter your LinkedIn ID"
                  value={details.LINKEDINID}
                  style={{
                    borderRadius: '5px'
                  }}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-4">
                <label htmlFor="portfolio" className="profile-label form-label ">
                  Portfolio Link
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="PORTFOLIOLINK"
                  placeholder="Enter your portfolio link"
                  value={details.PORTFOLIOLINK}
                  style={{
                    borderRadius: '5px'
                  }}
                  onChange={handleChange}
                />
              </div>




              <div className="mb-4">
                <label htmlFor="college" className=" profile-label form-label ">
                  Choose Profile Picture
                </label>
                <input

                  type='file'
                  name="photo"
                  accept="image/*"
                  onChange={(e) => {
                    console.log(e.target.files[0]); // Log the file to ensure it's being selected
                    setPhoto(e.target.files[0]);
                  }}
                  className="form-control"

                  style={{
                    borderRadius: '5px'
                  }}

                />
              </div>


              <button
                type="submit"
                style={{
                  borderRadius: '5px'
                }}

                className="font-bold form-control mt-2 btn btn-primary "
                onClick={handleClick}
              >
                Save Changes
              </button>
            </form>
          </div>
        </div>

      </Layout>

    </>

  );
}

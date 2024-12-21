import { React, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import './Home.css'
import Layout from './Layout';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Home() {

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const host = "http://localhost:5000";

  const [signupData, setSignupData] = useState({
    username: "",
    email: "",
    password: "",
  });

  let navigate = useNavigate();

  const handleChange = (e) => {
    //e.preventDefault();

    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });

    console.log(loginData);
  };

  const handleChangesignup = (e) => {
    //e.preventDefault();

    setSignupData({
      ...signupData,
      [e.target.name]: e.target.value,
    });

    console.log(signupData);
  };


  const [showAlert, setShowAlert] = useState(false);
  const [err, setErr] = useState("");


  const handleClick = async (e) => {

    console.log(loginData);
    e.preventDefault();
    const response = await fetch(`${host}/api/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        email: loginData.email,
        password: loginData.password,
      }),
    });

    const json = await response.json();

    console.log(json);

    if (json.s) {
      localStorage.setItem("token", json.authtoken);
      localStorage.setItem("ID", json.id);

      if (localStorage.token) {
        navigate("/serachfriend");
      }
    }
    else {
      setLoginData({
        email: "",
        password: "",
      });
      setErr(json.Error);

      toast.error('Something Went Wrong');

    }

    // find user using that authtoken in your localstorage
  };


  const handleClicksignup = async (e) => {
    e.preventDefault();
    const response = await fetch(`${host}/api/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        username: signupData.username,
        email: signupData.email,
        password: signupData.password,

      }),
    });

    const json = await response.json();

    if (json.s) {
      localStorage.setItem("token", json.authtoken);
      localStorage.setItem("ID", json.id);

      if (localStorage.token) {
        navigate("/serachfriend");
      }
    }
    else {
      setSignupData({
        username: "",
        email: "",
        password: "",
      });
      console.log(json);
      setErr(json.Error);

      setShowAlert(true);
      const timer = setTimeout(() => {
        setShowAlert(false);
      }, 1300);

      return () => {
        clearTimeout(timer);
      };
    }

  };


  const [c, setC] = useState(0);
  const [c1, setC1] = useState(0);

  const handlepassword = () => {
    setC(1 - c);
  }

  const handlepassword1 = () => {
    setC1(1 - c1);
  }

  const [passwordState, setPasswordState] = useState(1);

  const seePassword = () => {
    setPasswordState(1 - passwordState);
  }


  return (
    <>

      <Layout>

        {showAlert && (
          <div class="alert alert-danger fixed-top font-bold " role="alert">
            {err}
          </div>
        )}

        <div className="Page-container ">
          <div class="container mb-5">
            <input type="checkbox" id="flip" />
            <div class="cover">
              <div class="front">

                <div class="text">
                  <span class="text-1">Every new friend is a <br /> new adventure</span>
                  <span class="text-2">Let's get connected</span>
                </div>
              </div>
              <div class="back">

                <div class="text">
                  <span class="text-1">Complete miles of journey <br /> with one step</span>
                  <span class="text-2">Let's get started</span>
                </div>
              </div>
            </div>
            <div class="forms">
              <div class="form-content">
                <div class="login-form">
                  <div class="title">Login</div>
                  <form action="#">
                    <div class="input-boxes">
                      <div class="input-box">
                        <i class="fas fa-envelope"></i>
                        <input type="email" name="email" value={loginData.email} onChange={handleChange} placeholder="Enter your email" required />
                      </div>
                      <div class="input-box">

                        <i className={passwordState ? "fas fa-eye" : "fa fa-lock"} onClick={seePassword}></i>

                        <input type={passwordState ? "password" : "text"} name="password" value={loginData.password} onChange={handleChange} placeholder="Enter your password" required />


                      </div>



                      <div class="button input-box">
                        <input onClick={handleClick} type="submit" value="Sumbit" />
                      </div>
                      <div class="text sign-up-text">Don't have an account? <label for="flip">Sigup now</label></div>
                    </div>
                  </form>
                </div>
                <div class="signup-form">
                  <div class="title">Signup</div>
                  <form action="#">
                    <div class="input-boxes">
                      <div class="input-box">
                        <i class="fas fa-user"></i>
                        <input type="text" placeholder="Enter your name" name="username" value={signupData.username} onChange={handleChangesignup} required />
                      </div>
                      <div class="input-box">
                        <i class="fas fa-envelope"></i>
                        <input type="email" placeholder="Enter your email" name="email" value={signupData.email} onChange={handleChangesignup} required />
                      </div>
                      <div class="input-box">
                        <i class="fas fa-lock" onClick={handlepassword1}></i>
                        <input type={(c1 == 0) ? "password" : "text"} placeholder="Enter your password" name="password" value={signupData.password} onChange={handleChangesignup} required />
                      </div>
                      <div class="button input-box">
                        <i class="fas fa-lock"></i>
                        <input type="submit" value="Sumbit" onClick={handleClicksignup} />
                      </div>
                      <div class="text sign-up-text">Already have an account? <label for="flip">Login now</label></div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>

        </div>

      </Layout>

    </>
  )
}

// yaha ek login signup ka mast sa form 

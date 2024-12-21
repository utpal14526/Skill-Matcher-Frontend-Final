

// import React, { useEffect } from "react";
// import { Navbar, Nav } from "react-bootstrap";
// import { Link, useNavigate, Outlet } from "react-router-dom";
// import "./Navbar.css";

// const CustomNavbar = () => {

//   let navigate = useNavigate();


//   const Logout = () => {
//     localStorage.removeItem("token");
//     navigate("/");
//   };

//   const Styleheading ={
//     fontSize: '28px',
//     fontWeight: 'bold',
//     color: '#333',
//     fontFamily: "'Roboto', sans-serif",
//     color:"white",
//     position:'fixed'
//   };

//   const StyleTag={

//     fontSize:'19px',
//     fontWeight:'bold',
//     fontFamily: "'Roboto', sans-serif",
//     color:"white",

//   };

//   return (
//     <>
//     <Navbar bg="7d2ae8" expand="lg" variant="dark">
//       <Navbar.Brand href="#" className="mx-4 font-bold ">
//        <h2 style={Styleheading}>SKILL MATCHER</h2>

//       </Navbar.Brand>

//       <Navbar.Collapse id="navbarNav">
//         <Nav className="ml-auto text-zinc-100 ">
//           {localStorage.token ? (

//             <div className="d-flex" style={StyleTag}>

//               <Nav.Link className="mx-3"  href="/friend">
//                 Friends

//               </Nav.Link>
//               <Nav.Link className="mx-3 font-bold" href="/serachfriend">
//                 {" "}
//                 Search Friends

//               </Nav.Link>
//               <Nav.Link className="mx-3 font-bold" href="/profile">
//                 My Profile

//               </Nav.Link>
//               <Nav.Link
//                 className="mx-3 font-bold font-mono "
//                 href="#"
//                 onClick={Logout}
//               >
//                 Logout
//                 <i class="mx-2 fa-solid fa-right-from-bracket"></i>
//               </Nav.Link>
//             </div>
//           ) : (
//             <div></div>
//           )}
//         </Nav>
//       </Navbar.Collapse>
//     </Navbar>


//     </>
//   );
// };

// export default CustomNavbar;

import React from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';

export default function Header() {

  const navigate = useNavigate();

  const handleLogout = () => {
    console.log("HII");
    localStorage.removeItem('token');
    localStorage.clear();
    navigate('/login'); // Redirect to login page after logout
  };


  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark headerclass">
      <div className="container-fluid">
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarTogglerDemo01"
          aria-controls="navbarTogglerDemo01"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
          <Link to="" className="navbar-brand">SKILL MATCHER</Link>
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            {localStorage.getItem('token') ? (
              <>

                <li className="nav-item">
                  <NavLink exact to="/talkwithfriends" className="nav-link mr-2 mt-1" activeClassName="active-link"> <i class="	far fa-comment" style={{ fontSize: '16px', color: 'white', marginLeft: '5px' }}></i></NavLink>
                </li>

                <li className="nav-item">
                  <NavLink exact to="/boostprofile" className="nav-link mr-2" activeClassName="active-link">Boost Profile <i class="fa fa-rocket" style={{ fontSize: '16px', color: 'white', marginLeft: '5px' }}></i></NavLink>
                </li>


                {/* <li className="nav-item">
                  <NavLink exact to="/friend" className="nav-link mr-3" activeClassName="active-link">Friends</NavLink>
                </li> */}
                <li className="nav-item">
                  <NavLink to="/serachfriend" className="nav-link mr-3" activeClassName="active-link">Search Friends <i class="fa fa-search" style={{ fontSize: '16px', color: 'white', marginLeft: '5px' }}></i></NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/profile" className="nav-link mr-3" activeClassName="active-link">Profile</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/login" className="nav-link" activeClassName="active-link" onClick={handleLogout}>Logout <i class="fa fa-sign-out-alt" style={{ fontSize: '16px', color: 'white', marginLeft: '5px' }}></i>  </NavLink>
                </li>

                <li className="nav-item">
                  <NavLink exact to="/notifications" className="nav-link mr-2" activeClassName="active-link"><i class="fa fa-bell" style={{ fontSize: '16px', color: 'white', marginLeft: '5px' }}></i></NavLink>
                </li>

              </>
            ) : (
              <li className="nav-item">
                <NavLink to="/login" className="nav-link" activeClassName="active-link">Login</NavLink>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

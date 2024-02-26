

import React, { useEffect } from "react";
import { Navbar, Nav } from "react-bootstrap";
import { Link, useNavigate, Outlet } from "react-router-dom";
import "./Navbar.css";

const CustomNavbar = () => {

  let navigate = useNavigate();

 
  const Logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <Navbar bg="7d2ae8" expand="lg" variant="dark">
      <Navbar.Brand href="#" className="mx-4 font-bold ">
       <i>SKILL MATCHER</i>
       
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="navbarNav" />
      <Navbar.Collapse id="navbarNav">
        <Nav className="ml-auto text-zinc-100 ">
          {localStorage.token ? (
        
            <div className="d-flex">
                 
              <Nav.Link className="mx-3" href="/friend">
                Friends
               
              </Nav.Link>
              <Nav.Link className="mx-3 font-bold" href="/serachfriend">
                {" "}
                Search Friends
             
              </Nav.Link>
              <Nav.Link className="mx-3 font-bold" href="/profile">
                My Profile
             
              </Nav.Link>
              <Nav.Link
                className="mx-3 font-bold font-mono "
                href="#"
                onClick={Logout}
              >
                Logout
                <i class="mx-2 fa-solid fa-right-from-bracket"></i>
              </Nav.Link>
            </div>
          ) : (
            <div></div>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default CustomNavbar;


// import React, { useEffect } from "react";
// import { Link } from "react-router-dom";
// import "./Navbar.css";

// const Navbar = () => {


//   return (
//     <>

//     <nav class="navbar navbar-expand-lg bg-body-tertiary mb-10">
//   <div class="container-fluid d-flex space-between">
//     <a class="navbar-brand" href="#">Navbar</a>
//     <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
//       <span class="navbar-toggler-icon"></span>
//     </button>
//     <div class="collapse navbar-collapse" id="navbarSupportedContent">
//     <ul class="navbar-nav mr-auto">
//       <Link class="nav-item active" to="/friend">
//         <a class="nav-link" >Find Friends <span class="sr-only">(current)</span></a>
//       </Link>
//       <Link class="nav-item" to="/friend">
//         <a class="nav-link" >Profile</a>
//       </Link>

//       <Link class="nav-item"  to="/friend">
//         <a class="nav-link">My Friends</a>
//       </Link>
    
//     </ul>

//     <form class="form-inline my-2 my-lg-0">
     
//       <button class="btn btn-outline-success my-2 my-sm-0 mx-5" type="submit">Search</button>
//       <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
//     </form>
//   </div>
//   </div>
// </nav>

   
//     </>
//   );
// };

// export default Navbar;



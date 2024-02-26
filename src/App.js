import "./App.css";
// import { Button, ButtonGroup } from '@chakra-ui/react'
import { useEffect } from "react";
import { BrowserRouter as Router,Route, Routes } from "react-router-dom";
import Home from "./Components/Home";
// import Chat from "./Components/Chat";
import CustomNavbar from "./Components/Navbar";
import Profile from "./Components/Profile";
import Friends from "./Components/Friends";
import SearchFriend from "./Components/SearchFriend";
// import SkillState from "./Components/Skiils/SkillState";

function App() {
  // useEffect(() => {
  //   localStorage.removeItem("token");
  // }, []);

  return (
    <>
      {/* <SkillState> */}

  
        <div className="App ">

        

        <Router>

          
          <CustomNavbar/>

          <Routes>
            <Route exact path="/" element={<Home />} />
            {/* <Route exact path="chats" element={<Chat />} /> */}
            <Route exact path="/profile" element={<Profile />} />
            <Route exact path="/friend" element={<Friends/>} />
            <Route exact path="/serachfriend" element={<SearchFriend />} />
          </Routes>
        </Router>
        </div>
      {/* </SkillState> */}
    </>
  );
}

export default App;

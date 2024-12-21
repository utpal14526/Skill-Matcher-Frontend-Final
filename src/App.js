import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Components/Home";
import CustomNavbar from "./Components/Navbar";
import Profile from "./Components/Profile";
import Friends from "./Components/Friends";
import SearchFriend from "./Components/SearchFriend";
import PrimaryHome from './Components/PrimaryHome'
import Private from './AuthenticationRoutes/Private'
import PageNotFound from "./Components/PageNotFound";
import BoostYourProfile from './Components/BoostYourProfile'
import Notification from './Components/Notification'
import TalkWithFriends from './Components/TalkWithFriends'
import TalkWithFriendsPage from './Components/TalkWithFriendsPage'
import FullProfilePage from './Components/FullProfilePage'

function App() {
  return (
    <>
      <div className="App ">
        <Routes>
          <Route exact path="/login" element={<Home />} />
          <Route exact path="/boostprofile" element={<BoostYourProfile />} />

          FullProfilePage

          <Route path="/" element={<Private />}>
            <Route exact path="/" element={<PrimaryHome />} />
            <Route exact path="/profile" element={<Profile />} />
            <Route exact path="/friend" element={<TalkWithFriends />} />
            <Route exact path="/serachfriend" element={<SearchFriend />} />
            <Route path="/notifications/*" element={<Notification />} />
            <Route path="/talkwithfriends" element={<TalkWithFriends />} />
            <Route path="/chat/:USERID" element={<TalkWithFriendsPage />} />
            <Route exact path="/seeProfile/:USERID" element={<FullProfilePage />} />
          </Route>

          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </div>
    </>
  );
}

export default App;

import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import Home from "./component/Home";
import Upload from "./component/Upload";
/* import Profile from "./component/Profile";  */

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    if (localStorage.getItem("token")) {
      setIsLoggedIn(true);
    }
  });

  return (
    <>
      <button id="LogOut" onClick={() => setIsLoggedIn(false)}>
        LogOut
      </button>
      <Router>
        <Link className="url" to="/">
          Home
        </Link>
        <Link className="url" to="/Upload">
          Upload
        </Link>
        {/* <Link className="url" to="/Profile">
          Profile
        </Link>  */}
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/Upload" element={<Upload />} />
          {/* <Route exact path="/Profile" element={<Profile />} /> */}
        </Routes>
      </Router>
    </>
  );
};
export default App;

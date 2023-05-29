import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import Home from "./component/Home";
/* import Profile from "./component/Profile";  */

const App = () => {
  useEffect(() => {
    if (!localStorage.getItem("token")) window.location.reload();
  });

  return (
    <>
      <button
        id="LogOut"
        onClick={() => {
          localStorage.removeItem("token");
          window.location.reload();
        }}
      >
        LogOut
      </button>
      <Router>
        <Link className="url" to="/">
          Home
        </Link>

        {/* <Link className="url" to="/Profile">
          Profile
        </Link>  */}
        <Routes>
          <Route exact path="/" element={<Home />} />
          {/* <Route exact path="/Profile" element={<Profile />} /> */}
        </Routes>
      </Router>
    </>
  );
};
export default App;

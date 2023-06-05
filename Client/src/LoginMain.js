import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import "./App.css";
import "./css/Main.css"
import "./css/Fonts.css"
import LogIn from "./component/LogIn";
import SignUp from "./component/SignUp";

const App = () => {
  return (
    <Router>
      <div className="myApp">Instagram</div>

      <div className="nav">
        <Link className="url" to="/">
          Log In
        </Link>
        <Link className="url" to="/SignUp">
          Sign up
        </Link>
      </div>

      <Routes>
        <Route exact path="/" element={<LogIn />} />
        <Route exact path="/SignUp" element={<SignUp />} />
      </Routes>
    </Router>
  );
};
export default App;

import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import Home from "./component/Home";
const App = () => {
  useEffect(() => {
    if (!localStorage.getItem("token")) window.location.reload();
  });

  return (
    <>
      <div className='header-log'>
      <div className="myApp">
        <span>Instagram</span>
      <button
        id="LogOut"
        onClick={() => {
          localStorage.removeItem("token");
          window.location.reload();
        }}
      >
        LogOut
      </button>
      </div>

      </div>
      <Router>

        <div className="navv">

      <Link className="url" to="/">
          Home
        </Link>

        </div>
        <Routes>
          <Route exact path="/" element={<Home />} />
        </Routes>
      </Router>
    </>
  );
};
export default App;

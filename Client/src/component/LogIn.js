import React, { useState } from "react";

const LogIn = () => {
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    async function fetchPosts() {
      const response = await fetch("http://localhost:5000/api/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: Email, password: Password }),
      });
      const data = await response.json();
      if (data.message === "correct") {
        localStorage.setItem("token", data.token);
        localStorage.setItem("login", data.login);
        window.location.reload();
      } else {
        setMessage(data.message);
      }
    }
    fetchPosts();
  };

  return (
    <div className="all">
      <div className="left-part">
        <h1 className="signup-logo">Log In</h1>
      </div>
      <div className="right-part">
        <div className="center">
          <form id="FormLogIn" className="gradient-border" onSubmit={handleSubmit}>
            <span className="logo">LogIn</span>
            <span className="title">E-mail</span>
            <input required id="email" type="email" name="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
            <span className="title">Password</span>
            <input required id="Password" type="password" name="Password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
            <input id="submit" type="submit" value="Log In" />
          </form>
          <div id="message">{message}</div>
        </div>
      </div>
    </div>
  );
};

export default LogIn;

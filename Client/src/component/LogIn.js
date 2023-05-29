import React, { useState, useEffect } from "react";

const LogIn = () => {
  let data = [];
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  /*   const [Token, setToken] = useState(data);
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    async function fetchPosts() {
      const response = await fetch("http://localhost:3000/api/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: Email, password: Password }),
      });
      const data = await response.json();
      /*       setToken(data);
       */ localStorage.setItem("token", data);
    }
    fetchPosts();
  };

  return (
    <div className="center">
      <form id="FormLogIn" className="gradient-border" onSubmit={handleSubmit}>
        <input id="email" type="email" name="email" placeholder="email" onChange={(e) => setEmail(e.target.value)} />
        <input id="Password" type="password" name="Password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
        <input id="submit" type="submit" value="Sign Up" />
      </form>
    </div>
  );
};

export default LogIn;

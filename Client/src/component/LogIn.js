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
    <div className="center">
      <form id="FormLogIn" className="gradient-border" onSubmit={handleSubmit}>
        <input id="email" type="email" name="email" placeholder="email" onChange={(e) => setEmail(e.target.value)} />
        <input id="Password" type="password" name="Password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
        <input id="submit" type="submit" value="Sign Up" />
      </form>
      {message}
    </div>
  );
};

export default LogIn;

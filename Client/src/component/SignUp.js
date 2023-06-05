import React, { useState /* , useEffect */ } from "react";
//import '../js/typing.js'

const SignUp = () => {
  const [Name, setName] = useState("");
  const [Surename, setSurename] = useState("");
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [Token, setToken] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    async function fetchPosts() {
      const response = await fetch("http://localhost:5000/api/user/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: Name, surename: Surename, email: Email, password: Password }),
      });
      const data = await response.json();
      setToken(data);
    }
    fetchPosts();
  };
  return (
    <div className="all">
      <div className="left-part">
        <h1 className="signup-logo">Sign Up</h1>
      </div>
      <div className="right-part">
        <div className="center">
          <form id="FormSignUp" className="gradient-border" onSubmit={handleSubmit}>
            <span className="logo">Sign Up</span>
            <span className="title">Name</span>
            <input required id="Name" type="text" name="Name" placeholder="Name" onChange={(e) => setName(e.target.value)} />
            <span className="title">Surename</span>
            <input required id="Surename" type="text" name="Surename" placeholder="Surename" onChange={(e) => setSurename(e.target.value)} />
            <span className="title">E-mail</span>
            <input required id="email" type="email" name="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
            <span className="title">Password</span>
            <input required id="Password" type="password" name="Password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
            <input id="submit" type="submit" value="Sign Up" />
          </form>
        </div>
      </div>
      <div id="message">{Token}</div>
    </div>
  );
};

export default SignUp;

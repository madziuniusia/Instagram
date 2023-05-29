import React, { useState /* , useEffect */ } from "react";

const SignUp = () => {
  const [Name, setName] = useState("");
  const [Surename, setSurename] = useState("");
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [Token, setToken] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    async function fetchPosts() {
      const response = await fetch("http://localhost:3000/api/user/register", {
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
    <div className="center">
      <form id="FormSignUp" className="gradient-border" onSubmit={handleSubmit}>
        <input id="Name" type="text" name="Name" placeholder="Name" onChange={(e) => setName(e.target.value)} />
        <input id="Surename" type="text" name="Surename" placeholder="Surename" onChange={(e) => setSurename(e.target.value)} />
        <input id="email" type="email" name="email" placeholder="email" onChange={(e) => setEmail(e.target.value)} />
        <input id="Password" type="password" name="Password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
        <input id="submit" type="submit" value="Sign Up" />
      </form>
      <div style={{ color: "white", width: "100px", userSelect: "text" }}>{Token}</div>
    </div>
  );
};

export default SignUp;

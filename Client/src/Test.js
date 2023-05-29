import React, { useState, useEffect } from "react";

function App() {
  let data = []
  const [postId, setPostId] = useState(data);

  useEffect(() => {
    async function fetchPosts() {
      console.log("pp");
      const response = await fetch("http://192.168.119.112:3000/api/tags/raw", { method: "GET" });
      const data = await response.text()
      console.log("ok", data);
      setPostId(data);
    }
    fetchPosts()
  }, []);

  return (
    <div className="card text-center m-3">
      <h5 className="card-header">HI</h5>
      <div className="card-body">
        {/* <button onClick={fetchPost}>JUZ MI NIE NIE CHCE. PROSZE DZIALAJ</button> */}
        Returned data: {postId}
      </div>
    </div>
  );
}
export default App;

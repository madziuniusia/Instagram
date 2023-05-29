import React, { useState, useEffect } from "react";

const Home = () => {
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    async function fetchGET() {
      const response = await fetch("http://localhost:3000/api/photos", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      const arr = data.map((x) => <img key={x.id} src={"http://localhost:3000/api/photos/" + x.id} alt="HI DS" />);
      setPhotos(arr);
    }

    fetchGET();
  }, []);

  return <div className="center">{photos}</div>;
};

export default Home;

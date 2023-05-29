import React, { useState, useEffect } from "react";
import Upload from "./Upload";

const Home = () => {
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    async function fetchGET() {
      const response = await fetch("http://localhost:5000/api/photos", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      const arr = data.map((x) => <img height="100px" key={x.id} src={"http://localhost:5000/api/photos/" + x.id} alt="HI DS" />);
      setPhotos(arr);
    }

    fetchGET();
  }, []);

  return (
    <div className="center">
      <Upload />
      {photos}
    </div>
  );
};

export default Home;

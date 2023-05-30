import React, { useState, useEffect } from "react";
import Upload from "./Upload";
import Photos from "./Photos";
import Photo from "./Photo";

const Home = () => {
  const [photosdata, setPhotosdata] = useState([]);
  const [photo, setPhoto] = useState();
  const [clicked, setClicked] = useState(false);

  const DisplayPhoto = (e) => {
    setClicked(true);
    setPhoto(e.target.id);
  };
  const Back = (e) => {
    setClicked(false);
  };

  useEffect(() => {
    async function fetchGET() {
      const response = await fetch("http://localhost:5000/api/photos", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setPhotosdata(data);
    }

    fetchGET();
  }, []);

  return (
    <div className="center">
      <Upload />
      <button onClick={Back}>Powrót do strony gównej</button>
      {clicked ? <Photo photo={photo} /> : <Photos photosdata={photosdata} funPhoto={DisplayPhoto} />}
    </div>
  );
};

export default Home;

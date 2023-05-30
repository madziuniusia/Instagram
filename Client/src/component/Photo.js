import React, { useEffect, useState } from "react";

const Photo = (props) => {
  const [photo, setPhoto] = useState([]);
  useEffect(() => {
    async function fetchGET() {
      const response = await fetch("http://localhost:5000/api/photos", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      const photo = data.find((x) => x.id === parseInt(props.photo));
      setPhoto(photo);
    }
    fetchGET();
  }, []);
  return (
    <div className="center">
      <img height="500px" id={photo.id} key={photo.id} src={"http://localhost:5000/api/photos/" + photo.id} alt="HI DS" />
    </div>
  );
};

export default Photo;

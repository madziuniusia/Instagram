import React, { useEffect, useState } from "react";

const Photo = (props) => {
  const [photo, setPhoto] = useState([]);
  const [tags, setTags] = useState([]);

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
    async function fetchGETtags() {
      const response = await fetch("http://localhost:5000/api/photos/tags/" + props.photo, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setTags(data);
    }
    fetchGET();
    fetchGETtags();
  }, []);
  const addTag = (e) => {
    const textTag = "#" + prompt("Tag's name: ", "newTag");
    if (textTag && textTag !== null && textTag !== "") fetchPatch();

    async function fetchPatch() {
      const response = await fetch("http://localhost:5000/api/photos/tags", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: photo.id,
          tag: {
            name: textTag,
            popularity: 0,
            XPos: e.clientX,
            YPos: e.clientY,
          },
        }),
      });
      const data = await response.text();
      if (data) {
        window.location.reload();
      }
    }
  };
  return (
    <div className="center">
      <div id="tagi">
        {tags.map((x, i) => {
          return (
            <p style={{ position: "absolute", top: x.YPos + "px", left: x.XPos + "px" }} key={i}>
              {x.name}
            </p>
          );
        })}
      </div>
      <img height="500px" id={photo.id} key={photo.id} src={"http://localhost:5000/api/photos/" + photo.id} alt="HI DS" onClick={addTag} />
    </div>
  );
};

export default Photo;

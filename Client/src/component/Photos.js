import React from "react";

const Photos = (props) => {
  return (
    <div className="center photo-container">
      {props.photosdata.map((x) => {
        if (x.album === localStorage.getItem("login")) {
          return <img height="100px" id={x.id} key={x.id} src={"http://localhost:5000/api/photos/" + x.id} alt="HI DS" onClick={props.funPhoto} />;
        }
      })}
    </div>
  );
};

export default Photos;

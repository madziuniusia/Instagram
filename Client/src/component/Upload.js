import React, { useState } from "react";

const Upload = () => {
  const [files, setFiles] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append("file", files[i]);
    }

    formData.append("album", localStorage.getItem("login"));
    async function fetchPosts() {
      const response = await fetch("http://localhost:5000/api/photos", {
        method: "POST",
        body: formData,
      });
      await response.json();
      window.location.reload();
    }
    fetchPosts();
  };

  return (
    <div className="center upload-container">
      <form onSubmit={handleSubmit} className="form-upload">
        <label for="img" className="btn">
          Wybierz
        </label>
        <input type="file" id="img" name="img" className="hide" accept="image/*" multiple onChange={(e) => setFiles(e.target.files)} />
        <input type="submit" className="btn" />
      </form>
    </div>
  );
};

export default Upload;

import React, { useState } from "react";
import "../../styles/CreateFood.css";
import axios from "axios";
import {useNavigate} from "react-router-dom";

const CreateFood = () => {
  const [previewUrl, setPreviewUrl] = useState(null);
  const [videoFile, setVideoFile] = useState(null);

  const navigate = useNavigate();

  const handleVideoChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) {
      setPreviewUrl(null);
      setVideoFile(null);
      return;
    }
    setVideoFile(file);
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData();
    formData.append("name", form.name.value);
    formData.append("description", form.description.value);
    formData.append("video", videoFile);

    const response = await axios.post("http://localhost:3000/api/food", formData, {
      withCredentials: true,
    });
    console.log(response.data);
    navigate("/");
  };

  return (
    <div className="create-food-page">
      <div className="create-food-card">
        <h1>Create Food Reel</h1>

        <form className="create-food-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Food name</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter the food item name"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              rows="3"
              placeholder="Describe this food or offer"
            />
          </div>

          <div className="form-group">
            <label htmlFor="video">Food video</label>
            <input
              type="file"
              id="video"
              name="video"
              accept="video/*"
              onChange={handleVideoChange}
              required
            />
            <p className="hint">
              Supported: MP4, WebM. Keep it short and vertical (9:16) for best
              results.
            </p>
          </div>

          {previewUrl && (
            <div className="preview-wrapper">
              <p className="preview-label">Preview</p>
              <video
                className="preview-video"
                src={previewUrl}
                controls
                loop
                muted
              />
            </div>
          )}

          <button type="submit" className="submit-button">
            Upload Reel
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateFood;
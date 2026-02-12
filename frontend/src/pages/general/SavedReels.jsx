import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../../styles/Home.css";

function SavedReels() {
    const location = useLocation();
    const navigate = useNavigate();

    const savedIds = location.state?.savedReels || [];
    const videos = location.state?.videos || [];

    const savedVideos = videos.filter((video) =>
        savedIds.includes(video._id)
    );

    return (
        <div className="reels-container">
            {savedVideos.length === 0 ? (
                <div className="no-saved">
                    <h2>No Saved Reels Yet</h2>
                    <button onClick={() => navigate("/")}>
                        Go Back
                    </button>
                </div>
            ) : (
                savedVideos.map((video) => (
                    <div key={video._id} className="reel">
                        <video
                            className="video"
                            src={video.video}
                            loop
                            muted
                            playsInline
                            autoPlay
                        />

                        <div className="overlay">
                            <p className="description">
                                {video.description}
                            </p>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
}

export default SavedReels;

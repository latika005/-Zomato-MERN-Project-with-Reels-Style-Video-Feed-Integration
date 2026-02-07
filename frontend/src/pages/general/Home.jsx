import React, { useEffect, useRef, useState } from "react";
import "../../styles/Home.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Home() {
    const navigate = useNavigate();
    const [videos, setVideos] = useState([]);
    const videoRefs = useRef({});

    useEffect(() => {
        axios
            .get("http://localhost:3000/api/food", 
            { withCredentials: true })
            .then((response) => {
                setVideos(response.data.foodItems);
            })
            .catch((error) => {
                console.error("Error fetching food items:", error);
            });
    }, []);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    const video = entry.target;
                    if (entry.isIntersecting) {
                        video.play();
                    } else {
                        video.pause();
                    }
                });
            },
            { threshold: 0.5 }
        );

        videos.forEach((video) => {
            const el = videoRefs.current[video._id];
            if (el) observer.observe(el);
        });

        return () => observer.disconnect();
    }, [videos]);

    return (
        <div className="reels-container">
            {videos.map((video) => (
                <div key={video._id} className="reel">
                    <video
                        ref={(el) => (videoRefs.current[video._id] = el)}
                        className="video"
                        src={video.video}
                        loop
                        muted
                        playsInline
                        preload="metadata"
                    />

                    <div className="overlay">
                        <p className="description">
                            {video.description}
                        </p>

                        <button className="action-button"
                         onClick={() =>
                            navigate(`/foodpartner/${video.foodPartner}`)
                        }>
                            Learn More
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Home;

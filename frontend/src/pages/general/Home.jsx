import React, { useEffect, useRef, useState } from "react";
import "../../styles/Home.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "remixicon/fonts/remixicon.css";

function Home() {
    const navigate = useNavigate();
    const [videos, setVideos] = useState([]);
    const [savedReels, setSavedReels] = useState([]);
    const videoRefs = useRef({});

    // Fetch videos
    useEffect(() => {
        axios
            .get("http://localhost:3000/api/food", {
                withCredentials: true,
            })
            .then((response) => {
                // Add like & comment defaults if backend doesn't send them yet
                const updatedVideos = response.data.foodItems.map((video) => ({
                    ...video,
                    likeCount: video.likeCount || 0,
                    commentCount: video.commentCount || 0,
                    liked: false,
                }));
                setVideos(updatedVideos);
            })
            .catch((error) => {
                console.error("Error fetching food items:", error);
            });
    }, []);

    // Auto play logic
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
            { threshold: 0.6 }
        );

        videos.forEach((video) => {
            const el = videoRefs.current[video._id];
            if (el) observer.observe(el);
        });

        return () => observer.disconnect();
    }, [videos]);

    // 🔥 LIKE FUNCTION (Optimistic UI)
    const toggleLike = async (videoId) => {
        setVideos((prevVideos) =>
            prevVideos.map((video) =>
                video._id === videoId
                    ? {
                          ...video,
                          liked: !video.liked,
                          likeCount: video.liked
                              ? video.likeCount - 1
                              : video.likeCount + 1,
                      }
                    : video
            )
        );

        try {
            await axios.post(     ///${videoId}
                `http://localhost:3000/api/food/${videoId}/like`,
                {},
                { withCredentials: true }
            );
        } catch (error) {
            console.error("Error liking video:", error);
        }
    };

    // SAVE FUNCTION
    const toggleSave = (video) => {
        const exists = savedReels.find((item) => item._id === video._id);

        if (exists) {
            setSavedReels(savedReels.filter((item) => item._id !== video._id));
        } else {
            setSavedReels([...savedReels, video]);
        }
    };

    return (
        <>
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

                        {/* RIGHT SIDE ACTIONS */}
                        <div className="reel-actions">
                            {/* LIKE */}
                            <div className="icon-block">
                                <i
                                    className={
                                        video.liked
                                            ? "ri-heart-fill liked"
                                            : "ri-heart-line"
                                    }
                                    onClick={() =>
                                        toggleLike(video._id)
                                    }
                                ></i>
                                <span>{video.likeCount}</span>
                            </div>

                            {/* COMMENT */}
                            <div className="icon-block">
                                <i className="ri-chat-3-line"></i>
                                <span>{video.commentCount}</span>
                            </div>

                            {/* SAVE */}
                            <div className="icon-block">
                                <i
                                    className={
                                        savedReels.find(
                                            (item) =>
                                                item._id === video._id
                                        )
                                            ? "ri-bookmark-fill"
                                            : "ri-bookmark-line"
                                    }
                                    onClick={() => toggleSave(video)}
                                    onDoubleClick={() =>
                                        navigate("/saved", {
                                            state: { savedReels },
                                        })
                                    }
                                ></i>
                            </div>
                        </div>

                        <div className="overlay">
                            <p className="description">
                                {video.description}
                            </p>

                            <button
                                className="action-button"
                                onClick={() =>
                                    navigate(
                                        `/foodpartner/${video.foodPartner}`
                                    )
                                }
                            >
                                Learn More
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}

export default Home;

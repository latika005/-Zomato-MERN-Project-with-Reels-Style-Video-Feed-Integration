import React, { useState, useEffect } from "react";
import "../../styles/FoodPartnerProfile.css";
import { useParams } from "react-router-dom";
import axios from "axios";

const Profile = () => {
  const { id } = useParams();
  const [profile, setProfile] = useState(null);

  const [videos, setVideos] = useState([]);
  // const videos = Array.from({ length: 6 }).map((_, i) => ({
  //   id: `v-${i}`,
  //   label: `Video ${i + 1}`,
  // }));

  useEffect(() => {
    if (!id) return;

    axios
      .get(`http://localhost:3000/api/auth/foodpartner/${id}`, {
        withCredentials: true,
      })
      .then((res) => {
        setProfile(res.data.foodPartner);
        setVideos(res.data.foodPartner?.foodItems || []);
      })
      .catch((err) => {
        console.error("Failed to fetch food partner profile", err);
      });
  }, [id]);

  /**
   * UI-first fallback:
   * Until backend sends full data, we safely fall back to this.
   */
  const partner = profile || {
    name: "Food Partner",
    address: "Add your address here",
    email: "partner@email.com",
    phone: "+91 00000 00000",
    totalMeals: 43,
    customersServed: "15K",
  };

  return (
    <div className="fp-container">
      <h1>Food Partner Profile</h1>
      {id && <p className="fp-muted">Partner ID: {id}</p>}

      {/* ================= PROFILE HEADER ================= */}
      <div className="fp-header">
        {/* LEFT */}
        <div className="fp-header-left">
          <div className="fp-avatar" aria-hidden="true" />

          <div className="fp-info">
            <h2 className="fp-name">{partner.name}</h2>
            <p className="fp-address">{partner.address}</p>

            <div className="fp-actions">
              {partner.phone && (
                <a className="fp-link" href={`tel:${partner.phone}`}>
                  Call
                </a>
              )}
              {partner.email && (
                <a className="fp-link" href={`mailto:${partner.email}`}>
                  Email
                </a>
              )}
            </div>
          </div>
        </div>

        {/* RIGHT - STATS */}
        <div className="fp-stats" aria-label="Partner statistics">
          <div className="fp-stat">
            <p className="fp-stat-label">Total Meals</p>
            <p className="fp-stat-value">{partner.totalMeals}</p>
          </div>
          <div className="fp-stat">
            <p className="fp-stat-label">Customers Served</p>
            <p className="fp-stat-value">{partner.customersServed}</p>
          </div>
        </div>
      </div>

      {/* ================= REELS ================= */}
      <div className="fp-section-header">
        <h2 className="fp-section-title">Reels</h2>
        <p className="fp-muted">
          Latest videos shared by this partner
        </p>
      </div>

      <div className="fp-video-grid">
        {videos.map((v) => (
          <div
            key={v._id || v.id}
            className="fp-video-card"
            role="button"
            tabIndex={0}
          >
            <video src={v.video} muted className="fp-video" />
            <span>{v.description || v.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Profile;

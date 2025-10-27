"use client";

import Image from "next/image";
import { useState } from "react";

export default function ProfilePage() {
  const [user] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    avatar: "/profile.png",
    joined: "January 2024",
  });

  return (
    <div className="profile-page">
      <div className="profile-card">
        <div className="avatar-section">
          <Image
            src={user.avatar}
            alt={user.name}
            width={100}
            height={100}
            className="avatar"
          />
          <h2>{user.name}</h2>
          <p className="email">{user.email}</p>
        </div>

        <div className="info-section">
          <h3>Account Information</h3>
          <ul>
            <li><strong>Full Name:</strong> {user.name}</li>
            <li><strong>Email:</strong> {user.email}</li>
            <li><strong>Member Since:</strong> {user.joined}</li>
          </ul>
        </div>

        <div className="action-buttons">
          <button className="edit-btn">Edit Profile</button>
          <button className="logout-btn">Logout</button>
        </div>
      </div>
    </div>
  );
}

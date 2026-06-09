import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./EditProfile.css";

function EditProfile() {
  const location = useLocation();
  const navigate = useNavigate();

   

const [email, setEmail] = useState(
  localStorage.getItem("email") || ""
);

const [password, setPassword] = useState(
  localStorage.getItem("password") || ""
);
     if (!email.trim()) {
    alert("Please enter email");
    return;
  }

  if (!email.includes("@")) {
    alert("Please enter a valid email");
    return;
  }

  if (!password.trim()) {
    alert("Please enter password");
    return;
  }

  if (password.length < 6) {
    alert("Password must be at least 6 characters");
    return;
  }



  const handleSave = () => {
    localStorage.setItem("email", email);
localStorage.setItem("password", password);
    navigate("/Dashboard", {
      state: {
        email,
        password,
      },
    });
    setUser({
  email,
  password
});
      alert("Profile Update successful");

  };

  return (
    <div className="edit-container">
      <div className="edit-card">

        <h2>Edit Profile ✏️</h2>

        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="save-btn" onClick={handleSave}>
          Save Changes
        </button>
      

      </div>
    </div>
  );
}

export default EditProfile;
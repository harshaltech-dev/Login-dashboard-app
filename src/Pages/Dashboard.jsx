import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

import Employee from "./Employee";
import Products from "./Products";
import EditProfile from "./EditProfile";

import "./Dashboard.css";

function Dashboard() {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  const [darkMode, setDarkMode] =
    useState(false);

  const [activePage, setActivePage] =
    useState("home");

  const email =
    localStorage.getItem("email");

  const password =
    localStorage.getItem("password");

  function logOut() {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    localStorage.removeItem("password");

    navigate("/");
  }

  return (
    <div className="dashboard-container">

      {/* Sidebar */}
      <div className="sidebar">

        <h1>MY APP</h1>

        <button
          className="btn Home-btn"
          onClick={() =>
            setActivePage("home")
          }
        >
          Home
        </button>

        <button
          className="btn emp-btn"
          onClick={() =>
            setActivePage("employee")
          }
        >
          Employee
        </button>

        <button
          className="btn product-btn"
          onClick={() =>
            setActivePage("products")
          }
        >
          Product List
        </button>

        <button
          className="btn update-btn"
          onClick={() =>
            setActivePage("update")


          }
        >
          Update Profile
        </button>

        <button
          className="btn logout-btn"
          onClick={logOut}
        >
          Logout
        </button>
      </div>

      {/* Main Content */}
      <div
        className={`dashboard-card ${darkMode ? "dark" : ""
          }`}
      >

        {/* Header */}
        <header className="header">

          <h2>
            Login Dashboard App
          </h2>

          <button
            className="header-btn"
            onClick={() =>
              setDarkMode(!darkMode)
            }
          >
            {darkMode
              ? "☀ Light Mode"
              : "🌙 Dark Mode"}
          </button>
        </header>

        {/* Home */}
        {activePage === "home" && (
          <>
            <h1>
              Welcome 👋 Harshal
            </h1>

            <h3>
              📧 Email:
              {user.email || email}
            </h3>

            <h3>
              🔒 Password:
              {user.password || password}
            </h3>
          </>
        )}

        {/* Employee */}
        {activePage === "employee" && (
          <Employee />
        )}

        {/* Products */}
        {activePage === "products" && (
          <Products />
        )}

        {/* Update */}
        {activePage === "update" && (
          <EditProfile

          />
        )}
      </div>
    </div>
  );
}

export default Dashboard;
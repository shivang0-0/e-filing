import React from "react";
import { Link } from "react-router-dom";
import "./App.css";

function LandingPage() {
  const buttonStyle = {
    marginRight: "10px",
    padding: "10px 20px",
    fontSize: "16px",
  };

  return (
    <div className="App">
      <h1 style={{ fontFamily: "Arial", fontSize: "32px" }}>
        Welcome to GST e-filing!
      </h1>
      <p style={{ fontFamily: "Verdana", fontSize: "18px" }}>
        File your GST returns online with ease.
      </p>
      <p style={{ fontFamily: "Verdana", fontSize: "18px" }}>
        Stay compliant and save time by using our platform.
      </p>
      <p style={{ fontFamily: "Verdana", fontSize: "18px" }}>
        Get started today!
      </p>
      <Link to="/ClientSection">
        <button style={buttonStyle}>Client</button>
      </Link>
      <Link to="/AdminSection">
        <button style={buttonStyle}>Admin</button>
      </Link>
    </div>
  );
}

export default LandingPage;

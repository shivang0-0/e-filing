import React from "react";
import { Link } from "react-router-dom";

function ClientSection() {
  const containerStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
  };

  const buttonContainerStyle: React.CSSProperties = {
    display: "flex",
    width: "100%",
    justifyContent: "space-between",
    marginTop: "20px",
  };

  const buttonStyle = {
    marginRight: "10px",
    padding: "10px 20px",
    fontSize: "16px",
  };

  return (
    <div style={containerStyle}>
      <div className="ClientSection">
        <h1>Welcome to the Client Section</h1>
        <div style={buttonContainerStyle}>
          <Link to="./signup">
            <button style={buttonStyle}>Sign Up</button>
          </Link>
          <Link to="/login">
            <button style={buttonStyle}>Login</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ClientSection;

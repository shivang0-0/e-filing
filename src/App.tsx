import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './LandingPage';
import ClientSection from './client/ClientSection';
import AdminSection from './admin/AdminSection';
import ClientSignup from './client/signup'
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/ClientSection" element={<ClientSection />} />
        <Route path="/AdminSection" element={<AdminSection />} />
        <Route path="/ClientSection/signup" element={<ClientSignup />} />
      </Routes>
    </Router>
  );
}

export default App;
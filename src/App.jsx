
import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import { Toaster } from "./components/ui/toaster"; // ✅ import the Toaster
import About from "./pages/About";
import Schedule from "./pages/Schedule";
import Leaderboard from "./pages/Leaderboard";
import Gallery from "./pages/Gallery";
import Contact from "./pages/Contact";
import AdminDashboard from "./pages/AdminDashboard";
import Certificates from "./pages/Certificates";
import ParticipantDashboard from "./pages/ParticipantDashboard";
import Round1 from "./pages/Round1";
import Round2 from "./pages/Round2";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/dashboard" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<About />} />
        <Route path="/schedule" element={<Schedule />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/certificates" element={<Certificates />} />
        <Route path="/participant/dashboard" element={<ParticipantDashboard />} />
        <Route path="/round1" element={<Round1 />} />
        <Route path="/round2" element={<Round2 />} />
      </Routes>

      {/* ✅ This enables toast notifications globally */}
      <Toaster />
    </>
  );
};

export default App;


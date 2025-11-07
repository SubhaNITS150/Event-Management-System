import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import SignUpPage from "../pages/authentication/SignUp.jsx";
import HomePage from "../pages/homepage/HomePage";
import NavbarDesktop from "../components/navigationbars/NavbarDesktop.jsx";
import { useViewport } from "../hooks/viewport/useViewPort.js";
import NavbarMobile from "../components/navigationbars/NavbarMobile.jsx";
import FooterMobile from "../components/footer/FooterMobile.jsx";
import FooterDesktop from "../components/footer/FooterDesktop.jsx";
import EventPage from "../pages/event/EventPage.jsx";
import ProtectedRoute from "./ProtectedRoutes.jsx";
import Login from "../pages/authentication/Login.jsx";
import AdminDashboard from "../pages/AdminDashboard.jsx";
import ParticipantDashboard from "../pages/ParticipantDashboard.jsx";
import Register from "../pages/Register.jsx";
import About from "../pages/About.jsx";
import Schedule from "../pages/Schedule.jsx";
import Leaderboard from "../pages/Leaderboard.jsx";
import Gallery from "../pages/Gallery.jsx";
import Contact from "../pages/Contact.jsx";
import Certificates from "../pages/Certificates.jsx";
import Round1 from "../pages/Round1.jsx";
import Round2 from "../pages/Round2.jsx";
const AppRouter = () => {
  const location = useLocation();
  const isMobile = useViewport();

  const hideNavbar = location.pathname === "/signUp" || location.pathname === "/login";

  return (
    <>
      {!hideNavbar && (isMobile ? <NavbarMobile /> : <NavbarDesktop />)}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/event" element={
          <ProtectedRoute>
            <EventPage />            
          </ProtectedRoute>
        } /> 
        <Route path="/dashboard" element={
          <ProtectedRoute>
            < ParticipantDashboard/>            
          </ProtectedRoute>
        } /> 
        <Route path="/admin" element={
          <ProtectedRoute>
            < AdminDashboard/>            
          </ProtectedRoute>
        } /> 
        <Route path="/register" element={
          <ProtectedRoute>
            < Register/>            
          </ProtectedRoute>
        } /> 
         <Route path="/about" element={
          <ProtectedRoute>
            < About/>            
          </ProtectedRoute>
        } /> 
         <Route path="/schedule" element={
          <ProtectedRoute>
            < Schedule/>            
          </ProtectedRoute>
        } /> 
         <Route path="/leaderboard" element={
          <ProtectedRoute>
            < Leaderboard/>            
          </ProtectedRoute>
        } /> 
        <Route path="/gallery" element={
          <ProtectedRoute>
            < Gallery/>            
          </ProtectedRoute>
        } /> 
        <Route path="/contact" element={
          <ProtectedRoute>
            < Contact/>            
          </ProtectedRoute>
        } /> 
         <Route path="/certificates" element={
          <ProtectedRoute>
            < Certificates/>            
          </ProtectedRoute>
        } /> 
         <Route path="/round1" element={
          <ProtectedRoute>
            < Round1/>            
          </ProtectedRoute>
        } /> 
         <Route path="/round2" element={
          <ProtectedRoute>
            < Round2/>            
          </ProtectedRoute>
        } /> 
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={<Login />} />
        
      </Routes>
      {!hideNavbar && (isMobile ? <FooterMobile /> : <FooterDesktop />)}
    </>
  );
};

export default AppRouter;

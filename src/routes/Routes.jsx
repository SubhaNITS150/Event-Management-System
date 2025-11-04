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

const AppRouter = () => {
  const location = useLocation();
  const isMobile = useViewport();

  const hideNavbar = location.pathname === "/signup" || location.pathname === "/login";

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
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      {!hideNavbar && (isMobile ? <FooterMobile /> : <FooterDesktop />)}
    </>
  );
};

export default AppRouter;

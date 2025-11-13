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
import AlreadyRegistered from "../pages/AlreadyRegistered.jsx";
import RegistrationGuard from "./RegistereGuard.jsx";
import { useState } from "react";
import { useEffect } from "react";
import AdminRoute from "./AdminRoute.jsx";
import { supabase } from "../lib/supabaseClient.js";

const AppRouter = () => {
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);

  const location = useLocation();
  const isMobile = useViewport();

  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (!user) {
          setLoading(false);
          return;
        }

        const { data: profile, error } = await supabase
          .from("users") // Or "profiles" or whatever your table is
          .select("role") // <-- The important part
          .eq("user_id", user.id)
          .single();

        if (error) throw error;

        if (profile) {
          setUserRole(profile.role);
        }
      } catch (error) {
        console.error("Error fetching user role:", error);
        setUserRole("user"); // Default to participant on error
      } finally {
        setLoading(false);
      }
    };

    fetchUserRole();
  }, []);

  const hideNavbar =
    location.pathname === "/signUp" || location.pathname === "/login";

  return (
    <>
      {!hideNavbar && (isMobile ? <NavbarMobile /> : <NavbarDesktop />)}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/event"
          element={
            <ProtectedRoute>
              <EventPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <ParticipantDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminRoute>
                <AdminDashboard />
              </AdminRoute>
            </ProtectedRoute>
          }
        />

        <Route
          path="/register"
          element={
            <ProtectedRoute>
              <RegistrationGuard>
                <Register />
              </RegistrationGuard>
            </ProtectedRoute>
          }
        />

        <Route
          path="/alreadyregistered"
          element={
            <ProtectedRoute>
              <AlreadyRegistered />
            </ProtectedRoute>
          }
        />

        <Route
          path="/certificates"
          element={
            <ProtectedRoute>
              <Certificates />
            </ProtectedRoute>
          }
        />
        <Route
          path="/round1"
          element={
            <ProtectedRoute>
              <Round1 />
            </ProtectedRoute>
          }
        />
        <Route
          path="/round2"
          element={
            <ProtectedRoute>
              <Round2 />
            </ProtectedRoute>
          }
        />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<About />} />
        <Route path="/schedule" element={<Schedule />} />

        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      {!hideNavbar && (isMobile ? <FooterMobile /> : <FooterDesktop />)}
    </>
  );
};

export default AppRouter;

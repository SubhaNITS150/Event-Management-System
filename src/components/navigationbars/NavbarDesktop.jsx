import { Link, useLocation } from "react-router-dom";
import { Button } from "../ui/button.jsx";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import NavbarMobile from "./NavbarMobile.jsx";
import { useAuthStore } from "../../services/authservices/authStore.js";

export default function NavbarDesktop() {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user } = useAuthStore();

  const navLinks = [
    { href: "/dashboard", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/schedule", label: "Schedule" },
    { href: "/leaderboard", label: "Leaderboard" },
    { href: "/gallery", label: "Gallery" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 gap-4">
          {/* Logo */}
          <Link to="/dashboard">
            <div className="flex items-center gap-3 px-3 py-2 rounded-md transition-colors">
              <div className="w-10 h-10 bg-[#00205B] rounded-md flex items-center justify-center">
                <span className="text-white font-bold text-lg font-[Poppins]">NIT</span>
              </div>
              <div className="hidden sm:block">
                <div className="font-[Poppins] font-bold text-lg text-[#00205B]">
                  Hackathon 2026
                </div>
                <div className="text-xs text-[#6B7280]">NIT Silchar</div>
              </div>
            </div>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link key={link.href} to={link.href}>
                <Button
                  variant="ghost"
                  className={`text-[#00205B] hover:text-[#001A47] hover:bg-[#E6EAF3] transition-colors ${
                    location.pathname === link.href ? "bg-[#E6EAF3]" : ""
                  }`}
                >
                  {link.label}
                </Button>
              </Link>
            ))}
          </div>

          {/* Desktop Buttons */}
          <div className="hidden md:flex items-center gap-2">
            {/* <Link to="/login">
              <Button
                variant="outline"
                className="border-[#00205B] text-[#00205B] hover:bg-[#00205B] hover:text-white transition-colors"
              >
                {user ? user?.email : "Login"}
              </Button>
            </Link> */}
            <Link to={user ? "/dashboard" : "/register"}>
              <Button className="bg-[#FF7A00] hover:bg-[#e86b00] text-white border border-[#FF7A00] transition-colors">
                {user ? "Dashboard" : "Register Now"}
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-[#00205B]"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* ✅ Mobile Overlay — Fullscreen Menu */}
      {mobileMenuOpen && (
        <NavbarMobile
          navLinks={navLinks}
          onClose={() => setMobileMenuOpen(false)}
        />
      )}
    </nav>
  );
}

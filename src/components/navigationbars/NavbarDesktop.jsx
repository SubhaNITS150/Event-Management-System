
import { Link, useLocation } from "react-router-dom";
import { Button } from "../ui/button.jsx";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import NavbarMobile from "./NavbarMobile.jsx";
import { useAuthStore } from "../../services/authservices/authStore.js";
import { supabase } from "../../lib/supabaseClient.js";
import { useNavigate } from "react-router-dom";
import FullScreenLoader from "../Loading.jsx"; // ✅ add this

export default function NavbarDesktop() {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user } = useAuthStore();
  const [loggingOut, setLoggingOut] = useState(false); // ✅ add this

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/schedule", label: "Schedule" },
    { href: "/leaderboard", label: "Leaderboard" },
    { href: "/gallery", label: "Gallery" },
    { href: "/contact", label: "Contact" },
  ];

  // ✅ keep your logic; just wrap with loader
  const handleLogout = async () => {
    try {
      setLoggingOut(true);
      await supabase.auth.signOut();
      useAuthStore.getState().logout?.();
      window.location.href = "/login";
    } catch (e) {
      console.error(e);
      setLoggingOut(false); // only shown if redirect doesn't happen
    }
  };

  return (
    <>
      {loggingOut && <FullScreenLoader label="Logging you out…" />}{/* ✅ loader */}

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
              {user ? (
                <>
                  {/* <Link to="/dashboard">
                    <Button className="bg-[#FF7A00] hover:bg-[#e86b00] text-white border border-[#FF7A00] transition-colors">
                      Dashboard
                    </Button>
                  </Link> */}
{/* <Link to={user?.role === "admin" ? "/admin" : "/dashboard"}>
     <Button className="bg-[#FF7A00] hover:bg-[#e86b00] text-white border border-[#FF7A00] transition-colors">
    Dashboard                  
    </Button>
      </Link> */}
                     <Link to={user?.user_metadata?.role === "admin" ? "/admin" : "/dashboard"}>
         <Button className="bg-[#FF7A00] hover:bg-[#e86b00] text-white border border-[#FF7A00] transition-colors">
        Dashboard
   </Button>
        </Link>


                  <Button
                    onClick={handleLogout} // ✅ use the handler
                    variant="outline"
                    className="border-red-500 text-red-600 hover:bg-red-50 transition-colors"
                  >
                    Logout
                  </Button>
                </>
              ) : (
                <Link to="/login">
                  <Button className="bg-[#FF7A00] hover:bg-[#e86b00] text-white border border-[#FF7A00] transition-colors">
                    Login
                  </Button>
                </Link>
              )}
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

        {mobileMenuOpen && (
          <NavbarMobile
            navLinks={navLinks}
            onClose={() => setMobileMenuOpen(false)}
          />
        )}
      </nav>
    </>
  );
}

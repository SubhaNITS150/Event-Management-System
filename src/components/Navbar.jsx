
import { Link, useLocation } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
          {/* Left logo + title */}
          <Link to="/dashboard" data-testid="link-home">
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

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link key={link.href} to={link.href} data-testid={`link-${link.label.toLowerCase()}`}>
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

          {/* Right-side Buttons */}
          <div className="hidden md:flex items-center gap-2">
            <Link to="/login" data-testid="link-login">
              <Button
                variant="outline"
                className="border-[#00205B] text-[#00205B] hover:bg-[#00205B] hover:text-white transition-colors"
              >
                Login
              </Button>
            </Link>
            <Link to="/register" data-testid="link-register">
              <Button className="bg-[#FF7A00] hover:bg-[#e86b00] text-white border border-[#FF7A00] transition-colors">
                Register Now
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-[#00205B]"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            data-testid="button-mobile-menu"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 space-y-2 bg-white border-t border-gray-200">
            {navLinks.map((link) => (
              <Link key={link.href} to={link.href}>
                <Button
                  variant="ghost"
                  className={`w-full justify-start text-[#00205B] hover:text-[#001A47] hover:bg-[#E6EAF3] transition-colors ${
                    location.pathname === link.href ? "bg-[#E6EAF3]" : ""
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Button>
              </Link>
            ))}
            <div className="flex flex-col gap-2 pt-2">
              <Link to="/login">
                <Button
                  variant="outline"
                  className="w-full border-[#00205B] text-[#00205B] hover:bg-[#00205B] hover:text-white transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Login
                </Button>
              </Link>
              <Link to="/register">
                <Button
                  className="w-full bg-[#FF7A00] hover:bg-[#e86b00] text-white border border-[#FF7A00] transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Register Now
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

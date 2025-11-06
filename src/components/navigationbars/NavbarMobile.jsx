import { Link, useLocation } from "react-router-dom";
import { Button } from "../ui/button.jsx";

export default function NavbarMobile({ navLinks=[], onClose = ()=>{}  }) {
  const location = useLocation();

  return (
    <div className="fixed inset-0 z-[9999] bg-white flex flex-col justify-center items-center space-y-6 px-6 animate-fadeIn md:hidden">
      {/* Navigation Links */}
      {navLinks.length > 0 ? (
        navLinks.map((link) => (
          <Link key={link.href} to={link.href} className="w-full">
            <Button
              variant="ghost"
              className={`w-full text-center text-lg py-3 text-[#00205B] hover:text-[#001A47] hover:bg-[#E6EAF3] transition-colors ${
                location.pathname === link.href ? "bg-[#E6EAF3]" : ""
              }`}
              onClick={onClose}
            >
              {link.label}
            </Button>
          </Link>
        ))
      ) : (
        <p className="text-gray-500 text-sm">No navigation links found.</p>
      )}

      {/* Divider */}
      <div className="w-2/3 border-t border-gray-300 my-2"></div>

      {/* Auth Buttons */}
      <div className="flex flex-col gap-3 w-2/3">
        <Link to="/login">
          <Button
            variant="outline"
            className="w-full border-[#00205B] text-[#00205B] hover:bg-[#00205B] hover:text-white transition-colors"
            onClick={onClose}
          >
            Login
          </Button>
        </Link>
        <Link to="/register">
          <Button
            className="w-full bg-[#FF7A00] hover:bg-[#e86b00] text-white border border-[#FF7A00] transition-colors"
            onClick={onClose}
          >
            Register Now
          </Button>
        </Link>
      </div>
    </div>
  );
}

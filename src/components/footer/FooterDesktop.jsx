
import { Link } from "react-router-dom";
import {
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

export default function FooterDesktop() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 items-start">
          {/* Logo Section */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-[#143e8a] rounded-md flex items-center justify-center shrink-0">
                <span className="text-white font-bold text-sm font-[Poppins]">NIT</span>
              </div>
              <div>
                <div className="font-[Poppins] font-semibold text-lg text-gray-900">
                  Hackathon 2026
                </div>
                <div className="text-xs text-gray-500">NIT Silchar</div>
              </div>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed max-w-[20rem]">
              National Level Coding Competition organized by NIT Silchar
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-[Poppins] font-semibold mb-4 text-gray-900">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-sm text-gray-600 hover:text-gray-900 transition-colors px-2 py-1 rounded-md inline-block">
                  About
                </Link>
              </li>
              <li>
                <Link to="/schedule" className="text-sm text-gray-600 hover:text-gray-900 transition-colors px-2 py-1 rounded-md inline-block">
                  Schedule
                </Link>
              </li>
              <li>
                <Link to="/leaderboard" className="text-sm text-gray-600 hover:text-gray-900 transition-colors px-2 py-1 rounded-md inline-block">
                  Leaderboard
                </Link>
              </li>
              <li>
                <Link to="/gallery" className="text-sm text-gray-600 hover:text-gray-900 transition-colors px-2 py-1 rounded-md inline-block">
                  Gallery
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-[Poppins] font-semibold mb-4 text-gray-900">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-sm text-gray-600">
                <span className="mt-0.5">
                  <MapPin className="h-4 w-4 text-gray-500" />
                </span>
                <span>NIT Silchar, Assam 788010</span>
              </li>

              <li className="flex items-center gap-3 text-sm text-gray-600">
                <span>
                  <Mail className="h-4 w-4 text-gray-500" />
                </span>
                <a href="mailto:hackathon@nits.ac.in" className="hover:underline">
                  hackathon@nits.ac.in
                </a>
              </li>

              <li className="flex items-center gap-3 text-sm text-gray-600">
                <span>
                  <Phone className="h-4 w-4 text-gray-500" />
                </span>
                <a href="tel:+911234567890" className="hover:underline">
                  +91 1234567890
                </a>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="font-[Poppins] font-semibold mb-4 text-gray-900">Follow Us</h3>
            <div className="flex gap-3">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-md bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-shadow shadow-sm"
                aria-label="Facebook"
              >
                <Facebook className="h-4 w-4 text-gray-700" />
              </a>

              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-md bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-shadow shadow-sm"
                aria-label="Twitter"
              >
                <Twitter className="h-4 w-4 text-gray-700" />
              </a>

              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-md bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-shadow shadow-sm"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-4 w-4 text-gray-700" />
              </a>

              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-md bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-shadow shadow-sm"
                aria-label="Instagram"
              >
                <Instagram className="h-4 w-4 text-gray-700" />
              </a>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-gray-200 mt-8 pt-6">
          <p className="text-center text-sm text-gray-500">
            &copy; 2026 NIT Silchar. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

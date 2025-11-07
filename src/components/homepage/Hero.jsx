


import { Calendar, Users, Trophy, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "../../assets/images/Hackathon_event_hero_image_11b34065.png";
import { Button } from "../../components/ui/button";

export default function HeroSection() {
  return (
    <section className="relative min-h-[700px] flex items-center justify-center overflow-hidden">
      {/* Background Image + Gradient Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-gray-900/90"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-24">
        <div className="max-w-3xl">
          {/* Tag */}
          <div className="inline-block px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20 mb-6">
            <span className="text-white text-sm font-medium">
              National Level Coding Competition
            </span>
          </div>

          {/* Title */}
          <h1 className="font-[Poppins] font-extrabold text-5xl sm:text-6xl lg:text-7xl text-white mb-6 leading-tight drop-shadow-[0_4px_10px_rgba(0,0,0,0.4)]">
            Hackathon 2026
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl text-white/90 mb-10 leading-relaxed max-w-2xl">
            Join the most prestigious coding competition organized by NIT
            Silchar. Compete with the best minds, solve challenging problems,
            and win amazing prizes.
          </p>

          {/* Buttons */}
          <div className="flex flex-wrap gap-4 mb-16">
            <Link to="/register">
              <Button
                size="lg"
                className="bg-orange-500 hover:bg-orange-600 text-white text-lg px-12 py-4 rounded-xl flex items-center gap-2 shadow-lg hover:shadow-orange-500/40 transition-all"
              >
                Register Now <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>

            <Link to="/schedule">
              <Button
                size="lg"
                variant="outline"
                className="text-white border-white/40 bg-white/10 backdrop-blur-md hover:bg-white/20 text-lg px-12 py-4 rounded-xl transition-all"
              >
                View Schedule
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {[
              { icon: Calendar, label: "March 15–17, 2026" },
              { icon: Users, label: "500+ Teams" },
              { icon: Trophy, label: "₹5 Lakh Prize Pool" },
            ].map((stat, index) => (
              <div
                key={index}
                className="flex flex-col items-center justify-center bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-5 hover:bg-white/20 transition-all"
              >
                <stat.icon className="h-8 w-8 text-orange-400 mb-2" />
                <p className="text-white font-medium text-lg">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom white fade (bigger height for smooth transition) */}
<div
  className="absolute bottom-0 left-0 right-0 h-36 z-30 pointer-events-none"
  style={{
    background:
      "linear-gradient(to top, rgba(255,255,255,1) 0%, rgba(255,255,255,0.9) 30%, rgba(255,255,255,0.6) 50%, rgba(255,255,255,0.0) 100%)",
  }}
/>

    </section>
  );
}
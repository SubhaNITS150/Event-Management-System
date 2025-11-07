
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import patternImage from "../assets/images/Abstract_tech_pattern_background_e0cbe0d6.png";
import campusImage from "../assets/images/NIT_Silchar_campus_building_896f7467.png";
import eventImage from "../assets/images/Hackathon_event_hero_image_11b34065.png";

export default function Gallery() {
  const sponsors = [
    { name: "Tech Corp", tier: "Platinum" },
    { name: "Code Solutions", tier: "Gold" },
    { name: "Innovation Labs", tier: "Gold" },
    { name: "Digital Systems", tier: "Silver" },
    { name: "Future Tech", tier: "Silver" },
    { name: "Smart Devices", tier: "Silver" },
  ];

  const gallery = [
    { src: eventImage, title: "Opening Ceremony 2025", category: "event" },
    { src: campusImage, title: "NIT Silchar Campus", category: "campus" },
    { src: patternImage, title: "Coding Session", category: "event" },
    { src: eventImage, title: "Team Collaboration", category: "event" },
    { src: campusImage, title: "Award Ceremony", category: "event" },
    { src: patternImage, title: "Final Round", category: "event" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#F9FAFC]">
      
      <main className="flex-1 py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="font-[Poppins] font-extrabold text-4xl md:text-5xl mb-4 text-[#1E293B]">
              Gallery & Sponsors
            </h1>
            <p className="text-[#64748B] text-lg">
              Event highlights and our valued partners
            </p>
          </div>

          {/* Sponsors */}
          <section className="mb-20">
            <h2 className="font-[Poppins] font-bold text-3xl text-center mb-10 text-[#0F172A]">
              Our Sponsors
            </h2>

            <Card className="p-10 shadow-xl bg-gradient-to-br from-[#F7F9FC] to-[#EEF3FA] rounded-2xl border border-[#E2E8F0]">
              {/* Platinum */}
              <div className="mb-12">
                <h3 className="font-[Poppins] font-semibold text-2xl mb-8 text-center text-[#1E3A8A]">
                  Platinum Sponsors
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {sponsors
                    .filter((s) => s.tier === "Platinum")
                    .map((sponsor, index) => (
                      <div
                        key={index}
                        className="h-36 rounded-xl flex items-center justify-center border-2 border-[#93C5FD] 
                        bg-gradient-to-br from-[#E0F2FE] to-[#BFDBFE]
                        shadow-md hover:shadow-2xl transition-all duration-300 hover:scale-[1.03]"
                      >
                        <span className="font-[Poppins] font-bold text-2xl text-[#1D4ED8]">
                          {sponsor.name}
                        </span>
                      </div>
                    ))}
                </div>
              </div>

              {/* Gold */}
              <div className="mb-12">
                <h3 className="font-[Poppins] font-semibold text-2xl mb-8 text-center text-[#B45309]">
                  Gold Sponsors
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {sponsors
                    .filter((s) => s.tier === "Gold")
                    .map((sponsor, index) => (
                      <div
                        key={index}
                        className="h-28 rounded-xl flex items-center justify-center border border-[#FBBF24]
                        bg-gradient-to-br from-[#FEF3C7] to-[#FDE68A]
                        shadow-md hover:shadow-xl transition-all duration-300 hover:scale-[1.03]"
                      >
                        <span className="font-[Poppins] font-semibold text-lg text-[#92400E]">
                          {sponsor.name}
                        </span>
                      </div>
                    ))}
                </div>
              </div>

              {/* Silver */}
              <div>
                <h3 className="font-[Poppins] font-semibold text-2xl mb-8 text-center text-[#475569]">
                  Silver Sponsors
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  {sponsors
                    .filter((s) => s.tier === "Silver")
                    .map((sponsor, index) => (
                      <div
                        key={index}
                        className="h-24 rounded-lg flex items-center justify-center border border-[#CBD5E1]
                        bg-gradient-to-br from-[#F1F5F9] to-[#E2E8F0]
                        shadow-sm hover:shadow-md transition-all duration-300 hover:scale-[1.03]"
                      >
                        <span className="font-medium text-sm text-[#334155]">
                          {sponsor.name}
                        </span>
                      </div>
                    ))}
                </div>
              </div>
            </Card>
          </section>

          {/* Gallery */}
          <section>
            <h2 className="font-[Poppins] font-bold text-3xl mb-10 text-center text-[#0F172A]">
              Event Gallery
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {gallery.map((item, index) => (
                <Card
                  key={index}
                  className="overflow-hidden rounded-2xl shadow-md hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 bg-white"
                >
                  <div className="aspect-video bg-gray-200 relative overflow-hidden">
                    <img
                      src={item.src}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    />
                  </div>
                  <div className="p-5">
                    <h3 className="font-semibold text-lg text-[#0F172A] mb-1">
                      {item.title}
                    </h3>
                    <p className="text-sm text-[#64748B] capitalize">
                      {item.category}
                    </p>
                  </div>
                </Card>
              ))}
            </div>
          </section>

          {/* Become a Sponsor */}
          <section className="mt-20">
            <Card className="p-10 text-center rounded-2xl shadow-lg bg-gradient-to-r from-[#DBEAFE] to-[#FEF3C7] border border-[#E2E8F0]">
              <h2 className="font-[Poppins] font-bold text-3xl mb-4 text-[#0F172A]">
                Become a Sponsor
              </h2>
              <p className="text-[#475569] mb-8 max-w-2xl mx-auto leading-relaxed">
                Partner with us to support talented young programmers and gain
                visibility among the best coding minds in India.
              </p>
              <Button
                size="lg"
                className="bg-[#1D4ED8] hover:bg-[#1E40AF] text-white px-8 py-3 rounded-full font-semibold transition-colors duration-300"
              >
                Get Sponsorship Details
              </Button>
            </Card>
          </section>
        </div>
      </main>
     
    </div>
  );
}

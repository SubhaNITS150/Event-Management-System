
import { Card } from "../components/ui/card";
import { Award, Users, TrendingUp, Star } from "lucide-react";
import StatCard from "../components/StatCard";
import campusImage from "../assets/images/NIT_Silchar_campus_building_896f7467.png";

export default function About() {
  const achievements = [
    { icon: Award, value: "NIRF Rank", label: "Top 50 Engineering Colleges", testId: "stat-nirf" },
    { icon: Users, value: "5000+", label: "Students", testId: "stat-students" },
    { icon: TrendingUp, value: "95%", label: "Placement Rate", testId: "stat-placement" },
    { icon: Star, value: "50+", label: "Years of Excellence", testId: "stat-years" },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      
      <main className="flex-1">
        

        <div className="relative h-64 bg-gradient-to-b from-blue-800 to-blue-900 overflow-hidden">
  <div
    className="absolute inset-0 bg-cover bg-center opacity-40"
    style={{ backgroundImage: `url(${campusImage})` }}
  ></div>
  <div className="absolute inset-0 bg-blue-900/60"></div>

  <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
    <div>
      <h1 className="font-[Poppins] font-bold text-4xl sm:text-5xl text-white mb-4 drop-shadow-lg">
        About NIT Silchar
      </h1>
      <p className="text-blue-100 text-lg drop-shadow">
        Excellence in Technical Education
      </p>
    </div>
  </div>
</div>


        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
              <div>
                <h2 className="font-[Poppins] font-bold text-3xl mb-6">
                  National Institute of Technology Silchar
                </h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    National Institute of Technology Silchar (NIT Silchar) is one of the premier
                    technical institutions in India, established in 1967. Located in Silchar, Assam,
                    it is recognized as an Institute of National Importance under the National
                    Institutes of Technology Act, 2007.
                  </p>
                  <p>
                    The institute offers undergraduate, postgraduate, and doctoral programs in
                    various disciplines of Engineering, Sciences, and Management. NIT Silchar has
                    consistently maintained its position among the top engineering colleges in
                    India.
                  </p>
                  <p>
                    With state-of-the-art infrastructure, experienced faculty, and a vibrant campus
                    life, NIT Silchar has been nurturing young minds and contributing significantly
                    to technological advancement and research.
                  </p>
                </div>
              </div>
              <div className="rounded-xl overflow-hidden shadow-lg">
                <img src={campusImage} alt="NIT Silchar Campus" className="w-full h-auto" />
              </div>
            </div>

            <div className="mb-16">
              <h2 className="font-[Poppins] font-bold text-3xl text-center mb-8">
                Our Achievements
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {achievements.map((stat, index) => (
                  <StatCard key={index} {...stat} />
                ))}
              </div>
            </div>

            <Card className="p-8 md:p-12">
              <h2 className="font-[Poppins] font-bold text-3xl mb-6 text-center">
                About Hackathon 2026
              </h2>
              <div className="space-y-4 text-muted-foreground max-w-3xl mx-auto">
                <p>
                  <strong className="text-foreground">Mission:</strong> Hackathon 2026 is NIT
                  Silchar's flagship coding competition designed to identify and nurture exceptional
                  programming talent from across India. Our mission is to provide a platform where
                  students can showcase their problem-solving skills and innovative thinking.
                </p>
                <p>
                  <strong className="text-foreground">Vision:</strong> We envision creating a
                  competitive yet collaborative environment that challenges participants to push
                  their boundaries, learn from peers, and develop skills that will shape the future
                  of technology in India.
                </p>
                <p>
                  <strong className="text-foreground">Objectives:</strong>
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Foster competitive programming culture among students</li>
                  <li>Provide exposure to industry-standard coding practices</li>
                  <li>Create networking opportunities with peers and industry experts</li>
                  <li>Recognize and reward exceptional talent with prizes and certificates</li>
                  <li>Build a community of passionate programmers and problem solvers</li>
                </ul>
              </div>
            </Card>
          </div>
        </section>
      </main>
     
    </div>
  );
}

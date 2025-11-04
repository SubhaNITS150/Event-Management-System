import { Code2, Trophy, Users, Zap, Brain, Award } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import HeroSection from "../components/HeroSection";
import FeatureCard from "../components/FeatureCard";
import TimelineSection from "../components/TimelineSection";
import { Button } from "../components/ui/button";
import { Link } from "react-router-dom";

export default function Home() {
  const features = [
    {
      icon: Code2,
      title: "Real-time Coding",
      description: "Experience live coding challenges with instant feedback and evaluation",
      testId: "feature-realtime"
    },
    {
      icon: Trophy,
      title: "Amazing Prizes",
      description: "Win cash prizes worth ₹5 Lakhs and exciting goodies",
      testId: "feature-prizes"
    },
    {
      icon: Users,
      title: "Team Competition",
      description: "Form teams of up to 3 members and compete together",
      testId: "feature-team"
    },
    {
      icon: Zap,
      title: "Fast Evaluation",
      description: "Get instant results and feedback on your submissions",
      testId: "feature-evaluation"
    },
    {
      icon: Brain,
      title: "Challenging Problems",
      description: "Solve complex algorithmic and real-world problem statements",
      testId: "feature-problems"
    },
    {
      icon: Award,
      title: "Certificates",
      description: "Earn certificates of participation and achievement",
      testId: "feature-certificates"
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar  />
      <main className="flex-1">
        <HeroSection />

        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="font-[Poppins] font-bold text-3xl sm:text-4xl mb-4">Why Join Hackathon 2026?</h2>
              <p className="text-muted-foreground text-lg">Compete, Learn, and Win at India's Premier Coding Competition</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature, index) => (
                <FeatureCard key={index} {...feature} />
              ))}
            </div>
          </div>
        </section>

        <TimelineSection />

       <section className="py-20 bg-[#F9FAFB]">
  <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="bg-[#0A2A73] rounded-2xl py-12 px-6 md:px-16 text-center shadow-md">
      <h2 className="font-[Poppins] font-bold text-3xl sm:text-4xl text-white mb-4">
        Ready to Compete?
      </h2>
      <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
        Registration is now open! Form your team and register before{" "}
        <span className="font-semibold">February 28, 2026</span>.
      </p>
      <div className="flex flex-wrap justify-center gap-5">
        <Link to="/register">
          <Button
            size="lg"
            className="bg-[#F97316] hover:bg-[#ea680c] text-white text-lg px-14 py-4 font-semibold rounded-md"
            data-testid="button-register-cta"
          >
            Register Your Team
          </Button>
        </Link>
        <Link to="/contact">
          <Button
            size="lg"
            variant="outline"
            className="text-white border-white/20 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-lg px-14 py-4 font-semibold rounded-md"
            data-testid="button-contact-cta"
          >
            Contact Us
          </Button>
        </Link>
      </div>
    </div>
  </div>
</section>

      </main>
      <Footer />
    </div>
  );
}
